import { IBasePageResponse } from '@/types/common';
import { TableProps } from 'ant-design-vue';
import type { TablePaginationConfig } from 'ant-design-vue';
import { computed, ref } from 'vue';
import { useRequest } from '../common';

// interface IState<T> {
//   params: Record<string, any>,
//   dataSource: Array<T>,
//   pagination: TablePaginationConfig,
//   sorter: Record<string, any>,
//   selectedRowKeys: unknown[]
// }

const useQueryList = <T, R extends IBasePageResponse>(apiFunc: (...args: any[]) => Promise<R>) => {
  // const state = reactive<IState<T>>({
  //   params: {}, // 查询条件
  //   dataSource: [], // 表格数据
  //   pagination: {
  //     current: 1,
  //     pageSize: 10,
  //     total: 0
  //   }, // 分页
  //   sorter: {}, // 排序
  //   selectedRowKeys: [] // 选中列
  // });
  const params = ref<Record<string, any>>({});
  const dataSource = ref<T[]>([]);
  const pagination = ref<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const sorter = ref<Record<string, any>>({});

  const selectedRowKeys = ref<Array<string | number>>([]);

  const queryParams = computed(() => {
    return {
      ...params.value,
      ...sorter.value,
      current: pagination.value.current,
      pageSize: pagination.value.pageSize
    }
  });

  const { loading, fetch } = useRequest<R, any[]>(apiFunc);

  const handleSearch = async () => {
    const res = await fetch(queryParams.value);
    dataSource.value = res.data.records;
    pagination.value.total = res.data.total;
  }

  const handleTableChange: TableProps<T>['onChange'] = (p, _f, s) => {
    pagination.value = p;
    sorter.value = s;
    handleSearch();
  }

  return {
    params,
    sorter,
    pagination,
    dataSource,
    loading,
    selectedRowKeys,
    handleTableChange,
    handleSearch
  }
}

export default useQueryList;
