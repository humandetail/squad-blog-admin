<template>
  <a-card class="query-list">
    <slot name="header">
      <common-query-list-header
        :show-search="showSearch"
        :keyword="keyword"
        :loading="loading"
        :columns="nativeColumns"
        :is-table="isTable"
        v-model:size="size"
        v-model:selected-column-keys="selectedColumnKeys"
        @search="emits('search', $event)"
      />
    </slot>

    <slot name="table">
      <a-table
        bordered
        :rowKey="rowKey"
        :size="size"
        :columns="currentColumns"
        :data-source="dataSource"
        :row-selection="rowSelection"
        :scroll="{ x: 'max-content', scrollToFirstRowOnChange: true }"
        :pagination="false"
        @change="handleTableChange"
        @resize-column="handleResizeColumn"
        @expand="handleExpand"
      >
        <template #headerCell="headerCell">
          <slot name="headerCell" v-bind="headerCell"></slot>
        </template>
        <template #bodyCell="bodyCell">
          <slot name="bodyCell" v-bind="bodyCell"></slot>
        </template>
      </a-table>
    </slot>

    <slot name="footer">
      <common-query-list-footer
        :selectedRowKeys="selectedRowKeys"
        :pagination="pagination"
        @update:selectedRowKeys="$emit('update:selected-row-keys', $event)"
        @pagination-change="handlePaginationChange"
      />
    </slot>
  </a-card>
</template>

<script
  setup
  lang="ts"
  generic="T extends Record<PropertyKey, any> = {}"
>
import { useColumns } from '@/composables'
import { Size } from '@/config/constants'
import { Table, type PaginationProps } from 'ant-design-vue'
import type { ColumnProps, TableProps } from 'ant-design-vue/es/table'
import type { FilterValue, SorterResult, TableCurrentDataSource, TablePaginationConfig, TableRowSelection } from 'ant-design-vue/es/table/interface'
import _ from 'lodash'

const props = withDefaults(defineProps<{
  columns: ColumnProps[]
  dataSource: T[]
  rowKey?: string | number | ((arg: Record<any, any>) => string | number)
  pagination?: PaginationProps
  rowSelection?: TableRowSelection
  selectedRowKeys?: Array<string | number>
  isTreeData?: boolean
  loading?: boolean
  showSearch?: boolean
  isTable?: boolean
  keyword?: string
}>(), {
  columns: () => [],
  dataSource: () => [],
  rowKey: 'id',
  isTreeData: false,
  loading: false,
  showSearch: true,
  isTable: true
})

const emits = defineEmits<{
  (e: 'update:selected-row-keys', value: Array<string | number>): void
  (e: 'table-change', pagination: TablePaginationConfig, filters?: Record<string, FilterValue | null>, sorter?: SorterResult<any> | Array<SorterResult<any>>, extra?: TableCurrentDataSource<any>): void
  (e: 'expand', expanded: boolean, record: any): void
  (e: 'search', value: string): void
}>()

const size = ref(Size.default)

const rowSelection = computed(() => {
  return props.rowSelection
    ? props.rowSelection
    : props.selectedRowKeys
      ? {
          selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE
          ],
          selectedRowKeys: props.selectedRowKeys,
          fixed: true,
          columnWidth: 60,
          onChange: (keys: Array<string | number>) => {
            emits('update:selected-row-keys', keys)
          }
        }
      : null
})

const isTreeData = computed(() => props.isTreeData ?? props.dataSource.some(item => _.isArray(item.children)))

const {
  nativeColumns,
  currentColumns,
  selectedColumnKeys,
  handleResizeColumn
} = useColumns(props.columns, props.pagination, isTreeData)

const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter, extra) => {
  emits('table-change', pagination, filters, sorter, extra)
}

const handlePaginationChange = (pagination: TablePaginationConfig) => {
  emits('table-change', pagination)
}

const handleExpand: TableProps['onExpand'] = (expended, record) => {
  emits('expand', expended, record)
}
</script>
