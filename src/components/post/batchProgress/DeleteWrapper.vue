<template>
  <section class="category-wrapper">
    <a-divider orientation="left">批删除</a-divider>

      <CommonQueryListBatchProgressSelector
        :selected-row-keys="selectedRowKeys"
        :all="false"
        item-name="文章"
        v-model:value="formState.selectedValue"
      />

      <a-space>
        <a-button
          danger
          :disabled="disabled"
          :loading="confirmLoading"
          @click="handleConfirm"
        >
          <DeleteOutlined />
          批删除
        </a-button>
      </a-space>
  </section>
</template>

<script setup lang="ts">
import { type BatchSelector } from '@/config/constants'

import { useRequest } from '@/composables'
import { type BaseResponse } from '@/types/common'
import { postBatchDelete } from '@/services'
import _ from 'lodash'
import { type PostBatchDelete } from '@/types/post'
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
} = useRequest<BaseResponse<null>, [PostBatchDelete]>(postBatchDelete)

const disabled = computed(() => {
  return (
    _.isUndefined(formState.selectedValue)
  )
})

const handleConfirm = () => {
  Modal.confirm({
    title: '你确实要执行此操作吗？',
    content: '此操作会将文章永久删除，无法恢复！',
    onOk: () => {
      const data = {
        ids: props.selectedRowKeys
      }

      submit(data)
        .then(() => {
          success('批删除文章成功！')
          emit('success')
        })
    }
  })
}
</script>
