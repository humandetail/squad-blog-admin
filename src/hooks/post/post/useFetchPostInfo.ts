import { ref, onMounted } from 'vue';
import { getPostInfo } from '@/services';
import { useRequest } from '@/hooks/common';
import { IBaseResponse } from '@/types/common';
import { IPostItem } from '@/types/post';

const useFetchPostInfo = (id: string) => {
  const postInfo = ref<IPostItem>();
  const { loading, fetch } = useRequest<IBaseResponse<IPostItem>, [string]>(getPostInfo);

  onMounted(async () => {
    const res = await fetch(id);
    postInfo.value = res.data;
  });

  return {
    loading,
    postInfo
  }
}

export default useFetchPostInfo;
