<template>
  <a-tree-select
    :value="value"
    @update:value="handleValueUpdate"
    tree-data-simple-mode
    style="width: 100%"
    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
    :tree-data="treeData"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TreeSelectProps } from 'ant-design-vue';
import { useRequest } from '@/hooks/common';
import { getMenus } from '@/services';
import { IBasePageResponse } from '@/types/common';
import { IMenuItem, IMenuPageParams } from '@/types/menu';
import { formatTreeData } from '@/utils/tools';

defineProps<{ value: number }>();
const emit = defineEmits<{(e: 'update:value', value: number): void}>();

const treeData = ref<TreeSelectProps['treeData']>([
  { value: 0, pId: -1, title: '一级菜单' }
]);

const { fetch } = useRequest<IBasePageResponse<IMenuItem[]>, [IMenuPageParams]>(getMenus);

const { data } = await fetch({ isAll: 1 });
treeData.value = [{ value: 0, pId: -1, title: '一级菜单' }, ...formatTreeData((data?.records || []).map(({ id, name, parentId, hasChildren, type }) => {
  return {
    pId: parentId,
    title: `${type === 2 ? '<操作>' : ''}${name}`,
    id: id,
    value: id,
    disabled: type === 2
  }
}))];

const handleValueUpdate = (value: number) => {
  emit('update:value', value);
}
</script>
