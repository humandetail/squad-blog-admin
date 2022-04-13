<template>
  <a-config-provider
    :locale="locale"
    :getPopupContainer="getPopupContainer">
    <Suspense>
      <template #default>
        <component :is="Layout" />
      </template>

      <template #fallback>
        Loading ...
      </template>
    </Suspense>
  </a-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';

import DefaultLayout from '@/components/layout/DefaultLayout.vue';
import PlainLayout from '@/components/layout/PlainLayout.vue';

// const DefaultLayout = defineAsyncComponent(() => import('@components/layout/DefaultLayout.vue'));
// const PlainLayout = defineAsyncComponent(() => import('@components/layout/PlainLayout.vue'));

dayjs.locale('zh-cn');

const route = useRoute();

const Layout = computed(() => {
  return route.path === '/login'
    ? PlainLayout
    : DefaultLayout
});

const locale = zhCN;

const getPopupContainer = (el: HTMLElement, dialogContext: any) => {
  if (dialogContext) {
    return dialogContext.getDialogWrap();
  } else {
    return document.body;
  }
}
</script>
