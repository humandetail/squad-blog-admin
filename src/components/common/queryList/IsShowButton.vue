<template>
  <a-button
    type="link"
    v-bind="{
      [record.isShow ? 'primary' : 'success']: true
    }"
    @click="handleClick"
  >
    {{ record.isShow ? '隐藏' : '显示' }}
  </a-button>
</template>

<script setup lang="ts">
import { useRequest } from '@/composables'
import { type BaseResponse, type ZeroOrOneType } from '@/types/common'
import { success } from '@/utils/http'

const props = defineProps<{
  record: {
    id: number
    isShow: ZeroOrOneType
    [key: string]: any
  }
  isShowLoading?: boolean
  handler: (id: number, isShow: ZeroOrOneType) => any
}>()

const emits = defineEmits<{
  (e: 'update:is-show-loading', val: boolean): void
  (e: 'success'): void
}>()

const { fetch } = useRequest<BaseResponse<null>, [number, ZeroOrOneType]>(props.handler)

const handleClick = async () => {
  emits('update:is-show-loading', true)
  try {
    const { id, isShow } = props.record
    await fetch(id, isShow === 1 ? 0 : 1)
    success('操作成功')
    emits('success')
  } finally {
    emits('update:is-show-loading', false)
  }
}
</script>
