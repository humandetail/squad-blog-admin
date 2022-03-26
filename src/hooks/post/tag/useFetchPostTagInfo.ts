import { ref, onMounted } from 'vue';
import { getPostTagInfo } from '@/services';
import { useRequest } from '@/hooks/common';
import { IBaseResponse } from '@/types/common';
import { IPostTag } from '@/types/postTag';

const useFetchPostTagInfo = (id: number) => {
  const postTagInfo = ref<IPostTag>();
  const { loading, fetch } = useRequest<IBaseResponse<IPostTag>, [number]>(getPostTagInfo);

  onMounted(async () => {
    const res = await fetch(id);
    postTagInfo.value = res.data;
  });

  return {
    loading,
    postTagInfo
  }
}

export default useFetchPostTagInfo;
