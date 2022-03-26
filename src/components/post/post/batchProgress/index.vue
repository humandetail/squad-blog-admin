<template>
  <a-modal
    :visible="visible"
    title="文章批处理"
    width="800px"
    :footer="null"
    @cancel="$emit('close')">
    <CategoryWrapper
      :selected-row-keys="selectedRowKeys"
      @success="$emit('success')"
    />

    <TagsWrapper
      :selected-row-keys="selectedRowKeys"
      @success="$emit('success')"
    />

    <StatusWrapper
      :selected-row-keys="selectedRowKeys"
      @success="$emit('success')"
    />

    <DeleteWrapper
      :selected-row-keys="selectedRowKeys"
      @success="$emit('success')"
    />

    <TemplateWrapper
      :selected-row-keys="selectedRowKeys"
      @success="$emit('success')"
    />
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CategoryWrapper from './CategoryWrapper.vue';
import TagsWrapper from './TagsWrapper.vue';
import TemplateWrapper from './TemplateWrapper.vue';
import StatusWrapper from './StatusWrapper.vue';
import DeleteWrapper from './DeleteWrapper.vue';

defineProps<{
  selectedRowKeys: string[]
}>();

// eslint-disable-next-line func-call-spacing
defineEmits<{
  (e: 'close'): void;
  (e: 'success'): void;
}>();

const visible = ref(true);
</script>
