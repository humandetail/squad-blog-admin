<template>
  <div class="page-personal-skill-add">
    <personal-skill-form
      :handler="createPersonalSkill"
      @success="handleSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { createPersonalSkill } from '@/services'

const router = useRouter()

const handleSuccess = () => {
  router.push({ name: '个人技能' })
}
</script>
