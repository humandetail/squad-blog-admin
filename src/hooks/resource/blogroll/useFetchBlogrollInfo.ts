import { ref, onMounted } from 'vue';
import { getBlogrollInfo } from '@/services';
import { useRequest } from '@/hooks/common';
import { IBaseResponse } from '@/types/common';
import { IBlogroll } from '@/types/blogroll';

const useFetchBlogrollInfo = (id: number) => {
  const blogrollInfo = ref<IBlogroll>();
  const { loading, fetch } = useRequest<IBaseResponse<IBlogroll>, [number]>(getBlogrollInfo);

  onMounted(async () => {
    const res = await fetch(id);
    blogrollInfo.value = res.data;
  });

  return {
    loading,
    blogrollInfo
  }
}

export default useFetchBlogrollInfo;
