<template>
  <div class="page-menu-edit">
    <sys-menu-form
      :handler="handler"
      :record="record"
      :loading="loading"
      @success="handleSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { useRequest } from '@/composables'
import { getMenuInfo, editMenu } from '@/services'
import type { Menu, MenuItem } from '@/types/menus'

const router = useRouter()
const route = useRoute()

const record = ref<Menu>()

const { loading, fetch } = useRequest(getMenuInfo)

const handler = ({ type, permission, router, ...data }: Menu) => {
  return editMenu({
    ...data,
    type,
    permission: type === 1 ? undefined : permission,
    router: type === 1 ? router : undefined,
    id: Number(route.params.id)
  } as MenuItem)
}

onMounted(async () => {
  const res = await fetch(Number(route.params.id))

  record.value = res.data
})

const handleSuccess = () => {
  router.push({ name: '菜单管理' })
}
</script>
