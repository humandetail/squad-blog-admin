<template>
  <div class="page-menu-add">
    <sys-menu-form
      :handler="handler"
      @success="handleSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { createMenu } from '@/services'
import type { Menu } from '@/types/menus'

const router = useRouter()

const handler = ({ type, permission, router, ...data }: Menu) => {
  return createMenu({
    ...data,
    type,
    permission: type === 1 ? undefined : permission,
    router: type === 1 ? router : undefined
  })
}

const handleSuccess = () => {
  router.push({ name: '菜单管理' })
}
</script>
