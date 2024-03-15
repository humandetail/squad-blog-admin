<template>
  <div class="page-user">
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
            添加新用户
          </a-button>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'avatarPic'">
            <a-avatar
              :src="record.avatarPic"
              :size="64"
            >
              <template #icon><UserOutlined /></template>
            </a-avatar>
          </template>

          <template v-if="column.dataIndex === 'isLock'">
            <common-query-list-boolean-column
              :value="record.isLock"
            />
          </template>

          <template v-if="column.dataIndex === 'isShow'">
            <common-query-list-boolean-column
              :value="record.isShow"
            />
          </template>

          <template v-if="column.dataIndex === 'operations'">
            <common-query-list-operation-button
              v-if="!(record.username === 'admin' || record.username === userInfo?.username)"
              content="分配角色"
              :record="record"
              :handler="() => handleSetRoleBtnClick(record)"
            />

            <common-query-list-operation-button
              v-if="!(record.username === 'admin' || record.username === userInfo?.username)"
              :content="record.isLock ? '解锁' : '锁定'"
              :type="record.isLock ? 'success' : 'danger'"
              :record="record"
              :handler="() => handleLock(record)"
            />

            <common-query-list-operation-button
              v-if="!(record.username === 'admin' || record.username === userInfo?.username)"
              content="删除"
              type="danger"
              :record="record"
              :handler="handleDelete"
            />
          </template>
        </template>
      </common-query-list>
    </a-spin>

    <SetRoleModal
      v-if="setRoleModalVisible"
      :user-info="currentRecord!"
      @success="handleSetRoleSuccess"
      @close="setRoleModalVisible = false"
    />
  </div>
</template>

<script setup lang="ts">
import { useRequest } from '@/composables'
import useDeleteItem from '@/composables/useDeleteItem'
import useQueryList from '@/composables/useQueryList'
import commonColumns from '@/config/commonColumns'
import { deleteUser, getUsers, userManage } from '@/services'
import { useUserStore } from '@/store/user'
import { type UserInfo } from '@/types/user'
import { error, success } from '@/utils/http'
import { type TableColumnType } from 'ant-design-vue'

const SetRoleModal = defineAsyncComponent(() => import('@/components/sys/user/SetRoleModal.vue'))

const router = useRouter()
const userStore = useUserStore()

const currentRecord = ref<UserInfo>()
const setRoleModalVisible = ref(false)

const {
  loading: setRoleLoading,
  fetch: handleManage
} = useRequest(userManage)

const {
  dataSource,
  pagination,
  selectedRowKeys,
  loading,
  handleSearch,
  handleTableChange
} = useQueryList(getUsers)

const {
  loading: deleteLoading,
  handleDelete
} = useDeleteItem(
  deleteUser,
  () => {
    handleSearch()
  }
)

const userInfo = computed(() => userStore.userInfo)

const columns: Array<TableColumnType<UserInfo>> = [
  {
    title: '用户头像',
    dataIndex: 'avatarPic',
    resizable: false,
    width: 100
  },
  {
    title: '用户名',
    dataIndex: 'username',
    resizable: true,
    width: 150,
    minWidth: 150
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    resizable: true,
    width: 150,
    minWidth: 150
  },
  {
    title: '所属角色',
    dataIndex: 'roleName',
    resizable: true,
    width: 150,
    minWidth: 150
  },
  {
    title: '最后登录时间',
    dataIndex: 'lastLogin',
    resizable: true,
    width: 190,
    minWidth: 190
  },
  {
    title: '是否锁定',
    dataIndex: 'isLock',
    resizable: true,
    width: 100,
    minWidth: 100
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

const spinning = computed(() => setRoleLoading.value || deleteLoading.value)

onActivated(() => {
  handleSearch()
})

const handleAdd = () => {
  router.push({ name: '新增用户' })
}

const handleSetRoleBtnClick = (info: UserInfo) => {
  currentRecord.value = info
  setRoleModalVisible.value = true
}

const handleSetRoleSuccess = () => {
  setRoleModalVisible.value = false
  handleSearch()
}

const handleLock = async (record: UserInfo) => {
  try {
    await handleManage(record.id, {
      isLock: record.isLock === 1 ? 0 : 1
    })
    success('操作成功')
    handleSearch()
  } catch {
    error('操作失败')
  }
}
</script>
