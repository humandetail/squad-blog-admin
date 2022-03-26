<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selected-keys="selectedKeys"
    mode="inline"
    @click="handleClick">
    <template v-for="route in routes" :key="route.name">
      <template v-if="!route.children">
        <a-menu-item :key="route.name">
          <template #icon>
            <PieChartOutlined />
          </template>
          {{ route.meta?.title || route.name }}
        </a-menu-item>
      </template>
      <template v-else>
        <sub-menu :key="route.name" :menu-info="route" />
      </template>
    </template>
  </a-menu>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';
import { formatTreeData } from '@/utils/tools';
import SubMenu from './SubMenu.vue';
import { MenuInfo } from 'ant-design-vue/lib/menu/src/interface';
import { useCommonStore } from '@/store/common';

const openKeys = ref<string[]>([]);
const selectedKeys = ref<string[]>([]);
const userStore = useUserStore();
const router = useRouter();
const commonStore = useCommonStore();

const routes = computed(() => {
  return formatTreeData(userStore.routes.filter(route => !route.meta?.hidden), 'meta.id', 'meta.parentId');
});

const menuChains = computed(() => commonStore.menuChains);

watch(() => menuChains, (chains) => {
  const len = chains.value.length;
  if (len === 1) {
    selectedKeys.value = [chains.value[0].title];
  } else if (len > 1) {
    openKeys.value = [chains.value[0].title];
    selectedKeys.value = [chains.value[1].title];
  }
}, { immediate: true, deep: true });

const handleClick = ({ keyPath }: MenuInfo) => {
  if (!keyPath) return;

  let item = routes.value.find(sub => sub.name === keyPath[0]);
  if (!item) {
    return;
  }

  for (let i = 1; i < keyPath.length; i++) {
    item = item?.children?.find(sub => sub.name === keyPath[i]);
  }

  if (item?.path) {
    router.push(item.path);
  }
}
</script>
