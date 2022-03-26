// 用户管理
// 分配角色
// 锁定/解锁

import { useRequest } from '@/hooks/common';
import { userManage } from '@/services';
import { IBaseResponse } from '@/types/common';
import { IUserManage } from '@/types/user';
import { success } from '@/utils/http';

const useUserManage = (callback?: Function) => {
  const { loading, fetch } = useRequest<IBaseResponse<null>, [string, IUserManage]>(userManage);

  const handleManage = async (id: string, data: IUserManage) => {
    await fetch(id, data);
    success('操作成功');
    callback && callback();
  }

  return {
    loading,
    handleManage
  }
}

export default useUserManage;
