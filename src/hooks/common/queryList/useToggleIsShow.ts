// 切换显示/隐藏状态

import { useRequest } from '@/hooks/common';
import { IBaseResponse, ZeroOrOneType } from '@/types/common';
import { success } from '@/utils/http';

const useToggleIsShow = (
  service: (id: number, isShow: ZeroOrOneType)=> Promise<IBaseResponse<null>>,
  callback?: Function) => {
  const { loading, fetch } = useRequest<IBaseResponse<null>, [number, ZeroOrOneType]>(service);

  const handleToggleIsShow = async (id: number, isShow: ZeroOrOneType) => {
    await fetch(id, isShow === 1 ? 0 : 1);
    success('操作成功');
    callback && callback();
  }

  return {
    loading,
    handleToggleIsShow
  }
}

export default useToggleIsShow;
