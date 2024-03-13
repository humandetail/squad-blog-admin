<template>
  <div class="page-blogroll-add">
    <resource-blogroll-form
      :handler="createBlogroll"
      @success="handleSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { createBlogroll } from '@/services'

const router = useRouter()

const handleSuccess = () => {
  router.push({ name: '友情链接管理' })
}
</script>
