import commonColumns from '@/config/commonColumns';
import { getRoles } from '@/services';
import { IBasePageResponse, IOperationButtonProps } from '@/types/common';
import { IRoleItem } from '@/types/role';
import { showDashes } from '@/utils/tools';
import { TableColumnType } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { useQueryList } from '../common/queryList';

const useRoleList = ({
  handleDelete,
  handleAuthorizeBtnClick
}: {
  handleDelete: (id: number) => void;
  handleAuthorizeBtnClick: (role: IRoleItem) => void;
}) => {
  type TableDataType = {
    id: number;
    name: string;
    remarks: string;
    isShow: boolean;
    sort: number;
    createdTime: Date;
    updatedTime: Date;
    operator: string;
  }

  const router = useRouter();

  const {
    dataSource,
    pagination,
    selectedRowKeys,
    loading,
    handleSearch,
    handleTableChange
  } = useQueryList<IRoleItem, IBasePageResponse<IRoleItem[]>>(getRoles);

  const columns: TableColumnType<TableDataType>[] = [
    {
      title: '角色名称',
      dataIndex: 'name',
      resizable: true,
      fixed: true,
      width: 160,
      minWidth: 160
    },
    {
      title: '权限列表',
      dataIndex: 'menus',
      resizable: true,
      width: 250,
      minWidth: 250
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      resizable: true,
      width: 150,
      minWidth: 150,
      customRender: ({ text }) => showDashes(text)
    },
    ...commonColumns(),
    {
      title: '操作',
      dataIndex: 'operations',
      fixed: 'right',
      width: 160,
      minWidth: 160
    }
  ];

  const getOperations = (record: IRoleItem): IOperationButtonProps[] => {
    if (record.isAdmin) {
      return [];
    }

    return [
      {
        text: '授权',
        type: 'primary',
        handler: () => {
          handleAuthorizeBtnClick(record);
        }
      },
      {
        text: '编辑',
        type: 'success',
        handler: () => {
          router.push({
            name: '编辑角色',
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

export default useRoleList;
