<template>
  <div class="page-menu">
    <a-spin :spinning="spinning">
      <common-query-list
        :loading="loading"
        :columns="columns"
        :data-source="treeData"
        :pagination="pagination"
        :show-search="false"
        :is-tree-data="true"
        v-model:selected-row-keys="selectedRowKeys"
        @table-change="handleTableChange"
        @search="handleSearch"
        @expand="handleExpand"
      >
        <template #custom-operations>
          <a-button
            type="primary"
            @click="handleAdd"
          >
            <plus-outlined />
            添加新菜单
          </a-button>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'type'">
            {{ MenuType[record.type] }}
          </template>

          <template v-if="column.dataIndex === 'icon'">
            <template v-if="!record.icon">-</template>
            <dynamic-icon v-else :icon="record.icon" />
          </template>

          <template v-if="column.dataIndex === 'isCache'">
            <common-query-list-boolean-column
              :value="record.isCache"
            />
          </template>

          <template v-if="column.dataIndex === 'isShow'">
            <common-query-list-boolean-column
              :value="record.isShow"
            />
          </template>

          <template v-if="column.dataIndex === 'operations'">
            <common-query-list-is-show-button
              :record="record"
              :handler="toggleMenuIsShow"
              v-model:is-show-loading="isShowLoading"
              @success="handleSearch"
            />

            <common-query-list-operation-button
              content="编辑"
              type="success"
              :record="record"
              :handler="() => router.push({
                name: '编辑菜单',
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
import { deleteMenu, getMenusByParentId, toggleMenuIsShow } from '@/services'
import { type MenuItem } from '@/types/menus'
import { type TableColumnType } from 'ant-design-vue'
import { MenuType } from '@/config/constants'
import { useMenuExpand } from '@/composables'
import DynamicIcon from '@/components/common/DynamicIcon'

const router = useRouter()

const isShowLoading = ref(false)

const {
  dataSource,
  pagination,
  selectedRowKeys,
  loading,
  handleSearch,
  handleTableChange
} = useQueryList(getMenusByParentId.bind(null, 0))

const {
  loading: expandLoading,
  handleExpand
} = useMenuExpand()

const {
  loading: deleteLoading,
  handleDelete
} = useDeleteItem(
  deleteMenu,
  () => {
    handleSearch()
  }
)

const columns: Array<TableColumnType<MenuItem>> = [
  {
    title: '菜单名称',
    dataIndex: 'name',
    resizable: true,
    fixed: true,
    width: 200,
    minWidth: 200
  },
  {
    title: '类型',
    dataIndex: 'type',
    resizable: true,
    width: 80,
    minWidth: 80
  },
  {
    title: '路由地址',
    dataIndex: 'router',
    resizable: true,
    width: 150,
    minWidth: 150
  },
  {
    title: '权限代码',
    dataIndex: 'permission',
    resizable: true,
    width: 150,
    minWidth: 150
  },
  {
    title: '组件路径',
    dataIndex: 'path',
    resizable: true,
    width: 150,
    minWidth: 150
  },
  {
    title: '图标',
    dataIndex: 'icon',
    resizable: true,
    width: 70,
    minWidth: 70
  },
  {
    title: '是否缓存',
    dataIndex: 'isCache',
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

const spinning = computed(() => isShowLoading.value || deleteLoading.value || expandLoading.value)

const treeData = computed(() => dataSource.value.map((item: any) => {
  if (item.hasChildren && !item.children) {
    item.children = []
  }

  return item
}))

onMounted(() => {
  handleSearch()
})

const handleAdd = () => {
  router.push({ name: '新增菜单' })
}
</script>
