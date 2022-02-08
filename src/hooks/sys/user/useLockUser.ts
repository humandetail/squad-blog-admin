// 锁定/解锁 用户

import { useRequest } from '@/hooks/common';
import { setUserLockStatus } from '@/services';
import { IBaseResponse, ZeroOrOneType } from '@/types/common';
import { success } from '@/utils/http';

export default (callback?: Function) => {
  const { loading, fetch } = useRequest<IBaseResponse<null>, [string, ZeroOrOneType]>(setUserLockStatus);

  const handleLock = async (id: string, isLock: ZeroOrOneType) => {
    await fetch(id, isLock);
    success('操作成功');
    callback && callback();
  }

  return {
    loading,
    handleLock
  }
}
