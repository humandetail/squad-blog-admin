<template>
  <a-modal
    :visible="true"
    title="分配角色"
    :footer="null"
    @cancel="$emit('close')">
    <a-spin :spinning="spinning">
      <div class="tips">
        正在为用户【{{ userInfo.username }}】分配角色
      </div>

      <ul class="roles">
        <li
          v-for="item in roles"
          :key="item.id"
          class="item">
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
          <a-tooltip>
            <div class="menus">
              <a-tag
                v-for="menu in item.menus"
                :key="menu.id">
                {{ menu.name }}
              </a-tag>
            </div>

            <template #title>
              <div class="popover">
                <a-tag
                  v-for="menu in item.menus"
                  :key="menu.id">
                  {{ menu.name }}
                </a-tag>
              </div>
            </template>
          </a-tooltip>
        </li>
      </ul>
    </a-spin>
  </a-modal>
</template>

<script setup lang="ts">
import { useQueryList } from '@/hooks/common/queryList';
import { useUserManage } from '@/hooks/sys/user';
import { getRoles } from '@/services';
import { IBasePageResponse } from '@/types/common';
import { IRoleItem } from '@/types/role';
import { IUserInfo } from '@/types/user';
import { computed, onMounted, ref } from 'vue';

const props = defineProps<{
  userInfo: IUserInfo
}>();

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'success'): void
}>();

const {
  dataSource,
  loading,
  handleSearch
} = useQueryList<IRoleItem, IBasePageResponse<IRoleItem[]>>(getRoles);

const { loading: setRoleLoading, handleManage } = useUserManage();

const roles = computed(() => dataSource.value.filter(data => !data.isAdmin));

const currenRole = computed(() => roles.value.find(role => role.id === props.userInfo.roleId));

const spinning = computed(() => loading.value || setRoleLoading.value);

onMounted(async () => {
  await handleSearch();
});

const handleChangeRole = async (item: IRoleItem) => {
  await handleManage(props.userInfo.id, { roleId: item.id });
  emit('success');
}

</script>

<style lang="less" scoped>
.roles {
  margin: 16px 0;
  padding: 0;

  .item {
    display: flex;
    align-items: center;

    & + .item {
      margin-top: 16px;
    }

    .menus {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
