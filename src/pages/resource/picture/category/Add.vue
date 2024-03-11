<template>
  <div class="page-picture-category-add">
    <resource-picture-category-form
      :handler="createPictureCategory"
      @success="handleSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { createPictureCategory } from '@/services'

const router = useRouter()

const handleSuccess = () => {
  router.push({ name: '图片分类管理' })
}
</script>
