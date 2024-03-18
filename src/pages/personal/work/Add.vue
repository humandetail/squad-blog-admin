<template>
  <div class="page-personal-work-add">
    <personal-work-form
      :handler="createPersonalWork"
      @success="handleSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { createPersonalWork } from '@/services'

const router = useRouter()

const handleSuccess = () => {
  router.push({ name: '作品集' })
}
</script>
