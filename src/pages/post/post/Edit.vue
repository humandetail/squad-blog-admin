<template>
  <div class="page-post-edit">
    <post-form
      :handler="handler"
      :record="record"
      :loading="loading"
      @success="handleSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { useRequest } from '@/composables'
import { getPostInfo, editPost } from '@/services'
import type { Post, PostItem } from '@/types/post'

const router = useRouter()
const route = useRoute()

const record = ref<PostItem>()

const { loading, fetch } = useRequest(getPostInfo)

const handler = (data: Post) => {
  return editPost(route.params.id as string, data)
}

onMounted(async () => {
  const res = await fetch(route.params.id as string)

  record.value = res.data
})

const handleSuccess = () => {
  router.push({ name: '所有文章' })
}
</script>
