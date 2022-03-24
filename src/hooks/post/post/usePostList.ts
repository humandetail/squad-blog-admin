import commonColumns from '@/config/commonColumns';
import { getPosts } from '@/services';
import { IBasePageResponse, IOperationButtonProps, ZeroOrOneType } from '@/types/common';
import { IPostItem } from '@/types/post';
import { info } from '@/utils/http';
import { getIsShowOperation } from '@/utils/tools';
import { TableColumnType } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { useQueryList } from '../../common/queryList';

const usePostList = ({
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
  } = useQueryList<IPostItem, IBasePageResponse<IPostItem[]>>(getPosts);

  const columns: TableColumnType<IPostItem>[] = [
    {
      title: '标题',
      dataIndex: 'title',
      resizable: true,
      fixed: true,
      width: 250,
      minWidth: 250
    },
    {
      title: '封面图',
      dataIndex: 'cover',
      resizable: true,
      width: 80,
      minWidth: 80
    },
    {
      title: '文章模板',
      dataIndex: 'templateName',
      resizable: true,
      width: 150,
      minWidth: 150
    },
    {
      title: '摘要',
      dataIndex: 'summary',
      resizable: true,
      width: 200,
      minWidth: 200
    },
    {
      title: '分类',
      dataIndex: 'categoryName',
      resizable: true,
      width: 100,
      minWidth: 100
    },
    {
      title: '标签',
      dataIndex: 'tags',
      resizable: true,
      width: 200,
      minWidth: 200
    },
    {
      title: '推荐指数',
      dataIndex: 'recommendationIndex',
      resizable: true,
      width: 80,
      minWidth: 80
    },
    {
      title: '阅读量',
      dataIndex: 'viewCount',
      resizable: true,
      width: 80,
      minWidth: 80
    },
    ...commonColumns(['isShow', 'operator', 'createdTime', 'updatedTime']),
    {
      title: '操作',
      dataIndex: 'operations',
      fixed: 'right',
      width: 200,
      minWidth: 200
    }
  ];

  const getOperations = (record: IPostItem): IOperationButtonProps[] => {
    return [
      {
        text: '预览',
        type: 'primary',
        handler: () => {
          info('功能待开发！')
        }
      },
      getIsShowOperation(record, () => {
        handleToggleIsShow(record.id, record.isShow);
      }),
      {
        text: '编辑',
        type: 'success',
        handler: () => {
          router.push({
            name: '编辑文章',
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

export default usePostList;
