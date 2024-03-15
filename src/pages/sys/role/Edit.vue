<template>
  <div class="page-role-edit">
    <sys-role-form
      :handler="handler"
      :record="record"
      :loading="loading"
      @success="handleSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { useRequest } from '@/composables'
import { getRoleInfo, editRole } from '@/services'
import type { Role, RoleItem } from '@/types/role'

const router = useRouter()
const route = useRoute()

const record = ref<Role>()

const { loading, fetch } = useRequest(getRoleInfo)

const handler = (data: RoleItem) => {
  return editRole({ ...data, id: Number(route.params.id) })
}

onMounted(async () => {
  const res = await fetch(Number(route.params.id))

  record.value = res.data
})

const handleSuccess = () => {
  router.push({ name: '角色管理' })
}
</script>
