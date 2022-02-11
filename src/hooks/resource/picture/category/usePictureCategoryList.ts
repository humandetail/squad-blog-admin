import commonColumns from '@/config/commonColumns';
import { getPictureCategories } from '@/services';
import { IBasePageResponse, IOperationButtonProps, ZeroOrOneType } from '@/types/common';
import { IPictureCategoryItem } from '@/types/pictureCategory';
import { IRoleItem } from '@/types/role';
import { getIsShowOperation } from '@/utils/tools';
import { TableColumnType } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { useQueryList } from '../../../common/queryList';

const usePictureCategoryList = ({
  handleDelete,
  handleToggleIsShow
}: {
  handleDelete: (id: number) => void;
  handleToggleIsShow: (id: number, isShow: ZeroOrOneType) => void;
}) => {
  const router = useRouter();

  const {
    dataSource,
    pagination,
    selectedRowKeys,
    loading,
    handleSearch,
    handleTableChange
  } = useQueryList<IPictureCategoryItem, IBasePageResponse<IPictureCategoryItem[]>>(getPictureCategories);

  const columns: TableColumnType<IPictureCategoryItem>[] = [
    {
      title: '分类名称',
      dataIndex: 'name',
      resizable: true,
      fixed: true,
      width: 160,
      minWidth: 160
    },
    {
      title: '显示名称',
      dataIndex: 'displayName',
      resizable: true,
      width: 250,
      minWidth: 250
    },
    ...commonColumns(),
    {
      title: '操作',
      dataIndex: 'operations',
      fixed: 'right',
      width: 200,
      minWidth: 200
    }
  ];

  const getOperations = (record: IRoleItem): IOperationButtonProps[] => {
    if (record.isAdmin) {
      return [];
    }

    return [
      getIsShowOperation(record, () => {
        handleToggleIsShow(record.id, record.isShow);
      }),
      {
        text: '编辑',
        type: 'success',
        handler: () => {
          router.push({
            name: '编辑图片分类',
            params: {
              id: record.id
            }
          });
        }
      },
      {
        text: '删除',
        type: 'danger',
        handler: () => {
          handleDelete(record.id);
        }
      }
    ];
  }

  return {
    columns,
    dataSource,
    pagination,
    selectedRowKeys,
    loading,
    handleSearch,
    handleTableChange,
    getOperations
  }
}

export default usePictureCategoryList;
