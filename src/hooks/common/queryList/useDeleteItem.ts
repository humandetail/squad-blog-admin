// 删除列表项
import { useRequest } from '@/hooks/common';
import { IBaseResponse } from '@/types/common';
import { success } from '@/utils/http';

const useDeleteItem = (
  service: (id: number) => Promise<IBaseResponse<null>>,
  callback?: Function
) => {
  const { loading, fetch } = useRequest<IBaseResponse<null>, [number]>(service);

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

export default useDeleteItem;
