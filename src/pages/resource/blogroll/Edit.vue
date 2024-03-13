<template>
  <div class="page-blogroll-edit">
    <resource-blogroll-form
      :handler="handler"
      :record="record"
      :loading="loading"
      @success="handleSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { useRequest } from '@/composables'
import { getBlogrollInfo, editBlogroll } from '@/services'
import type { Blogroll, BlogrollItem } from '@/types/blogroll'

const router = useRouter()
const route = useRoute()

const record = ref<Blogroll>()

const { loading, fetch } = useRequest(getBlogrollInfo)

const handler = (data: BlogrollItem) => {
  return editBlogroll(Number(route.params.id), data)
}

onMounted(async () => {
  const res = await fetch(Number(route.params.id))

  record.value = res.data
})

const handleSuccess = () => {
  router.push({ name: '友情链接管理' })
}
</script>
