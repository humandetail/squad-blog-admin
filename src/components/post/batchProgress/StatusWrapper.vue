<template>
  <section class="category-wrapper">
    <a-divider orientation="left">状态批处理</a-divider>

      <CommonQueryListBatchProgressSelector
        :selected-row-keys="selectedRowKeys"
        item-name="文章"
        v-model:value="formState.selectedValue"
      />

      <a-space>
        <a-button
          type="primary"
          success
          :disabled="disabled"
          :loading="confirmLoading"
          @click="handleConfirm(1)"
        >
          <EyeOutlined />
          批显示
        </a-button>

        <a-button
          type="primary"
          :disabled="disabled"
          :loading="confirmLoading"
          @click="handleConfirm(0)"
        >
          <EyeInvisibleOutlined />
          批隐藏
        </a-button>
      </a-space>
  </section>
</template>

<script setup lang="ts">
import { BatchSelector } from '@/config/constants'

import { useRequest } from '@/composables'
import { type BaseResponse, type ZeroOrOneType } from '@/types/common'
import { postBatchStatus } from '@/services'
import _ from 'lodash'
import { type PostBatchStatus } from '@/types/post'
import { success } from '@/utils/http'
import { Modal } from 'ant-design-vue'

const props = defineProps<{
  selectedRowKeys: string[]
}>()

const emit = defineEmits<(e: 'success') => void>()

const formState = reactive<{
  selectedValue: BatchSelector | undefined
}>({
  selectedValue: undefined
})

const {
  loading: confirmLoading,
  fetch: submit
} = useRequest<BaseResponse<null>, [PostBatchStatus]>(postBatchStatus)

const disabled = computed(() => {
  return (
    _.isUndefined(formState.selectedValue)
  )
})

const handleConfirm = (isShow: ZeroOrOneType) => {
  Modal.confirm({
    title: '操作确认',
    content: '你确实要执行此操作吗？',
    onOk: () => {
      const { selectedValue } = formState
      const data = {
        isShow,
        ...(selectedValue === BatchSelector.all ? { isAll: true } : { ids: props.selectedRowKeys })
      }

      submit(data)
        .then(() => {
          success('批修改文章状态成功！')
          emit('success')
        })
    }
  })
}
</script>
