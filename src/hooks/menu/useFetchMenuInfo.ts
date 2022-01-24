import { ref, onMounted } from 'vue';
import { getMenuInfo } from '@/services';
import { useRequest } from '@/hooks/common';
import { IBaseResponse } from '@/types/common';
import { IMenu } from '@/types/menu';

const useFetchMenuInfo = (id: number) => {
  const menuInfo = ref<IMenu>();
  const { loading, fetch } = useRequest<IBaseResponse<IMenu>, [number]>(getMenuInfo);

  onMounted(async () => {
    const res = await fetch(id);
    menuInfo.value = res.data;
  });

  return {
    loading,
    menuInfo
  }
}

export default useFetchMenuInfo;
