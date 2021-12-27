<template>
  <footer class="query-list-foot">
    <div class="selected-total-wrapper">
      <div class="total">
        已选择 {{ selectedTotal }} 项
      </div>
      <div
        v-if="selectedTotal > 0"
        class="cancel">
        <a-button
          type="link"
          @click="$emit('update:selectedRowKeys', [])">
          取消选择
        </a-button>
      </div>
    </div>

    <a-pagination
      v-if="pagination"
      v-bind="fullPagination"
      @change="handlePaginationChange"
    />
  </footer>
</template>

<script setup lang="ts">
import { PaginationProps } from 'ant-design-vue';
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  selectedRowKeys?: unknown[];
  pagination?: PaginationProps
}>(), {
  selectedRowKeys: () => []
});

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (e: 'update:selectedRowKeys', keys: unknown[]): void;
  (e: 'pagination-change', pagination: PaginationProps): void
}>();

const selectedTotal = computed(() => {
  return props.selectedRowKeys.length;
});

const fullPagination = computed<PaginationProps | null>(() => {
  if (!props.pagination) {
    return null;
  }

  return {
    ...props.pagination,
    showTotal: (total: number, range: [number, number]) => `当前显示 ${range[0]}-${range[1]}，共 ${total} 条记录`,
    showQuickJumper: true,
    showSizeChanger: true
  }
});

const handlePaginationChange = (page: number, pageSize: number) => {
  emit('pagination-change', {
    ...fullPagination.value,
    current: page,
    pageSize
  })
}
</script>

<style lang="less" scoped>
.query-list-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: @margin-md;

  .selected-total-wrapper {
    display: flex;
    align-items: center;

    .ant-btn {
      margin-left: @margin-md;
    }
  }
}
</style>
