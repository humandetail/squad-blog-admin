<template>
  <common-form-card
    title="新增图片分类"
    :loading="commonFormRef?.confirmLoading"
    :reset="commonFormRef?.resetFields"
    :submit="commonFormRef?.submit"
  >
    <a-spin :spinning="loading">
      <common-form
        ref="commonFormRef"
        :form-data="formData"
        :form-items="formItems"
        :submit-handler="handler"
        @success="emits('success')"
      />
    </a-spin>
  </common-form-card>
</template>

<script setup lang="ts">
import { pictureCategoryMsg } from '@/config/validateMessage'
import { type FormItem } from '@/types/common'
import type { PictureCategory, PictureCategoryItem } from '@/types/picture'

const props = withDefaults(defineProps<{
  record?: PictureCategoryItem
  loading?: boolean
  handler: (...args: any) => any
}>(), {
  loading: false
})

const emits = defineEmits<(e: 'success') => void>()

const commonFormRef = ref()

const formData = ref<PictureCategory>({
  name: '',
  displayName: '',
  isShow: 1,
  sort: 0
})

const formItems: FormItem[] = [
  {
    label: '分类名称',
    name: 'name',
    type: 'input',
    autoFocus: true,
    rules: [
      { required: true, message: pictureCategoryMsg.name.required, trigger: 'blur' },
      { min: 2, message: pictureCategoryMsg.name.min, trigger: 'blur' },
      { max: 32, message: pictureCategoryMsg.name.max, trigger: 'blur' }
    ]
  },
  {
    label: '分类显示名称',
    name: 'displayName',
    type: 'input',
    rules: [
      { required: true, message: pictureCategoryMsg.displayName.required, trigger: 'blur' },
      { min: 2, message: pictureCategoryMsg.displayName.min, trigger: 'blur' },
      { max: 64, message: pictureCategoryMsg.displayName.max, trigger: 'blur' }
    ]
  },
  {
    label: '是否显示',
    name: 'isShow',
    type: 'switch'
  },
  {
    label: '排序',
    name: 'sort',
    type: 'input-number',
    min: 0,
    precision: 0
  }
]

watch(() => props.record, record => {
  if (record) {
    const { name, displayName, isShow, sort } = record
    formData.value = { name, displayName, isShow, sort }
  }
}, { immediate: true, deep: true })
</script>
