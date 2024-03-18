<template>
  <div class="page-post-category-add">
    <post-category-form
      :handler="createPostCategory"
      @success="handleSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { createPostCategory } from '@/services'

const router = useRouter()

const handleSuccess = () => {
  router.push({ name: '文章分类管理' })
}
</script>
