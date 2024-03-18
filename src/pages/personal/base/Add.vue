<template>
  <div class="page-personal-base-add">
    <personal-base-form
      :handler="createPersonalBase"
      @success="handleSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { createPersonalBase } from '@/services'

const router = useRouter()

const handleSuccess = () => {
  router.push({ name: '基本信息' })
}
</script>
