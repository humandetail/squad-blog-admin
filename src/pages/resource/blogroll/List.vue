<template>
  <div class="page-blogroll">
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
            添加新友链
          </a-button>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'isShow'">
            <common-query-list-boolean-column
              :value="record.isShow"
            />
          </template>

          <template v-if="column.dataIndex === 'operations'">
            <common-query-list-is-show-button
              :record="record"
              :handler="toggleBlogrollIsShow"
              v-model:is-show-loading="isShowLoading"
              @success="handleSearch"
            />

            <common-query-list-operation-button
              content="编辑"
              type="success"
              :record="record"
              :handler="() => router.push({
                name: '编辑友情链接',
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
import { deleteBlogroll, getBlogrolls, toggleBlogrollIsShow } from '@/services'
import { type PictureCategoryItem } from '@/types/picture'
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
} = useQueryList(getBlogrolls)

const {
  loading: deleteLoading,
  handleDelete
} = useDeleteItem(
  deleteBlogroll,
  () => {
    handleSearch()
  }
)

const columns: Array<TableColumnType<PictureCategoryItem>> = [
  {
    title: '友链名称',
    dataIndex: 'name',
    resizable: true,
    fixed: true,
    width: 160,
    minWidth: 160
  },
  {
    title: '链接地址',
    dataIndex: 'link',
    resizable: true,
    width: 200,
    minWidth: 200
  },
  {
    title: '备注信息',
    dataIndex: 'remarks',
    resizable: true,
    width: 250,
    minWidth: 250
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
  router.push({ name: '新增友情链接' })
}
</script>
