<template>
  <a-tree-select
    :value="value"
    @update:value="handleValueUpdate"
    tree-data-simple-mode
    style="width: 100%"
    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
    :tree-data="treeData"
    :load-data="handleLoadMenus"
  />
</template>

<script setup lang="ts">
import { useRequest } from '@/hooks/common';
import { getMenusByParentId } from '@/services/sys/menu';
import { IBaseResponse } from '@/types/common';
import { IMenuItemWithHasChildren } from '@/types/menu';
import { ref } from 'vue';
import type { TreeSelectProps } from 'ant-design-vue';

defineProps<{ value: number }>();
const emit = defineEmits<{(e: 'update:value', value: number): void}>();

const treeData = ref<TreeSelectProps['treeData']>([
  { value: 0, pId: 0, title: '一级菜单' }
]);

const { fetch } = useRequest<IBaseResponse<IMenuItemWithHasChildren[]>, [number]>(getMenusByParentId);

const handleLoadMenus = async (treeNode: any) => {
  const { value } = treeNode.dataRef;
  const { data } = await fetch(value === -1 ? 0 : value);
  treeData.value = treeData.value?.concat((data || []).map(({ id, name, parentId, hasChildren, type }) => {
    return {
      pId: parentId,
      title: `${type === 2 ? '<操作>' : ''}${name}`,
      id: id,
      value: id,
      isLeaf: !hasChildren,
      disabled: type === 2
    }
  }));
  return true;
};

const handleValueUpdate = (value: number) => {
  emit('update:value', value);
}
</script>
