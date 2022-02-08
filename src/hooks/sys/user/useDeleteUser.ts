// 删除用户

import { useRequest } from '@/hooks/common';
import { deleteUser } from '@/services';
import { IBaseResponse } from '@/types/common';
import { success } from '@/utils/http';

export default (callback?: Function) => {
  const { loading, fetch } = useRequest<IBaseResponse<null>, [string]>(deleteUser);

  const handleDelete = async (id: string) => {
    await fetch(id);
    success('操作成功');
    callback && callback();
  }

  return {
    loading,
    handleDelete
  }
}
