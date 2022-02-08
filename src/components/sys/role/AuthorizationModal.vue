<template>
  <a-modal
    visible="true"
    title="角色授权"
    width="500px"
    :confirm-loading="confirmLoading"
    destroy-on-close
    @ok="handleConfirm"
    @cancel="$emit('close')">
    <a-spin :spinning="initLoading">
      <div class="tree-wrapper">
        <a-tree
          v-if="treeData.length"
          v-model:checkedKeys="checkedKeys"
          :fieldNames="{ key: 'id' }"
          :tree-data="treeData"
          :height="400"
          defaultExpandAll
          checkable
        />
      </div>
    </a-spin>
  </a-modal>
</template>

<script setup lang="ts">
import { useRequest } from '@/hooks/common';
import { authorizations, getMenus } from '@/services';
import { IBasePageResponse, IBaseResponse } from '@/types/common';
import { IMenuItem, IMenuPageParams } from '@/types/menu';
import { IRoleItem } from '@/types/role';
import { success } from '@/utils/http';
import { formatTreeData } from '@/utils/tools';
import _ from 'lodash';
import { computed, onMounted, ref } from 'vue';

const props = defineProps<{
  role: IRoleItem
}>()
// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'success'): void;
}>();

const menus = ref<IMenuItem[]>([]);
const checkedKeys = ref<number[]>([]);

const { loading: initLoading, fetch: fetchMenus } = useRequest<IBasePageResponse<IMenuItem[]>, [IMenuPageParams]>(getMenus);
const { loading: confirmLoading, fetch: handleAuthorize } = useRequest<IBaseResponse<null>, [number, number[]]>(authorizations);

const treeData = computed(() => {
  return formatTreeData(menus.value.map(({ id, name, parentId, type }) => {
    return {
      pId: parentId,
      title: `${type === 2 ? '<操作>' : ''}${name}`,
      id: id,
      value: id
    }
  }));
});

onMounted(async () => {
  // 获取角色当前拥有的权限
  checkedKeys.value = props.role.menus.map(({ id }) => id);
  if (_.isEmpty(menus.value)) {
    const { data } = await fetchMenus({ isAll: 1 });
    menus.value = data?.records || [];
  }
})

const handleConfirm = async () => {
  await handleAuthorize(props.role.id, checkedKeys.value);
  success('操作成功');
  emit('success');
}
</script>

<style scoped>
.tree-wrapper {
  height: 400px;
}
</style>