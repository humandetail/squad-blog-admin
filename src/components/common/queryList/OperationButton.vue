<template>
  <a-popconfirm
    v-if="type === 'danger'"
    :title="`确定要执行「${content}」操作吗？`"
    @confirm="handleConfirm"
  >
    <template #icon>
      <DynamicIcon
        icon="QuestionCircleOutlined"
        :color="token.colorWarning"
      />
    </template>

    <a-button
      type="link"
      danger
    >
      <DynamicIcon
        v-if="icon"
        :icon="icon"
      />
      {{ content }}
    </a-button>
  </a-popconfirm>

  <a-button
    v-else
    type="link"
    v-bind="{
      [type ?? '']: true
    }"
    @click="handleConfirm"
  >
    <DynamicIcon
      v-if="icon"
      :icon="icon"
    />
    {{ content }}
  </a-button>
</template>

<script setup lang="ts">
import { theme } from 'ant-design-vue'
import DynamicIcon from '../DynamicIcon'

const props = defineProps<{
  record: Record<string, any>
  content: string
  icon?: string
  type?: string
  handler?: (record: Record<string, any>) => any
}>()

const { token } = theme.useToken()

const handleConfirm = () => {
  props.handler?.(props.record)
}
</script>
