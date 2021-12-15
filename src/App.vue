<template>
  <Suspense>
    <template #default>
      <component :is="Layout" />
    </template>

    <template #fallback>
      Loading ...
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import DefaultLayout from '@components/layout/DefaultLayout.vue';
import PlainLayout from '@components/layout/PlainLayout.vue';

// const DefaultLayout = defineAsyncComponent(() => import('@components/layout/DefaultLayout.vue'));
// const PlainLayout = defineAsyncComponent(() => import('@components/layout/PlainLayout.vue'));

const route = useRoute();

const Layout = computed(() => {
  return route.path === '/login'
    ? PlainLayout
    : DefaultLayout
});
</script>
