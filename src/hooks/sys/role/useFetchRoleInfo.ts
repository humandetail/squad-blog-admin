import { ref, onMounted } from 'vue';
import { getRoleInfo } from '@/services';
import { useRequest } from '@/hooks/common';
import { IBaseResponse } from '@/types/common';
import { IRole } from '@/types/role';

const useFetchRoleInfo = (id: number) => {
  const roleInfo = ref<IRole>();
  const { loading, fetch } = useRequest<IBaseResponse<IRole>, [number]>(getRoleInfo);

  onMounted(async () => {
    const res = await fetch(id);
    roleInfo.value = res.data;
  });

  return {
    loading,
    roleInfo
  }
}

export default useFetchRoleInfo;
