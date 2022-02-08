// 删除用户

import { useRequest } from '@/hooks/common';
import { deleteRole } from '@/services';
import { IBaseResponse } from '@/types/common';
import { success } from '@/utils/http';

export default (callback?: Function) => {
  const { loading, fetch } = useRequest<IBaseResponse<null>, [number]>(deleteRole);

  const handleDelete = async (id: number) => {
    await fetch(id);
    success('操作成功');
    callback && callback();
  }

  return {
    loading,
    handleDelete
  }
}
