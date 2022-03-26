<template>
  <a-modal
    :visible="visible"
    title="作品集批处理"
    width="800px"
    :footer="null"
    @cancel="$emit('close')">
    <ChangeBaseWrapper
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
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ChangeBaseWrapper from './ChangeBaseWrapper.vue';
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
