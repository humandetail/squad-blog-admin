<template>
  <div class="page-role-add">
    <sys-role-form
      :handler="createRole"
      @success="handleSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { createRole } from '@/services'

const router = useRouter()

const handleSuccess = () => {
  router.push({ name: '角色管理' })
}
</script>
