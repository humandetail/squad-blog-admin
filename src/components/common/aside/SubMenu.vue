<template>
  <a-sub-menu :key="$props.menuInfo.name">
    <template v-if="$props.menuInfo.meta.icon" #icon>
      <DynamicIcon :icon="$props.menuInfo?.meta?.icon" />
    </template>
    <template #title>{{ $props.menuInfo.meta?.title || $props.menuInfo.name }}</template>
    <template v-for="item in $props.menuInfo.children" :key="item.name">
      <template v-if="!item.children">
        <a-menu-item :key="item.name">
          <template v-if="item.meta.icon" #icon>
            <DynamicIcon :icon="item.meta.icon" />
          </template>
          {{ item.meta?.title || item.name }}
        </a-menu-item>
      </template>
      <template v-else>
        <sub-menu :menu-info="item" :key="item.name" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script>
import { DynamicIcon } from '@/components/common/icons';
export default {
  name: 'SubMenu',
  components: {
    DynamicIcon
  },
  props: {
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
