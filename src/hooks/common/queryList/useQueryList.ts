import { IBasePageResponse } from '@/types/common';
import { TableProps } from 'ant-design-vue';
import type { TablePaginationConfig } from 'ant-design-vue';
import { computed, ref } from 'vue';
import { useRequest } from '..';
import _ from 'lodash';

const useQueryList = <T, R extends IBasePageResponse>(apiFunc: (...args: any[]) => Promise<R>) => {
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
    pagination.value = { ...pagination.value, ...p };
    if (s) {
      const singleSorter = _.isArray(s) ? s[0] : s;
      sorter.value = singleSorter.columnKey
        ? { sortField: singleSorter.columnKey, sortDesc: singleSorter.order === 'descend' }
        : {};
    }
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
