<template>
  <a-modal
    :open="true"
    title="分配角色"
    :footer="null"
    @cancel="$emit('close')"
  >
    <a-spin :spinning="spinning">
      <div class="tips">
        正在为用户【<b>{{ userInfo.username }}</b>】分配角色
      </div>

      <ul class="roles">
        <li
          v-for="item in roles"
          :key="item.id"
          class="item"
        >
          <a-popconfirm
            :title="`确定给用户【${userInfo.username}】分配【${item.name}】角色吗？`"
            ok-text="确定"
            cancel-text="我再想想"
            @confirm="handleChangeRole(item)"
          >
            <a-radio :checked="currenRole?.id === item.id">
              <a-tag color="blue">
                {{ item.name }}
              </a-tag>
            </a-radio>
          </a-popconfirm>

          <a-tag
            v-for="menu in item.menus"
            :key="menu.id"
          >
            {{ menu.name }}
          </a-tag>
        </li>
      </ul>
    </a-spin>
  </a-modal>
</template>

<script setup lang="ts">
import { useRequest } from '@/composables'
import useQueryList from '@/composables/useQueryList'
import { getRoles, userManage } from '@/services'
import { type BasePageResponse } from '@/types/common'
import { type RoleItem } from '@/types/role'
import { type UserInfo } from '@/types/user'

const props = defineProps<{
  userInfo: UserInfo
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'success'): void
}>()

const {
  loading: setRoleLoading,
  fetch: handleManage
} = useRequest(userManage)

const {
  dataSource,
  loading,
  handleSearch
} = useQueryList<RoleItem, BasePageResponse<RoleItem[]>>(getRoles)

const roles = computed(() => dataSource.value.filter(data => !data.isAdmin))

const currenRole = computed(() => roles.value.find(role => role.id === props.userInfo.roleId))

const spinning = computed(() => loading.value || setRoleLoading.value)

onMounted(async () => {
  await handleSearch()
})

const handleChangeRole = async (item: RoleItem) => {
  await handleManage(props.userInfo.id, { roleId: item.id })
  emit('success')
}

</script>

<style lang="scss" scoped>
.roles {
  margin: 16px 0;
  padding: 0;

  .item {
    display: flex;
    align-items: center;
    gap: 8px;

    .menus {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
