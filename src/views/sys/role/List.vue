<template>
  <div class="page-sys-role-list">
    <a-spin :spinning="deleteLoading">
      <query-list
        row-key="id"
        :loading="loading"
        :columns="columns"
        :data-source="dataSource"
        :pagination="pagination"
        :is-tree-data="true"
        :show-search="false"
        v-model:selected-row-keys="selectedRowKeys"
        @table-change="handleTableChange"
        @refresh="handleSearch">
        <template #customOperations>
          <a-button
            type="primary"
            @click="handleAdd">
            <plus-outlined />
            添加新角色
          </a-button>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'name'">
            <a-tag v-if="record.isAdmin" color="red">超管</a-tag>
            {{ record.name }}
          </template>

          <template v-if="column.dataIndex === 'menus'">
            <template v-if="record.isAdmin">-</template>
            <template v-else>
              <a-tag
                v-for="menu in record.menus"
                :key="menu.id">
                {{ menu.name }}
              </a-tag>
            </template>
          </template>

          <template v-if="column.dataIndex === 'isShow'">
            <BooleanCell :value="record.isShow" />
          </template>

          <template v-if="column.dataIndex === 'operations'">
            <ListOperations :operations="getOperations(record)"></ListOperations>
          </template>
        </template>
      </query-list>
    </a-spin>
  </div>

  <AuthorizationModal
    v-if="authorizationModalVisible"
    :role="currentRoleItem"
    @close="toggleAuthorizationModal(false)"
    @success="handleAuthorizedSuccess"
  />
</template>

<script setup lang="ts">
import { onActivated, ref } from 'vue';

import { QueryList, BooleanCell, ListOperations } from '@/components/common/queryList';
import useRoleList from '@/hooks/role/useRoleList';
import useDeleteRole from '@/hooks/role/useDeleteRole';
import { useRouter } from 'vue-router';
import useDefineAsyncComponent from '@/hooks/common/useDefineAsyncComponent';
import { IRoleItem } from '@/types/role';

const AuthorizationModal = useDefineAsyncComponent('/components/sys/role/AuthorizationModal.vue');

const router = useRouter();

const authorizationModalVisible = ref(false);
const currentRoleItem = ref<IRoleItem>();

const {
  loading: deleteLoading,
  handleDelete
} = useDeleteRole(async () => {
  handleSearch();
});

const toggleAuthorizationModal = (visible: boolean, roleItem?: IRoleItem) => {
  authorizationModalVisible.value = visible;
  currentRoleItem.value = roleItem;
}

const {
  columns,
  dataSource,
  pagination,
  selectedRowKeys,
  loading,
  handleSearch,
  handleTableChange,
  getOperations
} = useRoleList({
  handleAuthorizeBtnClick: toggleAuthorizationModal.bind(null, true),
  handleDelete
});

onActivated(async () => {
  await handleSearch();
});

const handleAdd = () => {
  router.push({ name: '新增角色' });
}

const handleAuthorizedSuccess = () => {
  toggleAuthorizationModal(false);
  handleSearch();
}
</script>
