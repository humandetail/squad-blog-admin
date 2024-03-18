<template>
  <div class="page-personal-base-edit">
    <personal-base-form
      :handler="handler"
      :record="record"
      :loading="loading"
      @success="handleSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { useRequest } from '@/composables'
import { getPersonalBaseInfo, editPersonalBase } from '@/services'
import type { PersonalBase, PersonalBaseItem } from '@/types/personal'

const router = useRouter()
const route = useRoute()

const record = ref<PersonalBase>()

const { loading, fetch } = useRequest(getPersonalBaseInfo)

const handler = (data: PersonalBaseItem) => {
  return editPersonalBase(Number(route.params.id), data)
}

onMounted(async () => {
  const res = await fetch(Number(route.params.id))

  record.value = res.data
})

const handleSuccess = () => {
  router.push({ name: '基本信息' })
}
</script>
