import commonColumns from '@/config/commonColumns';
import { getPersonalBases, getPostCategories } from '@/services';
import { IBasePageResponse, IOperationButtonProps, ZeroOrOneType } from '@/types/common';
import { IPersonalBaseItem } from '@/types/personalBase';
import { getIsShowOperation } from '@/utils/tools';
import { TableColumnType } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { useQueryList } from '../../common/queryList';

const useFetchPersonalBaseList = ({
  handleDelete,
  handleToggleIsShow,
  handleToggleIsDefault
}: {
  handleDelete: (id: number) => void;
  handleToggleIsShow: (id: number, isShow: ZeroOrOneType) => void;
  handleToggleIsDefault: (id: number, isShow: ZeroOrOneType) => void;
}) => {
  const router = useRouter();

  const {
    dataSource,
    pagination,
    selectedRowKeys,
    loading,
    handleSearch,
    handleTableChange
  } = useQueryList<IPersonalBaseItem, IBasePageResponse<IPersonalBaseItem[]>>(getPersonalBases);

  const columns: TableColumnType<IPersonalBaseItem>[] = [
    {
      title: '头像',
      dataIndex: 'avatar',
      resizable: false,
      fixed: true,
      width: 80,
      minWidth: 80
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      resizable: true,
      fixed: true,
      width: 160,
      minWidth: 160
    },
    {
      title: 'qq',
      dataIndex: 'qq',
      resizable: true,
      width: 250,
      minWidth: 250
    },
    {
      title: 'blog',
      dataIndex: 'blog',
      resizable: true,
      width: 250,
      minWidth: 250
    },
    {
      title: 'github',
      dataIndex: 'github',
      resizable: true,
      width: 250,
      minWidth: 250
    },
    {
      title: 'email',
      dataIndex: 'email',
      resizable: true,
      width: 250,
      minWidth: 250
    },
    {
      title: '是否默认',
      dataIndex: 'isDefault',
      resizable: true,
      width: 100,
      minWidth: 100
    },
    {
      title: '展示技能',
      dataIndex: 'isShowSkills',
      resizable: true,
      width: 100,
      minWidth: 100
    },
    {
      title: '展示作品集',
      dataIndex: 'isShowWorks',
      resizable: true,
      width: 120,
      minWidth: 120
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

  const getOperations = (record: IPersonalBaseItem): IOperationButtonProps[] => {
    return [
      getIsShowOperation(record, () => {
        handleToggleIsShow(record.id, record.isShow);
      }),
      {
        text: record.isDefault ? '取消默认' : '设为默认',
        type: record.isDefault ? 'primary' : 'success',
        handler: () => {
          handleToggleIsDefault(record.id, record.isDefault);
        }
      },
      {
        text: '编辑',
        type: 'success',
        handler: () => {
          router.push({
            name: '编辑基本信息',
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

export default useFetchPersonalBaseList;
