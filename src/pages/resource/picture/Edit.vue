<template>
  <div class="page-picture-category-add">
    <resource-picture-picture-form
      :handler="handler"
      :record="record"
      :loading="loading"
      @success="handleSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { useRequest } from '@/composables'
import { editPicture, getPictureInfo } from '@/services'
import { type PictureItem } from '@/types/picture'

const router = useRouter()
const route = useRoute()

const record = ref<PictureItem>()

const { loading, fetch } = useRequest(getPictureInfo)

const handler = (data: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return editPicture(Number(route.params.id), data)
}

onMounted(async () => {
  const res = await fetch(Number(route.params.id))

  record.value = res.data
})

const handleSuccess = () => {
  router.push({ name: '图片管理' })
}
</script>
