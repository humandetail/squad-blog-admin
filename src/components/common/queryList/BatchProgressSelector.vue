<template>
  <div class="selector">
    对
    <a-radio-group
      :value="value"
      name="selector"
      @change="handleChange"
    >
      <a-radio
        v-if="all"
        :value="BatchSelector.all"
      >
        所有{{ itemName }}
      </a-radio>
      <a-radio
        :disabled="selectedRowKeys.length <= 0"
        :value="BatchSelector.selected">
        选中的【{{ total }}】条{{ itemName }}
      </a-radio>
    </a-radio-group>
    进行操作
  </div>
</template>

<script setup lang="ts">
import { BatchSelector } from '@/config/constants'

const props = withDefaults(defineProps<{
  value: BatchSelector | undefined
  selectedRowKeys: any[]
  itemName?: string
  all?: boolean
}>(), {
  itemName: '项目',
  all: true
})

const emit = defineEmits<(e: 'update:value', value: BatchSelector) => void>()

const total = computed(() => {
  return props.selectedRowKeys.length
})

const handleChange = (e: any) => {
  emit('update:value', e.target.value as BatchSelector)
}
</script>

<style lang="scss" scoped>
.selector {
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  .ant-radio-group {
    margin-left: 16px;
  }
}
</style>
