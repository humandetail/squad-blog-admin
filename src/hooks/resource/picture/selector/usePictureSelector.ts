import { ref, computed } from 'vue';
import { IPictureItem } from '@/types/picture';
import { IPictureCategoryItem } from '@/types/pictureCategory';
import { ALL_PICTURES_CATEGORY_NAME } from '@/config/constants';
import { useRequest } from '@/hooks/common';
import { IBasePageParams, IBasePageResponse } from '@/types/common';
import { getPictureCategories, getPictures } from '@/services';

import type { TablePaginationConfig } from 'ant-design-vue';
import _ from 'lodash';

type PictureCategoryData = {
  pagination: TablePaginationConfig;
  records: Record<string, IPictureItem[]>;
}

type PictureCategory = Pick<IPictureCategoryItem, 'id' | 'displayName'> & {
  data: PictureCategoryData
};

const getDefaultPagination = (): TablePaginationConfig => {
  return {
    current: 1,
    pageSize: 8,
    total: 0
  }
}

const allPicturesCategory = (): PictureCategory => ({
  id: 0,
  displayName: ALL_PICTURES_CATEGORY_NAME,
  data: {
    pagination: getDefaultPagination(),
    records: {}
  }
});

const usePictureSelector = () => {
  const categories = ref<PictureCategory[]>([]);
  const activeKey = ref(0);
  const $keyword = ref<string>('');

  const {
    loading: fetchCategoriesLoading,
    fetch: fetchCategories
  } = useRequest<IBasePageResponse<IPictureCategoryItem[]>, [IBasePageParams]>(getPictureCategories);

  const {
    loading: fetchPicturesLoading,
    fetch: fetchPictures
  } = useRequest<IBasePageResponse<IPictureItem[]>, [IBasePageParams & { categoryId?: number }]>(getPictures);

  const setCurrentTabKey = (name: string, categories: PictureCategory[] = []) => {
    const item = categories.find(item => item.displayName === name);
    activeKey.value = item ? item.id : 0;
  }

  // 当前的分类
  const currentCategory = computed(() => {
    return categories.value.find(item => item.id === activeKey.value) || null;
  });
  // 当前 tab 页面需要展示的图片数据
  const currentCategoryPictures = computed<IPictureItem[]>(() => {
    if (!currentCategory.value) {
      return [];
    }
    const { pagination: { pageSize, current }, records } = currentCategory.value.data;
    const key = `${$keyword.value}-${pageSize}-${current}`;

    const record = records[key];

    return record || [];
  });

  const getCurrentTabPictures = async (tab: number, keyword?: string) => {
    $keyword.value = keyword || '';
    if (!currentCategory.value) {
      return;
    }
    const { pagination, records } = currentCategory.value.data;
    const key: string = $keyword.value + '-' + pagination.pageSize + '-' + pagination.current;
    // 已存在数据 不再获取
    if (_.isUndefined(keyword) && records[key] && !_.isEmpty(records[key])) {
      return;
    }

    const res = await fetchPictures({
      keyword,
      isShow: 1,
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...(tab === 0 ? null : { categoryId: tab })
    });

    categories.value = categories.value.map(item => {
      if (item.id === tab) {
        item.data.records[key] = res?.data?.records || [];
        item.data.pagination.total = res?.data?.total || 0;
      }
      return item;
    });
  }

  const handlePagiantionChange = (page: number, pageSize: number) => {
    categories.value = categories.value.map(item => {
      if (item.id === currentCategory.value?.id) {
        item.data.pagination.current = pageSize !== item.data.pagination.pageSize
          ? 1
          : page;
        item.data.pagination.pageSize = pageSize;
      }
      return item;
    });

    getCurrentTabPictures(activeKey.value);
  }

  return {
    categories,
    activeKey,
    fetchCategoriesLoading,
    fetchPicturesLoading,
    currentCategory,
    currentCategoryPictures,
    allPicturesCategory,
    getDefaultPagination,
    fetchCategories,
    fetchPictures,
    setCurrentTabKey,
    getCurrentTabPictures,
    handlePagiantionChange
  }
}

export default usePictureSelector;
