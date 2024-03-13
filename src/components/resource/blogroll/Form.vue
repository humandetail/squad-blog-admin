<template>
  <common-form-card
    :title="`${!isEdit ? '新增' : '编辑'}友情链接`"
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
import { blogrollMsg } from '@/config/validateMessage'
import { type FormItem } from '@/types/common'
import type { Blogroll, BlogrollItem } from '@/types/blogroll'

const props = withDefaults(defineProps<{
  record?: BlogrollItem
  loading?: boolean
  handler: (...args: any) => any
}>(), {
  loading: false
})

const emits = defineEmits<(e: 'success') => void>()

const commonFormRef = ref()

const formData = ref<Blogroll>({
  name: '',
  link: '',
  remarks: '',
  isShow: 1,
  sort: 0
})

const isEdit = computed(() => !!props.record)

const formItems: FormItem[] = [
  {
    label: '友链名称',
    name: 'name',
    type: 'input',
    autoFocus: true,
    rules: [
      { required: true, message: blogrollMsg.name.required, trigger: 'blur' },
      { min: 2, message: blogrollMsg.name.min, trigger: 'blur' },
      { max: 32, message: blogrollMsg.name.max, trigger: 'blur' }
    ]
  },
  {
    label: '链接地址',
    name: 'link',
    type: 'input',
    rules: [
      { required: true, message: blogrollMsg.link.required, trigger: 'blur' },
      { type: 'url', message: blogrollMsg.link.type, trigger: 'blur' },
      { max: 128, message: blogrollMsg.link.max, trigger: 'blur' }
    ]
  },
  {
    label: '备注',
    name: 'remarks',
    type: 'textarea',
    rules: [
      { required: true, message: blogrollMsg.remarks.required, trigger: 'blur' },
      { max: 255, message: blogrollMsg.remarks.max, trigger: 'blur' }
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
    const { name, link, remarks, isShow, sort } = record
    formData.value = { name, link, remarks, isShow, sort }
  }
}, { immediate: true, deep: true })
</script>
