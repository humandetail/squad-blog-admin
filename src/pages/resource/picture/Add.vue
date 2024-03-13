<template>
  <div class="page-picture-category-add">
    <resource-picture-picture-form
      :handler="submit"
      @success="handleSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { createPicture } from '@/services'
import { type Picture } from '@/types/picture'
import { error } from '@/utils/http'

const router = useRouter()

const handleSuccess = () => {
  router.push({ name: '图片管理' })
}

const submit = async (formData: Picture) => {
  const { fileList, categoryId, isShow, sort } = formData

  const res = await Promise.all(fileList.map(fileItem => {
    fileItem.status = 'uploading'

    return createPicture({
      file: fileItem.originFileObj!,
      name: fileItem.name,
      categoryId,
      isShow,
      sort
    }).then(() => {
      fileItem.status = 'success'
      return true
    }).catch(() => {
      error(`「${fileItem.name}」上传失败`)
      fileItem.status = 'error'
      return false
    })
  }))

  return {
    code: res.every(Boolean) ? 200 : -1,
    message: 'finish',
    data: res
  }
}
</script>
