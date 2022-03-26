import commonColumns from '@/config/commonColumns';
import { getPersonalWorks } from '@/services';
import { IBasePageResponse, IOperationButtonProps, ZeroOrOneType } from '@/types/common';
import { IPersonalWorkItem } from '@/types/personalWork';
import { getIsShowOperation } from '@/utils/tools';
import { TableColumnType } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { useQueryList } from '../../common/queryList';

const useFetchPersonalWorkList = ({
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
  } = useQueryList<IPersonalWorkItem, IBasePageResponse<IPersonalWorkItem[]>>(getPersonalWorks);

  const columns: TableColumnType<IPersonalWorkItem>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      resizable: true,
      fixed: true,
      width: 160,
      minWidth: 160
    },
    {
      title: '展示图片',
      dataIndex: 'pictures',
      resizable: false,
      fixed: false,
      width: 280,
      minWidth: 280
    },
    {
      title: '链接',
      dataIndex: 'link',
      resizable: true,
      fixed: false,
      width: 160,
      minWidth: 160
    },
    {
      title: '挂载点',
      dataIndex: 'personalBase',
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

  const getOperations = (record: IPersonalWorkItem): IOperationButtonProps[] => {
    return [
      getIsShowOperation(record, () => {
        handleToggleIsShow(record.id, record.isShow);
      }),
      {
        text: '编辑',
        type: 'success',
        handler: () => {
          router.push({
            name: '编辑作品集',
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

export default useFetchPersonalWorkList;
