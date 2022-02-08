import { computed } from 'vue';
import commonColumns from '@/config/commonColumns';
import { getMenusByParentId, getRoles } from '@/services';
import { IBasePageResponse, IOperationButtonProps, ZeroOrOneType } from '@/types/common';
import { IMenuItem } from '@/types/menu';
import { getIsShowOperation, showDashes } from '@/utils/tools';
import { TableColumnType } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { useQueryList } from '../../common/queryList';

const useMenuList = ({
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
  } = useQueryList<IMenuItem, IBasePageResponse<IMenuItem[]>>(getMenusByParentId.bind(null, 0));

  const columns: TableColumnType<IMenuItem>[] = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      resizable: true,
      sorter: true,
      fixed: true,
      sortDirections: ['descend'],
      width: 150,
      minWidth: 150
    },
    {
      title: '类型',
      dataIndex: 'type',
      resizable: true,
      sorter: true,
      width: 80,
      minWidth: 80
    },
    {
      title: '路由地址',
      dataIndex: 'router',
      resizable: true,
      width: 150,
      minWidth: 150,
      customRender: ({ text }) => showDashes(text)
    },
    {
      title: '权限代码',
      dataIndex: 'permission',
      resizable: true,
      width: 150,
      minWidth: 150,
      customRender: ({ text }) => showDashes(text)
    },
    {
      title: '组件路径',
      dataIndex: 'path',
      resizable: true,
      width: 150,
      minWidth: 150,
      customRender: ({ text }) => showDashes(text)
    },
    {
      title: '图标',
      dataIndex: 'icon',
      resizable: true,
      width: 70,
      minWidth: 70
    },
    {
      title: '是否缓存',
      dataIndex: 'isCache',
      resizable: true,
      sorter: true,
      width: 100,
      minWidth: 100
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

  const treeData = computed(() => {
    return dataSource.value.map(item => {
      if (item.hasChildren && !item.children) {
        item.children = [];
      }
      return item;
    })
  });

  const getOperations = (record: IMenuItem): IOperationButtonProps[] => {
    return [
      getIsShowOperation(record, () => {
        handleToggleIsShow(record.id, record.isShow);
      }),
      {
        text: '编辑',
        type: 'success',
        handler: () => {
          router.push({
            name: '编辑菜单',
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
    ]
  }

  return {
    columns,
    treeData,
    pagination,
    selectedRowKeys,
    loading,
    handleSearch,
    handleTableChange,
    getOperations
  }
}

export default useMenuList;
