<template>
  <div class="page-personal-work-edit">
    <personal-work-form
      :handler="handler"
      :record="record"
      :loading="loading"
      @success="handleSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { useRequest } from '@/composables'
import { getPersonalWorkInfo, editPersonalWork } from '@/services'
import type { PersonalWork, PersonalWorkItem } from '@/types/personal'

const router = useRouter()
const route = useRoute()

const record = ref<PersonalWorkItem>()

const { loading, fetch } = useRequest(getPersonalWorkInfo)

const handler = (data: PersonalWork) => {
  return editPersonalWork(Number(route.params.id), data)
}

onMounted(async () => {
  const res = await fetch(Number(route.params.id))

  record.value = res.data
})

const handleSuccess = () => {
  router.push({ name: '作品集' })
}
</script>
