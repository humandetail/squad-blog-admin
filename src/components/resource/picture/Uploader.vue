<template>
  <section class="picture-uploader">
    <a-upload
      :file-list="value"
      :multiple="true"
      :accept="accept"
      list-type="picture-card"
      :before-upload="beforeUpload"
      @preview="handlePreview"
      @update:file-list="emits('update:value', $event)"
    >
      <div>
        <plus-outlined />
        <div style="margin-top: 8px">选择图片</div>
      </div>
    </a-upload>

    <a-modal
      :open="previewVisible"
      :title="previewTitle"
      :footer="null"
      @cancel="handleCancel"
    >
      <img
        :src="previewImage"
        :alt="previewTitle"
        style="width: 100%"
      />
    </a-modal>
  </section>
</template>

<script setup lang="ts">
import { getBase64 } from '@/utils/tools'
import { type UploadProps } from 'ant-design-vue'

withDefaults(defineProps<{
  value: Required<UploadProps>['fileList']
  accept?: string
}>(), {
  value: () => [],
  accept: '*'
})

const emits = defineEmits<(e: 'update:value', val: Array<UploadProps['fileList']>) => void>()

const previewVisible = ref(false)
const previewImage = ref('')
const previewTitle = ref('')

const beforeUpload: UploadProps['beforeUpload'] = () => {
  return false
}

const handlePreview = async (file: Required<UploadProps>['fileList'][number]) => {
  if (!file.url && !file.preview) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    file.preview = (await getBase64(file.originFileObj!)) as string
  }
  previewImage.value = file.url ?? file.preview ?? ''
  previewVisible.value = true
  previewTitle.value = file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
}
const handleCancel = () => {
  previewVisible.value = false
  previewTitle.value = ''
}
</script>
