<template>
  <a-modal
    :visible="visible"
    width="80%"
    title="选择挂载点"
    :footer="null"
    @cancel="$emit('close')"
  >
    <personal-base-selector-table
      :value="value"
      @select="$emit('select', $event)"
    />
  </a-modal>
</template>

<script setup lang="ts">
import { type PersonalBaseItem } from '@/types/personal'

withDefaults(defineProps<{
  value?: number
}>(), {
  value: 0
})

const visible = ref(true)

defineEmits<{
  (e: 'select', value: PersonalBaseItem): void
  (e: 'close'): void
}>()
</script>
