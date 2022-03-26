// 切换默认状态

import { useRequest } from '@/hooks/common';
import { IBaseResponse, ZeroOrOneType } from '@/types/common';
import { success } from '@/utils/http';

const useToggleIsDefault = (
  service: (id: number, isDefault: ZeroOrOneType)=> Promise<IBaseResponse<null>>,
  callback?: Function) => {
  const { loading, fetch } = useRequest<IBaseResponse<null>, [number, ZeroOrOneType]>(service);

  const handleToggleIsDefault = async (id: number, isDefault: ZeroOrOneType) => {
    await fetch(id, isDefault === 1 ? 0 : 1);
    success('操作成功');
    callback && callback();
  }

  return {
    loading,
    handleToggleIsDefault
  }
}

export default useToggleIsDefault;
