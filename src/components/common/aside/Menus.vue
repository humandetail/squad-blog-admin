<template>
  <a-menu
    v-model:openKeys="openKeys"
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
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';
import { formatTreeData } from '@/utils/tools';
import SubMenu from './SubMenu.vue';
import { MenuInfo } from 'ant-design-vue/lib/menu/src/interface';

const openKeys = ref([]);
const userStore = useUserStore();
const router = useRouter();

const routes = computed(() => {
  return formatTreeData(userStore.routes.filter(route => !route.meta?.hidden), 'meta.id', 'meta.parentId');
});

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
