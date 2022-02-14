<template>
  <a-card class="query-list">
    <query-list-head
      v-model:size="size"
      :columns="nativeColumns"
      :loading="loading"
      :show-search="showSearch"
      :is-table="isTable"
      v-model:selected-column-keys="selectedColumnKeys"
      @refresh="$emit('refresh')"
      @search="$emit('search', $event)">
      <template #search>
        <slot name="search" />
      </template>

      <template #customOperations>
        <slot name="customOperations" />
      </template>
    </query-list-head>
    <slot name="table">
      <a-table
        bordered
        :rowKey="rowKey"
        :size="size"
        :columns="currentColumns"
        :dataSource="dataSource"
        :row-selection="selectedRowKeys ? {
          selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE
          ],
          selectedRowKeys,
          fixed: true,
          columnWidth: 60,
          onChange: (keys: any[]) => $emit('update:selected-row-keys', keys)
        } : false"
        :scroll="{ x: 'max-content', scrollToFirstRowOnChange: true }"
        :pagination="false"
        @change="handleTableChange"
        @resizeColumn="handleResizeColumn"
        @expand="handleExpand">
        <template #headerCell="headerCell">
          <slot name="headerCell" v-bind="headerCell" />
        </template>

        <template #bodyCell="bodyCell">
          <slot name="bodyCell" v-bind="bodyCell" />
        </template>
      </a-table>
    </slot>

    <query-list-foot
      :selectedRowKeys="selectedRowKeys"
      :pagination="pagination"
      @update:selectedRowKeys="$emit('update:selected-row-keys', $event)"
      @pagination-change="handlePaginationChange"></query-list-foot>
  </a-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Table, TableProps } from 'ant-design-vue';
import _ from 'lodash';
import type { TablePaginationConfig } from 'ant-design-vue';
import { ESize } from '@/config/constants';
import { useColumns } from '@/hooks/common/queryList';

import { QueryListHead, QueryListFoot } from './index';

const props = defineProps({
  rowKey: {
    type: [String, Function],
    default: 'id'
  },
  columns: {
    type: Array,
    required: true,
    default: () => []
  },
  dataSource: {
    type: Array,
    required: true,
    default: () => []
  },
  pagination: {
    type: Object,
    default: () => ({
      total: 0,
      current: 1,
      pageSize: 10,
      pageSizeOption: ['10', '20', '50', '100', '200']
    })
  },
  selectedRowKeys: {
    type: Array,
    default: () => []
  },
  isTreeData: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  showSearch: {
    type: Boolean,
    default: true
  },
  isTable: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['refresh', 'table-change', 'update:selected-row-keys', 'expand', 'search']);

const isTreeData = computed(() => {
  return props.isTreeData || (props.dataSource as any[]).some(item => _.isArray(item.children));
});

const {
  nativeColumns,
  selectedColumnKeys,
  currentColumns,
  handleResizeColumn
} = useColumns(props.columns as Record<string, any>[], props.pagination, isTreeData.value);

const size = ref<ESize>(ESize.default);

const handleTableChange: TableProps<Record<any, any>>['onChange'] = (pagination, filters, sorter, extra) => {
  emit('table-change', pagination, filters, sorter, extra);
}

const handlePaginationChange = (pagination: TablePaginationConfig) => {
  emit('table-change', pagination);
}

const handleExpand = (...args: any[]) => {
  emit('expand', ...args);
}
</script>
