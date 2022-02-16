<template>
  <a-input-search
    class="input-search"
    allow-clear
    v-model:value.trim="value"
    @search="handleSearch">
    <template #enterButton>
      <a-button
        :loading="loading">
        <template #icon>
          <SearchIcon />
        </template>
      </a-button>
    </template>
  </a-input-search>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SearchIcon from '../icons/SearchIcon.vue';

defineProps<{
  loading?: boolean;
}>();

const emit = defineEmits<{(e: 'search', value: string): void}>();

const value = ref('');

const handleSearch = (searchValue: string) => {
  emit('search', searchValue.trim());
}
</script>

<style lang="less" scoped>
.input-search {
  :deep(.ant-btn) {
    border-color: #434343 !important;
  }
}
</style>
