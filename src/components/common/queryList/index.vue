<template>
  <a-card class="query-list">
    <query-list-head
      v-model:size="size"
      :columns="nativeColumns"
      :loading="loading"
      v-model:selected-column-keys="selectedColumnKeys"
      @refresh="$emit('refresh')">
      <template #search>
        123
        <slot name="search" />
      </template>

      <template #customOperations>
        <slot name="customOperations" />
        <a-button type="primary">TEST</a-button>
      </template>
    </query-list-head>
    <!-- <CommonTable></CommonTable> -->
    <slot name="list">
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
        @resizeColumn="handleResizeColumn"></a-table>
    </slot>

    <query-list-foot
      :selectedRowKeys="selectedRowKeys"
      :pagination="pagination"
      @update:selectedRowKeys="$emit('update:selected-row-keys', $event)"
      @pagination-change="handlePaginationChange"></query-list-foot>
  </a-card>
</template>

<script setup lang="ts">
import QueryListHead from './head/index.vue';
import QueryListFoot from './foot/index.vue';
import { ref, watchEffect } from 'vue';
import { Table, TableProps } from 'ant-design-vue';
import type { TablePaginationConfig } from 'ant-design-vue';
import { ESize } from '@/config/constants';
import { TableDataType } from '@/views/sys/menu/List.vue';
import { useColumns } from '@/hooks/queryList';

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

  loading: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['refresh', 'table-change', 'update:selected-row-keys']);

const {
  nativeColumns,
  selectedColumnKeys,
  currentColumns,
  handleResizeColumn
} = useColumns(props.columns as Record<string, any>[], props.pagination);

const size = ref<ESize>(ESize.default);

const handleTableChange: TableProps<TableDataType>['onChange'] = (pagination, filters, sorter, extra) => {
  emit('table-change', pagination, filters, sorter, extra);
}

const handlePaginationChange = (pagination: TablePaginationConfig) => {
  emit('table-change', pagination);
}

watchEffect(() => {

});
</script>
