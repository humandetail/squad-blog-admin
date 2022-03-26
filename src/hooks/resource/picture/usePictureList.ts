import { getPictures } from '@/services';
import { IBasePageResponse } from '@/types/common';
import { IPictureItem } from '@/types/picture';
import { useQueryList } from '../../common/queryList';

const usePictureList = () => {
  const {
    dataSource,
    pagination,
    loading,
    handleSearch,
    handleTableChange
  } = useQueryList<IPictureItem, IBasePageResponse<IPictureItem[]>>(getPictures);

  return {
    dataSource,
    pagination,
    loading,
    handleSearch,
    handleTableChange
  }
}

export default usePictureList;
