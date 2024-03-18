<template>
  <div class="page-post-tag">
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
            添加新标签
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
              :handler="togglePostTagIsShow"
              v-model:is-show-loading="isShowLoading"
              @success="handleSearch"
            />

            <common-query-list-operation-button
              content="编辑"
              type="success"
              :record="record"
              :handler="() => router.push({
                name: '编辑文章标签',
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
import { deletePostTag, getPostTags, togglePostTagIsShow } from '@/services'
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
} = useQueryList(getPostTags)

const {
  loading: deleteLoading,
  handleDelete
} = useDeleteItem(
  deletePostTag,
  () => {
    handleSearch()
  }
)

const columns: Array<TableColumnType<PictureCategoryItem>> = [
  {
    title: '标签名称',
    dataIndex: 'name',
    resizable: true,
    fixed: true,
    width: 160,
    minWidth: 160
  },
  {
    title: '显示名称',
    dataIndex: 'displayName',
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
  router.push({ name: '新增文章标签' })
}
</script>
