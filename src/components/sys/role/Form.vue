<template>
  <common-form-card
    :title="`${!isEdit ? '新增' : '编辑'}角色`"
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
import { roleMsg } from '@/config/validateMessage'
import { type FormItem } from '@/types/common'
import type { Role, RoleItem } from '@/types/role'

const props = withDefaults(defineProps<{
  record?: RoleItem
  loading?: boolean
  handler: (...args: any) => any
}>(), {
  loading: false
})

const emits = defineEmits<(e: 'success') => void>()

const commonFormRef = ref()

const formData = ref<Role>({
  name: '',
  remarks: '',
  isShow: 1,
  sort: 0
})

const isEdit = computed(() => !!props.record)

const formItems: FormItem[] = [
  {
    label: '角色名称',
    name: 'name',
    type: 'input',
    autoFocus: true,
    rules: [
      { required: true, message: roleMsg.name.required, trigger: 'blur' }
    ]
  },
  {
    label: '备注',
    name: 'remarks',
    type: 'textarea'
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
    const { name, remarks, isShow, sort } = record
    formData.value = { name, remarks, isShow, sort }
  }
}, { immediate: true, deep: true })
</script>
