<template>
  <section class="category-wrapper">
    <a-divider orientation="left">分类批处理</a-divider>

    <a-spin :spinning="fetchLoading">
      <CommonQueryListBatchProgressSelector
        :selected-row-keys="selectedRowKeys"
        item-name="文章"
        v-model:value="formState.selectedValue"
      />

      <a-space>
        <a-select v-model:value="formState.categoryId">
          <a-select-option :value="0">所有分类</a-select-option>
          <a-select-option
            v-for="item in categories"
            :key="item.id"
            :value="item.id"
          >
            {{ item.displayName }}
          </a-select-option>
        </a-select>

        <span>改变为</span>

        <a-select v-model:value="formState.newCategoryId">
          <a-select-option
            v-for="item in categories"
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

import type { PostCategoryItem, PostBatchCategory } from '@/types/post'
import { useRequest } from '@/composables'
import { type BasePageParams, type BasePageResponse, type BaseResponse } from '@/types/common'
import { getPostCategories, postBatchCategory } from '@/services'
import _ from 'lodash'
import { success } from '@/utils/http'
import { Modal } from 'ant-design-vue'

const props = defineProps<{
  selectedRowKeys: string[]
}>()

const emit = defineEmits<(e: 'success') => void>()

const categories = ref<PostCategoryItem[]>([])
const formState = reactive<{
  selectedValue: BatchSelector | undefined
  categoryId: number
  newCategoryId: number
}>({
  selectedValue: undefined,
  categoryId: 0,
  newCategoryId: 0
})

const {
  loading: fetchLoading,
  fetch
} = useRequest<BasePageResponse<PostCategoryItem[]>, [BasePageParams]>(getPostCategories)

const {
  loading: confirmLoading,
  fetch: submit
} = useRequest<BaseResponse<null>, [PostBatchCategory]>(postBatchCategory)

const disabled = computed(() => {
  return (
    _.isUndefined(formState.selectedValue) ||
    !Number.isInteger(formState.categoryId) ||
    !categories.value.find(item => item.id === formState.newCategoryId)
  )
})

onMounted(async () => {
  const res = await fetch({
    current: 1,
    pageSize: 100
  })

  categories.value = res.data.records || []

  formState.newCategoryId = categories.value?.[0].id
})

const handleConfirm = () => {
  Modal.confirm({
    title: '操作确认',
    content: '你确实要执行此操作吗？',
    onOk: () => {
      const { selectedValue, categoryId, newCategoryId } = formState
      const data = {
        categoryId,
        newCategoryId,
        ...(selectedValue === BatchSelector.all ? { isAll: true } : { ids: props.selectedRowKeys })
      }

      submit(data)
        .then(() => {
          success('批修改文章分类成功！')
          emit('success')
        })
    }
  })
}
</script>
