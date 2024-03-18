<template>
  <div class="page-personal-skill-edit">
    <personal-skill-form
      :handler="handler"
      :record="record"
      :loading="loading"
      @success="handleSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { useRequest } from '@/composables'
import { getPersonalSkillInfo, editPersonalSkill } from '@/services'
import type { PersonalSkill, PersonalSkillItem } from '@/types/personal'

const router = useRouter()
const route = useRoute()

const record = ref<PersonalSkill>()

const { loading, fetch } = useRequest(getPersonalSkillInfo)

const handler = (data: PersonalSkillItem) => {
  return editPersonalSkill(Number(route.params.id), data)
}

onMounted(async () => {
  const res = await fetch(Number(route.params.id))

  record.value = res.data
})

const handleSuccess = () => {
  router.push({ name: '个人技能' })
}
</script>
