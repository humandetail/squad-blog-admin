<template>
  <header class="query-list-header">
    <div class="search-wrapper">
      <template v-if="showSearch && searchVisible">
        <slot name="search">
          <a-input-search
            :value="localKeyword"
            :loading="loading"
            enter-button
            allow-clear
            placeholder="按「回车」进行搜索"
            @update:value="handleKeywordChange"
            @search="handleSearch"
          />
        </slot>
      </template>
    </div>

    <div class="operations-wrapper">
      <slot name="custom-operations"></slot>

      <common-query-list-header-operations
        v-model:search-visible="searchVisible"
        :loading="loading"
        :size="size"
        :columns="columns"
        :selected-column-keys="selectedColumnKeys"
        :is-table="isTable"
        @update:size="emits('update:size', $event)"
        @update:selected-column-keys="emits('update:selected-column-keys', $event)"
        @refresh="emits('refresh')"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import { Size } from '@/config/constants'
import type { ColumnProps } from 'ant-design-vue/es/table'

const props = withDefaults(defineProps<{
  showSearch?: boolean
  keyword?: string
  loading?: boolean
  columns: ColumnProps[]
  selectedColumnKeys: string[]
  isTable: boolean
  size?: Size
}>(), {
  showSearch: true,
  loading: false,
  isTable: true,
  size: Size.default
})

const emits = defineEmits<{
  (e: 'update:keyword', value: string): void
  (e: 'search', value: string): void
  (e: 'update:size', value: Size): void
  (e: 'update:selected-column-keys', value: string[]): void
  (e: 'refresh'): void
}>()

const searchVisible = ref(true)
const localKeyword = ref(props.keyword)

const handleKeywordChange = (value: string) => {
  localKeyword.value = value
  emits('update:keyword', value)
}

const handleSearch = (value: string) => {
  emits('search', value)
}

watch(() => props.keyword, () => {
  localKeyword.value = props.keyword
})
</script>

<style lang="scss" scoped>
.query-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;

  .operations-wrapper {
    display: inline-flex;
    align-items: center;
    gap: 16px;
  }
}
</style>
