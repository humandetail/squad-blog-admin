<template>
  <div class="page-picture-category-edit">
    <resource-picture-category-form
      :handler="handler"
      :record="record"
      :loading="loading"
      @success="handleSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { useRequest } from '@/composables'
import { getPictureCategoryInfo, editPictureCategory } from '@/services'
import type { PictureCategory, PictureCategoryItem } from '@/types/picture'

const router = useRouter()
const route = useRoute()

const record = ref<PictureCategoryItem>()

const { loading, fetch } = useRequest(getPictureCategoryInfo)

const handler = (data: PictureCategory) => {
  return editPictureCategory(Number(route.params.id), data)
}

onMounted(async () => {
  const res = await fetch(Number(route.params.id))

  record.value = res.data
})

const handleSuccess = () => {
  router.push({ name: '图片分类管理' })
}
</script>
