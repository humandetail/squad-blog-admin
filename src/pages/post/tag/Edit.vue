<template>
  <div class="page-post-tag-edit">
    <post-tag-form
      :handler="handler"
      :record="record"
      :loading="loading"
      @success="handleSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { useRequest } from '@/composables'
import { getPostTagInfo, editPostTag } from '@/services'
import type { PostTag, PostTagItem } from '@/types/post'

const router = useRouter()
const route = useRoute()

const record = ref<PostTag>()

const { loading, fetch } = useRequest(getPostTagInfo)

const handler = (data: PostTagItem) => {
  return editPostTag(Number(route.params.id), data)
}

onMounted(async () => {
  const res = await fetch(Number(route.params.id))

  record.value = res.data
})

const handleSuccess = () => {
  router.push({ name: '文章标签管理' })
}
</script>
