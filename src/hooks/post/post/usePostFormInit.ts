import { useRequest } from '@/hooks/common'
import { getPostCategories, getPostTags, getTemplates } from '@/services'
import { IBasePageParams, IBasePageResponse } from '@/types/common';
import { IPostCategoryItem } from '@/types/postCategory';
import { IPostTagItem } from '@/types/postTag';
import { ITemplateItem } from '@/types/template';
import { error } from '@/utils/http';
import { computed, onMounted, ref } from 'vue';

type CategoryItem = Pick<IPostCategoryItem, 'id' | 'displayName'>;
type TagItem = Pick<IPostTagItem, 'id' | 'displayName'>;
type TemplateItem = Pick<ITemplateItem, 'id' | 'name' | 'coverPic'>;

const usePostFormInit = () => {
  const categories = ref<CategoryItem[]>([]);
  const tags = ref<TagItem[]>([]);
  const templates = ref<TemplateItem[]>([]);

  const {
    loading: fetchCategoriesLoading,
    fetch: fetchCategories
  } = useRequest<IBasePageResponse<IPostCategoryItem[]>, [IBasePageParams]>(getPostCategories);

  const {
    loading: fetchTagsLoading,
    fetch: fetchTags
  } = useRequest<IBasePageResponse<IPostTagItem[]>, [IBasePageParams]>(getPostTags);

  const {
    loading: fetchTemplateLoading,
    fetch: fetchTemplates
  } = useRequest<IBasePageResponse<ITemplateItem[]>, [IBasePageParams]>(getTemplates);

  const initLoading = computed(() => (
    fetchCategoriesLoading.value ||
    fetchTagsLoading.value ||
    fetchTemplateLoading.value
  ));

  onMounted(async () => {
    try {
      const res = await Promise.all([
        fetchCategories({ current: 1, pageSize: 100, isShow: 1 }),
        fetchTags({ current: 1, pageSize: 100, isShow: 1 }),
        fetchTemplates({ current: 1, pageSize: 100, isShow: 1 })
      ]);

      const errItem = res.find(item => item.code !== 200);

      if (errItem) {
        throw errItem;
      }

      const [categoriesRes, tagsRes, templatesRes] = res;

      categories.value = categoriesRes?.data?.records || [];
      tags.value = tagsRes?.data?.records || [];
      templates.value = templatesRes?.data?.records || [];
    } catch (err: any) {
      error(err?.desc || '表单初始化失败，请重试');
    }
  });

  return {
    initLoading,
    fetchCategoriesLoading,
    fetchTagsLoading,
    fetchTemplateLoading,
    categories,
    tags,
    templates,
    fetchCategories,
    fetchTags,
    fetchTemplates
  }
}

export default usePostFormInit;
