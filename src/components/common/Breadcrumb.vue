<template>
  <a-breadcrumb :routes="routes">
    <template #itemRender="{ route, paths }">
      <span v-if="paths.length === 0 || routes.indexOf(route) === routes.length - 1">
        <DynamicIcon v-if="route.icon" :icon="route.icon" />
        {{ route.breadcrumbName }}
      </span>
      <router-link v-else :to="`/${paths.join('/')}`">
        <DynamicIcon v-if="route.icon" :icon="route.icon" />
        {{ route.breadcrumbName }}
      </router-link>
    </template>
  </a-breadcrumb>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/store/common';
import { computed } from 'vue';
import { DynamicIcon } from './icons';

interface Route {
  path: string;
  breadcrumbName: string;
  icon?: string;
  children?: Array<{
    path: string;
    icon?: string;
    breadcrumbName: string;
  }>;
}

const commonStore = useCommonStore();
const menuChains = computed(() => commonStore.menuChains);

const routes = computed<Route[]>(() => {
  const _routes = menuChains.value.map(({ icon, router, title }) => ({ path: router, breadcrumbName: title, icon }));

  if (menuChains.value.length > 0 && menuChains.value[0].id !== -1) {
    _routes.unshift({
      path: '/',
      icon: 'HomeOutlined',
      breadcrumbName: '首页'
    });
  }

  return _routes;
});
</script>
