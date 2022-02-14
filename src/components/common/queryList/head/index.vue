<template>
  <header class="query-list-head">
    <div class="search-wrapper">
      <template v-if="showSearch && searchVisible">
        <slot name="search">
          <InputSearch @search="$emit('search', $event)" />
        </slot>
      </template>
    </div>

    <div class="operations-wrapper">
      <div class="custom-operations">
        <slot name="customOperations" />
      </div>
      <ListOperations
        v-model:search-visible="searchVisible"
        :loading="loading"
        :size="size"
        :columns="columns"
        :selected-column-keys="selectedColumnKeys"
        :is-table="isTable"
        @update:size="$emit('update:size', $event)"
        @update:selected-column-keys="$emit('update:selected-column-keys', $event)"
        @refresh="$emit('refresh')"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ESize } from '@/config/constants';
import { ref } from 'vue';
import InputSearch from '../../form/InputSearch.vue';
import ListOperations from './ListOperations.vue';

withDefaults(defineProps<{
  loading: boolean;
  size: ESize;
  columns: Record<string, any>[]
  selectedColumnKeys: string[],
  showSearch: boolean,
  isTable: boolean;
}>(), {
  size: ESize.default,
  showSearch: true,
  isTable: true
});

// eslint-disable-next-line func-call-spacing
defineEmits<{
  (e: 'refresh'): void;
  (e: 'update:size', size: ESize): void;
  (e: 'update:selected-column-keys', columns: string[]): void;
  (e: 'search', keyword: string): void
}>();

const searchVisible = ref(true);

</script>

<style lang="less" scoped>
.query-list-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: @margin-md;

  .operations-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .custom-operations {
      margin-right: @margin-md;

      > :not(:first-of-type) {
        margin-left: @margin-md;
      }
    }
  }
}
</style>
