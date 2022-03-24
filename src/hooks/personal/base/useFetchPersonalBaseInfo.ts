import { ref, onMounted } from 'vue';
import { getPersonalBaseInfo, getPostCategoryInfo } from '@/services';
import { useRequest } from '@/hooks/common';
import { IBaseResponse } from '@/types/common';
import { IPersonalBaseItem } from '@/types/personalBase';

const useFetchPersonalBaseInfo = (id: number) => {
  const personalBaseInfo = ref<IPersonalBaseItem>();
  const { loading, fetch } = useRequest<IBaseResponse<IPersonalBaseItem>, [number]>(getPersonalBaseInfo);

  onMounted(async () => {
    const res = await fetch(id);
    personalBaseInfo.value = res.data;
  });

  return {
    loading,
    personalBaseInfo
  }
}

export default useFetchPersonalBaseInfo;
