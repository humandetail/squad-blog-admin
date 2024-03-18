<template>
  <div class="page-personal-base">
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
            添加基本信息
          </a-button>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'avatarPic'">
            <a-avatar
              :src="record.avatarPic"
              :size="64"
            />
          </template>

          <template v-if="column.dataIndex === 'isShow'">
            <common-query-list-boolean-column
              :value="record.isShow"
            />
          </template>

          <template v-if="column.dataIndex === 'isDefault'">
            <common-query-list-boolean-column
              :value="record.isDefault"
            />
          </template>

          <template v-if="column.dataIndex === 'isShowSkills'">
            <common-query-list-boolean-column
              :value="record.isShowSkills"
            />
          </template>

          <template v-if="column.dataIndex === 'isShowWorks'">
            <common-query-list-boolean-column
              :value="record.isShowWorks"
            />
          </template>

          <template v-if="column.dataIndex === 'operations'">
            <common-query-list-is-show-button
              :record="record"
              :handler="togglePersonalBaseIsShow"
              v-model:is-show-loading="isShowLoading"
              @success="handleSearch"
            />

            <common-query-list-operation-button
              content="编辑"
              type="success"
              :record="record"
              :handler="() => router.push({
                name: '编辑基本信息',
                params: {
                  id: record.id
                }
              })"
            >
            </common-query-list-operation-button>

            <common-query-list-operation-button
              content="删除"
              type="danger"
              :record="record"
              :handler="handleDelete"
            />
          </template>
        </template>
      </common-query-list>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import useDeleteItem from '@/composables/useDeleteItem'
import useQueryList from '@/composables/useQueryList'
import commonColumns from '@/config/commonColumns'
import { deletePersonalBase, getPersonalBases, togglePersonalBaseIsShow } from '@/services'
import { type PersonalBaseItem } from '@/types/personal'
import { type TableColumnType } from 'ant-design-vue'

const router = useRouter()

const isShowLoading = ref(false)

const {
  dataSource,
  pagination,
  selectedRowKeys,
  loading,
  handleSearch,
  handleTableChange
} = useQueryList(getPersonalBases)

const {
  loading: deleteLoading,
  handleDelete
} = useDeleteItem(
  deletePersonalBase,
  () => {
    handleSearch()
  }
)

const columns: Array<TableColumnType<PersonalBaseItem>> = [
  {
    title: '头像',
    dataIndex: 'avatarPic',
    resizable: true,
    fixed: true,
    width: 80,
    minWidth: 80
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    resizable: true,
    fixed: true,
    width: 160,
    minWidth: 160
  },
  {
    title: 'qq',
    dataIndex: 'qq',
    resizable: true,
    width: 250,
    minWidth: 250
  },
  {
    title: 'blog',
    dataIndex: 'blog',
    resizable: true,
    width: 250,
    minWidth: 250
  },
  {
    title: 'github',
    dataIndex: 'github',
    resizable: true,
    width: 250,
    minWidth: 250
  },
  {
    title: 'email',
    dataIndex: 'email',
    resizable: true,
    width: 250,
    minWidth: 250
  },
  {
    title: '是否默认',
    dataIndex: 'isDefault',
    resizable: true,
    width: 100,
    minWidth: 100
  },
  {
    title: '展示技能',
    dataIndex: 'isShowSkills',
    resizable: true,
    width: 100,
    minWidth: 100
  },
  {
    title: '展示作品',
    dataIndex: 'isShowWorks',
    resizable: true,
    width: 100,
    minWidth: 100
  },
  ...commonColumns(),
  {
    title: '操作',
    dataIndex: 'operations',
    fixed: 'right',
    width: 220,
    minWidth: 220
  }
]

const spinning = computed(() => isShowLoading.value || deleteLoading.value)

onActivated(() => {
  handleSearch()
})

const handleAdd = () => {
  router.push({ name: '新增基本信息' })
}
</script>
