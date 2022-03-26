import commonColumns from '@/config/commonColumns';
import { getPersonalSkills } from '@/services';
import { IBasePageResponse, IOperationButtonProps, ZeroOrOneType } from '@/types/common';
import { IPersonalSkillItem } from '@/types/personalSkill';
import { getIsShowOperation } from '@/utils/tools';
import { TableColumnType } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { useQueryList } from '../../common/queryList';

const useFetchPersonalSkillList = ({
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
  } = useQueryList<IPersonalSkillItem, IBasePageResponse<IPersonalSkillItem[]>>(getPersonalSkills);

  const columns: TableColumnType<IPersonalSkillItem>[] = [
    {
      title: '图标',
      dataIndex: 'icon',
      resizable: false,
      fixed: true,
      width: 80,
      minWidth: 80
    },
    {
      title: '名称',
      dataIndex: 'name',
      resizable: true,
      fixed: true,
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

  const getOperations = (record: IPersonalSkillItem): IOperationButtonProps[] => {
    return [
      getIsShowOperation(record, () => {
        handleToggleIsShow(record.id, record.isShow);
      }),
      {
        text: '编辑',
        type: 'success',
        handler: () => {
          router.push({
            name: '编辑个人技能',
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

export default useFetchPersonalSkillList;
