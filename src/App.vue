<template>
  <a-config-provider
    :theme="{
      algorithm
    }"
    :locale="locale"
    :getPopupContainer="getPopupContainer"
  >
    <Suspense>
      <template #default>
        <div class="container">
          <component :is="Layout" />
        </div>
      </template>

      <template #fallback>
        Loading ...
      </template>
    </Suspense>
  </a-config-provider>
</template>

<script setup lang="ts">
import { theme } from 'ant-design-vue'
import { useRoute } from 'vue-router'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'

import DefaultLayout from '@/components/layout/Default.vue'
import PlainLayout from '@/components/layout/Plain.vue'
import { useCommonStore } from './store/common'
import { ThemeMode } from './config/constants'

const { token } = theme.useToken()

dayjs.locale('zh-cn')

const route = useRoute()
const commonStore = useCommonStore()

const Layout = computed(() => {
  return route.path === '/login'
    ? PlainLayout
    : DefaultLayout
})

const locale = zhCN

const algorithm = computed(() => {
  return commonStore.themeMode === ThemeMode.light
    ? theme.defaultAlgorithm
    : theme.darkAlgorithm
})

const getPopupContainer = (_el: HTMLElement, dialogContext: any) => {
  return dialogContext
    ? dialogContext.getDialogWrap()
    : document.body
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  color: v-bind('token.colorText');
  background-color: v-bind('token.colorBgContainer');
}
</style>
