<template>
  <div class="page-role">
    <a-spin :spinning="spinning">
      <common-query-list
        :loading="loading"
        :columns="columns"
        :data-source="dataSource"
        :pagination="pagination"
        v-model:selected-row-keys="selectedRowKeys"
        @table-change="handleTableChange"
        @search="handleSearch"
      >
        <template #custom-operations>
          <a-button
            type="primary"
            @click="handleAdd"
          >
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
            <common-query-list-boolean-column
              :value="record.isShow"
            />
          </template>

          <template v-if="column.dataIndex === 'operations'">
            <common-query-list-is-show-button
              v-if="!record.isAdmin"
              :record="record"
              :handler="toggleRoleIsShow"
              v-model:is-show-loading="isShowLoading"
              @success="handleSearch"
            />

            <common-query-list-operation-button
              v-if="!record.isAdmin"
              content="授权"
              :record="record"
              :handler="() => toggleAuthorizationModal(true, record)"
            />

            <common-query-list-operation-button
              v-if="!record.isAdmin"
              content="编辑"
              type="success"
              :record="record"
              :handler="() => router.push({
                name: '编辑角色',
                params: {
                  id: record.id
                }
              })"
            >
            </common-query-list-operation-button>

            <common-query-list-operation-button
              v-if="!record.isAdmin"
              content="删除"
              type="danger"
              :record="record"
              :handler="handleDelete"
            />
          </template>
        </template>
      </common-query-list>
    </a-spin>

    <AuthorizationModal
      v-if="authorizationModalVisible"
      :role="currentRoleItem!"
      @close="toggleAuthorizationModal(false)"
      @success="handleAuthorizedSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import useDeleteItem from '@/composables/useDeleteItem'
import useQueryList from '@/composables/useQueryList'
import commonColumns from '@/config/commonColumns'
import { deleteRole, getRoles, toggleRoleIsShow } from '@/services'
import { type RoleItem } from '@/types/role'
import { type TableColumnType } from 'ant-design-vue'

const AuthorizationModal = defineAsyncComponent(() => import('@/components/sys/role/AuthorizationModal.vue'))

const router = useRouter()

const isShowLoading = ref(false)
const authorizationModalVisible = ref(false)
const currentRoleItem = ref<RoleItem>()

const {
  dataSource,
  pagination,
  selectedRowKeys,
  loading,
  handleSearch,
  handleTableChange
} = useQueryList(getRoles)

const {
  loading: deleteLoading,
  handleDelete
} = useDeleteItem(
  deleteRole,
  () => {
    handleSearch()
  }
)

const columns: Array<TableColumnType<RoleItem>> = [
  {
    title: '角色名称',
    dataIndex: 'name',
    resizable: true,
    fixed: true,
    width: 160,
    minWidth: 160
  },
  {
    title: '权限列表',
    dataIndex: 'menus',
    resizable: true,
    width: 250,
    minWidth: 250
  },
  {
    title: '备注',
    dataIndex: 'remarks',
    resizable: true,
    width: 150,
    minWidth: 150
  },
  ...commonColumns(),
  {
    title: '操作',
    dataIndex: 'operations',
    fixed: 'right',
    width: 280,
    minWidth: 280
  }
]

const spinning = computed(() => isShowLoading.value || deleteLoading.value)

onActivated(() => {
  handleSearch()
})

const handleAdd = () => {
  router.push({ name: '新增角色' })
}

const toggleAuthorizationModal = (visible: boolean, roleItem?: RoleItem) => {
  authorizationModalVisible.value = visible
  currentRoleItem.value = roleItem
}

const handleAuthorizedSuccess = () => {
  toggleAuthorizationModal(false)
  handleSearch()
}
</script>
