<template>
  <a-modal
    :visible="visible"
    width="80%"
    title="选择挂载点"
    :footer="null"
    @cancel="$emit('close')">
    <BaseSelectorTable
      :value="value"
      @select="$emit('select', $event)"
    />
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IPersonalBaseItem } from '@/types/personalBase';

import BaseSelectorTable from './BaseSelectorTable.vue';

withDefaults(defineProps<{
  value?: number;
}>(), {
  value: 0
});

const visible = ref(true);

// eslint-disable-next-line func-call-spacing
defineEmits<{
  (e: 'select', value: IPersonalBaseItem): void;
  (e: 'close'): void
}>();
</script>
