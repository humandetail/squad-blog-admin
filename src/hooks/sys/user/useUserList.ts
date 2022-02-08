import commonColumns from '@/config/commonColumns';
import { getUsers } from '@/services';
import { useUserStore } from '@/store/user';
import { IBasePageResponse, IOperationButtonProps, ZeroOrOneType } from '@/types/common';
import { IUserInfo } from '@/types/user';
import { showDashes } from '@/utils/tools';
import { TableColumnType } from 'ant-design-vue';
import { computed } from 'vue';
import { useQueryList } from '../../common/queryList';

type TableDataType = {
  id: string;
  avatarPic: string;
  username: string;
  nickname: string;
  roleId: number;
  roleName: string;
  isLock: boolean;
  isShow: boolean;
  sort: number;
  lastLogin: Date;
  createdTime: Date;
  updatedTime: Date;
  operator: string;
}

export default ({
  handleLock,
  handleDelete
}: {
  handleLock: (id: string, isLock: ZeroOrOneType) => void;
  handleDelete: (id: string) => void;
}) => {
  const userStore = useUserStore();
  const userInfo = computed(() => userStore.userInfo || null);

  const {
    dataSource,
    pagination,
    selectedRowKeys,
    loading,
    handleSearch,
    handleTableChange
  } = useQueryList<IUserInfo, IBasePageResponse<IUserInfo[]>>(getUsers);

  const columns: TableColumnType<TableDataType>[] = [
    {
      title: '用户头像',
      dataIndex: 'avatarPic',
      resizable: false,
      width: 100
    },
    {
      title: '用户名',
      dataIndex: 'username',
      resizable: true,
      width: 150,
      minWidth: 150,
      customRender: ({ text }) => showDashes(text)
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      resizable: true,
      width: 150,
      minWidth: 150,
      customRender: ({ text }) => showDashes(text)
    },
    {
      title: '所属角色',
      dataIndex: 'roleName',
      resizable: true,
      width: 100,
      minWidth: 100,
      customRender: ({ text }) => showDashes(text)
    },
    {
      title: '最后登录时间',
      dataIndex: 'lastLogin',
      resizable: true,
      width: 190,
      minWidth: 190,
      customRender: ({ text }) => showDashes(text)
    },
    {
      title: '是否锁定',
      dataIndex: 'isLock',
      resizable: true,
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
  ]

  const getOperations = (record: IUserInfo): IOperationButtonProps[] => {
    // TODO: 角色为 “超级管理员” 不允许 锁定/删除 操作
    // 当前登录角色也不允许操作自己
    return record.username === 'admin' || record.username === userInfo.value?.username
      ? []
      : [
          {
            text: record.isLock ? '解锁' : '锁定',
            type: 'danger',
            handler: () => {
              handleLock(record.id, record.isLock === 1 ? 0 : 1);
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
    dataSource,
    pagination,
    selectedRowKeys,
    loading,
    handleSearch,
    handleTableChange,
    getOperations
  }
}
