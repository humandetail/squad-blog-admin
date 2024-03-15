<template>
  <a-modal
    :open="true"
    title="角色授权"
    width="500px"
    :confirm-loading="confirmLoading"
    destroy-on-close
    @ok="handleConfirm"
    @cancel="$emit('close')"
  >
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
          :checkStrictly="true"
        />
      </div>
    </a-spin>
  </a-modal>
</template>

<script setup lang="ts">
import { useRequest } from '@/composables'
import { authorizations, getMenus } from '@/services'
import { type BasePageResponse, type BaseResponse } from '@/types/common'
import { type MenuItem, type MenuPageParams } from '@/types/menus'
import { type RoleItem } from '@/types/role'
import { success } from '@/utils/http'
import { formatTreeData } from '@/utils/tools'
import _ from 'lodash'
import { computed, onMounted, ref } from 'vue'

const props = defineProps<{
  role: RoleItem
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'success'): void
}>()

const menus = ref<MenuItem[]>([])
const checkedKeys = ref<{ checked: number[], halfChecked: number[] }>({
  checked: [],
  halfChecked: []
})

const { loading: initLoading, fetch: fetchMenus } = useRequest<BasePageResponse<MenuItem[]>, [MenuPageParams]>(getMenus)
const { loading: confirmLoading, fetch: handleAuthorize } = useRequest<BaseResponse<null>, [number, number[]]>(authorizations)

const treeData = computed(() => {
  return formatTreeData(menus.value.map(({ id, name, parentId, type }) => {
    return {
      pId: parentId,
      title: `${type === 2 ? '【操作】' : ''}${name}`,
      id,
      value: id
    }
  }))
})

onMounted(async () => {
  // 获取角色当前拥有的权限
  checkedKeys.value.checked = props.role.menus.map(({ id }) => id)
  if (_.isEmpty(menus.value)) {
    const { data } = await fetchMenus({ isAll: 1 })
    menus.value = data?.records || []
  }
})

const handleConfirm = async () => {
  // 需要把上级的权限也加上
  const { checked: _keys } = checkedKeys.value
  const _menus = menus.value
  const values: number[] = []
  for (const key of _keys) {
    let parent = _menus.find(({ id }) => id === key)
    values.push(key)
    while (parent && parent.id >= 0) {
      values.push(parent.id)
      parent = _menus.find(({ id }) => id === parent!.parentId)
    }
  }
  await handleAuthorize(props.role.id, [...new Set(values)])
  success('操作成功')
  emit('success')
}
</script>

<style scoped>
.tree-wrapper {
  height: 400px;
}
</style>
