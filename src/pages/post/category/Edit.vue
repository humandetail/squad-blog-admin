<template>
  <div class="page-post-category-edit">
    <post-category-form
      :handler="handler"
      :record="record"
      :loading="loading"
      @success="handleSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { useRequest } from '@/composables'
import { getPostCategoryInfo, editPostCategory } from '@/services'
import type { PostCategory, PostCategoryItem } from '@/types/post'

const router = useRouter()
const route = useRoute()

const record = ref<PostCategory>()

const { loading, fetch } = useRequest(getPostCategoryInfo)

const handler = (data: PostCategoryItem) => {
  return editPostCategory(Number(route.params.id), data)
}

onMounted(async () => {
  const res = await fetch(Number(route.params.id))

  record.value = res.data
})

const handleSuccess = () => {
  router.push({ name: '文章分类管理' })
}
</script>
