<template>
  <section class="tags-wrapper">
    <a-divider orientation="left">标签批处理</a-divider>

    <a-spin :spinning="fetchLoading">
      <CommonQueryListBatchProgressSelector
        :selected-row-keys="selectedRowKeys"
        item-name="文章"
        v-model:value="formState.selectedValue"
      />

      <a-space>
        <a-select v-model:value="formState.tagId">
          <a-select-option :disabled="formState.action === 'change'" :value="0">所有标签</a-select-option>
          <a-select-option
            v-for="item in tags"
            :key="item.id"
            :value="item.id"
          >
            {{ item.displayName }}
          </a-select-option>
        </a-select>

        <a-select v-model:value="formState.action">
          <a-select-option
            v-for="[key, value] in Object.entries(actions)"
            :key="key"
            :value="key"
          >
            {{ value }}
          </a-select-option>
        </a-select>

        <a-select v-model:value="formState.newTagId">
          <a-select-option
            v-for="item in tags"
            :key="item.id"
            :value="item.id"
          >
            {{ item.displayName }}
          </a-select-option>
        </a-select>

        <a-button
          type="primary"
          :disabled="disabled"
          :loading="confirmLoading"
          @click="handleConfirm"
        >
          <SaveOutlined />
          确认操作
        </a-button>
      </a-space>
    </a-spin>
  </section>
</template>

<script setup lang="ts">
import { BatchSelector } from '@/config/constants'

import { useRequest } from '@/composables'
import { type BasePageParams, type BasePageResponse, type BaseResponse } from '@/types/common'
import { getPostTags, postBatchTag } from '@/services'
import _ from 'lodash'
import { type PostBatchTag, type PostBatchTagAction, type PostTagItem } from '@/types/post'
import { success } from '@/utils/http'
import { Modal } from 'ant-design-vue'

const props = defineProps<{
  selectedRowKeys: string[]
}>()

const emit = defineEmits<(e: 'success') => void>()

const actions = Object.freeze({
  change: '改变为',
  add: '新增',
  remove: '删除'
})

const tags = ref<PostTagItem[]>([])
const formState = reactive<{
  selectedValue: BatchSelector | undefined
  tagId: number
  newTagId: number
  action: PostBatchTagAction
}>({
  selectedValue: undefined,
  tagId: 0,
  newTagId: 0,
  action: 'change'
})

const {
  loading: fetchLoading,
  fetch
} = useRequest<BasePageResponse<PostTagItem[]>, [BasePageParams]>(getPostTags)

const {
  loading: confirmLoading,
  fetch: submit
} = useRequest<BaseResponse<null>, [PostBatchTag]>(postBatchTag)

const disabled = computed(() => {
  return (
    _.isUndefined(formState.selectedValue) ||
    !Number.isInteger(formState.tagId) ||
    !tags.value.find(item => item.id === formState.newTagId)
  )
})

onMounted(async () => {
  const res = await fetch({
    current: 1,
    pageSize: 100
  })

  tags.value = res.data.records || []

  formState.newTagId = tags.value?.[0].id
  formState.tagId = tags.value?.[0].id
})

watch(() => formState.action, (action) => {
  if (action === 'change' && formState.tagId === 0) {
    formState.tagId = tags.value?.[0].id
  }
}, { deep: true })

const handleConfirm = () => {
  Modal.confirm({
    title: '操作确认',
    content: '你确实要执行此操作吗？',
    onOk: () => {
      const { selectedValue, tagId, newTagId, action } = formState
      const data = {
        newTagId,
        action,
        ...(action === 'change' ? { tagId } : null),
        ...(selectedValue === BatchSelector.all ? { isAll: true } : { ids: props.selectedRowKeys })
      } as PostBatchTag

      submit(data)
        .then(() => {
          success('批修改文章标签成功！')
          emit('success')
        })
    }
  })
}
</script>
