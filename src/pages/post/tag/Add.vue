<template>
  <div class="page-post-tag-add">
    <post-tag-form
      :handler="createPostTag"
      @success="handleSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { createPostTag } from '@/services'

const router = useRouter()

const handleSuccess = () => {
  router.push({ name: '文章标签管理' })
}
</script>
