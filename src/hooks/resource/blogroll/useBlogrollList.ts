import commonColumns from '@/config/commonColumns';
import { getBlogrolls, getPictureCategories } from '@/services';
import { IBlogrollItem } from '@/types/blogroll';
import { IBasePageResponse, IOperationButtonProps, ZeroOrOneType } from '@/types/common';
import { IPictureCategoryItem } from '@/types/pictureCategory';
import { IRoleItem } from '@/types/role';
import { getIsShowOperation } from '@/utils/tools';
import { TableColumnType } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { useQueryList } from '../../common/queryList';

const useBlogrollList = ({
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
  } = useQueryList<IBlogrollItem, IBasePageResponse<IBlogrollItem[]>>(getBlogrolls);

  const columns: TableColumnType<IBlogrollItem>[] = [
    {
      title: '友链名称',
      dataIndex: 'name',
      resizable: true,
      fixed: true,
      width: 160,
      minWidth: 160
    },
    {
      title: '链接地址',
      dataIndex: 'link',
      resizable: true,
      width: 200,
      minWidth: 200
    },
    {
      title: '备注信息',
      dataIndex: 'remarks',
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

  const getOperations = (record: IBlogrollItem): IOperationButtonProps[] => {
    return [
      getIsShowOperation(record, () => {
        handleToggleIsShow(record.id, record.isShow);
      }),
      {
        text: '编辑',
        type: 'success',
        handler: () => {
          router.push({
            name: '编辑友情链接',
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

export default useBlogrollList;
