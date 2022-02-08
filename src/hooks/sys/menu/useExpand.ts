import { getMenusByParentId } from '@/services';
import { IBasePageResponse } from '@/types/common';
import { IMenuItem } from '@/types/menu';
import { useRequest } from '../../common';

const useExpand = () => {
  const { loading, fetch } = useRequest<IBasePageResponse<IMenuItem[]>, [number, any]>(getMenusByParentId);

  const handleExpand = async (expanded: boolean, record: IMenuItem) => {
    if (expanded && record.children?.length === 0) {
      const res = await fetch(record.id, null);
      record.children = res.data.records.map(item => {
        if (item.hasChildren && !item.children) {
          item.children = [];
        }
        return item;
      });
    }
  }

  return {
    loading,
    handleExpand
  }
}

export default useExpand;
