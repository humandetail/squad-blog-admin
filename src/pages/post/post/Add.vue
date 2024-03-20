<template>
  <div class="page-post-add">
    <post-form
      :handler="createPost"
      @success="handleSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { createPost } from '@/services'

const router = useRouter()

const handleSuccess = () => {
  router.push({ name: '所有文章' })
}
</script>
