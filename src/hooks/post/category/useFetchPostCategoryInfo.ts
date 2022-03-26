import { ref, onMounted } from 'vue';
import { getPostCategoryInfo } from '@/services';
import { useRequest } from '@/hooks/common';
import { IBaseResponse } from '@/types/common';
import { IPostCategory } from '@/types/postCategory';

const useFetchPostCategoryInfo = (id: number) => {
  const postCategoryInfo = ref<IPostCategory>();
  const { loading, fetch } = useRequest<IBaseResponse<IPostCategory>, [number]>(getPostCategoryInfo);

  onMounted(async () => {
    const res = await fetch(id);
    postCategoryInfo.value = res.data;
  });

  return {
    loading,
    postCategoryInfo
  }
}

export default useFetchPostCategoryInfo;
