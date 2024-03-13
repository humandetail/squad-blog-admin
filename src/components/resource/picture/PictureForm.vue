<template>
  <common-form-card
    :title="`${isEdit ? '编辑' : '新增'}图片`"
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
      >
        <template #fileList="{ modelRef, item }">
          <a-image
            v-if="isEdit"
            :src="record?.qiniuDomain && record?.qiniuKey ? `${record.qiniuDomain}${record.qiniuKey}` : ''"
            :width="200"
          />

          <resource-picture-uploader
            v-else
            v-model:value="modelRef[item.name]"
            @update:value="handleFileChange"
          />
        </template>

        <template #categoryId="{ modelRef, item }">
          <resource-picture-category-selector
            v-model:value="modelRef[item.name]"
          />
        </template>
      </common-form>
    </a-spin>
  </common-form-card>
</template>

<script setup lang="ts">
import { pictureMsg } from '@/config/validateMessage'
import { type FormItem } from '@/types/common'
import type { Picture, PictureItem } from '@/types/picture'
import { type UploadProps } from 'ant-design-vue'

const props = withDefaults(defineProps<{
  record?: PictureItem
  loading?: boolean
  handler: (...args: any) => any
}>(), {
  loading: false
})

const emits = defineEmits<(e: 'success') => void>()

const commonFormRef = ref()

const formData = ref<Picture>({
  fileList: [],
  name: '',
  categoryId: 0,
  isShow: 1,
  sort: 0
})

const isEdit = computed(() => !!props.record)

const formItems = computed<FormItem[]>(() => [
  {
    label: '图片',
    name: 'fileList',
    type: 'custom',
    customRender: 'fileList',
    rules: [
      { required: !isEdit.value, message: pictureMsg.file.required, trigger: 'change' }
    ]
  },
  {
    label: '图片名称',
    name: 'name',
    type: 'input',
    rules: [
      { required: true, message: pictureMsg.name.required, trigger: 'blur' },
      { min: 2, message: pictureMsg.name.min, trigger: 'blur' },
      { max: 32, message: pictureMsg.name.max, trigger: 'blur' }
    ]
  },
  {
    label: '图片分类',
    name: 'categoryId',
    type: 'custom',
    customRender: 'categoryId',
    rules: [
      { required: true, type: 'integer', min: 1, message: pictureMsg.categoryId.required, trigger: 'change' }
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
])

const handleFileChange = (fileList: Required<UploadProps>['fileList']) => {
  commonFormRef.value.modelRef.name = fileList.at(-1)?.name ?? ''
}

watch(() => props.record, record => {
  if (record) {
    const { name, categoryId, isShow, sort } = record
    formData.value = { name, categoryId, isShow, sort, fileList: [] }
  }
}, { immediate: true, deep: true })
</script>
