import { ref, onMounted } from 'vue';
import { getPersonalWorkInfo } from '@/services';
import { useRequest } from '@/hooks/common';
import { IBaseResponse } from '@/types/common';
import { IPersonalWorkItem } from '@/types/personalWork';

const useFetchPersonalWorkInfo = (id: number) => {
  const personalWorkInfo = ref<IPersonalWorkItem>();
  const { loading, fetch } = useRequest<IBaseResponse<IPersonalWorkItem>, [number]>(getPersonalWorkInfo);

  onMounted(async () => {
    const res = await fetch(id);
    personalWorkInfo.value = res.data;
  });

  return {
    loading,
    personalWorkInfo
  }
}

export default useFetchPersonalWorkInfo;
