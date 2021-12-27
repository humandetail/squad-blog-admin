<template>
  <div class="page-sys-menu-list">
    <!-- <a-card> -->
      <!-- <common-table
        row-key="id"
        :data-source="dataSource"
        :columns="columns"
        @change="handleTableChange"
      ></common-table> -->
      <QueryList
        row-key="id"
        :loading="loading"
        :columns="columns"
        :data-source="dataSource"
        :pagination="pagination"
        v-model:selected-row-keys="selectedRowKeys"
        @table-change="handleTableChange"
        @refresh="handleSearch"
      />
    <!-- </a-card> -->
  </div>
</template>

<script setup lang="ts">
import QueryList from '@/components/common/queryList/index.vue';
import type { TableColumnType } from 'ant-design-vue';
import { useQueryList } from '@/hooks/queryList';
import { getMenus } from '@/services/sys/menu';
import { IMenuItem } from '@/types/menu';
import { IBasePageResponse } from '@/types/common';

export type TableDataType = {
  key: string;
  name: string;
  age: number;
  address: string;
  chidren?: any[]
};

const {
  dataSource,
  pagination,
  selectedRowKeys,
  loading,
  handleSearch,
  handleTableChange
} = useQueryList<IMenuItem, IBasePageResponse<IMenuItem[]>>(getMenus);
// console.log(obj);
await handleSearch();

const columns: TableColumnType<TableDataType>[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    sorter: true,
    sortDirections: ['descend'],
    width: 200,
    resizable: true
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    width: 200
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
    width: 1500
  }
];

// const selectedRowKeys = ref<Array<string | number>>([]);
// const pagination = ref<TablePaginationConfig>({
//   total: 13,
//   showTotal: (total: number) => `${total}条`,
//   current: 1,
//   pageSize: 10
// })

// const handleTableChange: TableProps<TableDataType>['onChange'] = (p, f, s) => {
//   pagination.value = p;
//   console.log(s)
// }
</script>
