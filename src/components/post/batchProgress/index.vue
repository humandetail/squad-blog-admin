<template>
  <a-modal
    :open="visible"
    title="文章批处理"
    width="800px"
    :footer="null"
    @cancel="$emit('close')"
  >
    <PostBatchProgressCategoryWrapper
      :selected-row-keys="selectedRowKeys"
      @success="$emit('success')"
    />

    <PostBatchProgressTagsWrapper
      :selected-row-keys="selectedRowKeys"
      @success="$emit('success')"
    />

    <PostBatchProgressStatusWrapper
      :selected-row-keys="selectedRowKeys"
      @success="$emit('success')"
    />

    <PostBatchProgressDeleteWrapper
      :selected-row-keys="selectedRowKeys"
      @success="$emit('success')"
    />

    <PostBatchProgressTemplateWrapper
      :selected-row-keys="selectedRowKeys"
      @success="$emit('success')"
    />
  </a-modal>
</template>

<script setup lang="ts">
defineProps<{
  selectedRowKeys: string[]
}>()

defineEmits<{
  (e: 'close'): void
  (e: 'success'): void
}>()

const visible = ref(true)
</script>
