<template>
  <div class="page-post-category">
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
            @click="batchProgressVisible = true"
          >
            <mac-command-outlined />
            批处理
          </a-button>
          <a-button
            type="primary"
            @click="handleAdd"
          >
            <plus-outlined />
            添加新文章
          </a-button>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'cover'">
            <a-image
              :src="record.coverPic"
              :width="64"
            />
          </template>

          <template v-if="column.dataIndex === 'tags'">
            <a-tag
              v-for="tag of record.tags"
              :key="tag.id"
              color="blue"
            >
              {{ tag.displayName }}
            </a-tag>
          </template>

          <template v-if="column.dataIndex === 'isShow'">
            <common-query-list-boolean-column
              :value="record.isShow"
            />
          </template>

          <template v-if="column.dataIndex === 'operations'">
            <common-query-list-operation-button
              content="预览"
              type="success"
              :record="record"
              :handler="() => handlePreviewBtnClick(record)"
            />

            <common-query-list-is-show-button
              :record="record"
              :handler="togglePostIsShow"
              v-model:is-show-loading="isShowLoading"
              @success="handleSearch"
            />

            <common-query-list-operation-button
              content="编辑"
              type="success"
              :record="record"
              :handler="() => router.push({
                name: '编辑文章',
                params: {
                  id: record.id
                }
              })"
            />

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

    <PostBatchProgress
      v-if="batchProgressVisible"
      :selected-row-keys="selectedRowKeys"
      @success="handleBatchProgressSuccess"
      @close="batchProgressVisible = false"
    />

    <PostPreviewDrawer
      v-if="previewDrawerVisible"
      :record="currentRecord!"
      @close="handlePreviewClose"
    />
  </div>
</template>

<script setup lang="ts">
import useDeleteItem from '@/composables/useDeleteItem'
import useQueryList from '@/composables/useQueryList'
import commonColumns from '@/config/commonColumns'
import { deletePost, getPosts, togglePostIsShow } from '@/services'
import { type PostItem } from '@/types/post'
import { type TableColumnType } from 'ant-design-vue'

const PostPreviewDrawer = defineAsyncComponent(() => import('@/components/post/Preview.vue'))

const router = useRouter()

const isShowLoading = ref(false)
const previewDrawerVisible = ref(false)
const currentRecord = ref<PostItem>()

const batchProgressVisible = ref(false)

const {
  dataSource,
  pagination,
  selectedRowKeys,
  loading,
  handleSearch,
  handleTableChange
} = useQueryList(getPosts)

const {
  loading: deleteLoading,
  handleDelete
} = useDeleteItem(
  deletePost,
  () => {
    handleSearch()
  }
)

const columns: Array<TableColumnType<PostItem>> = [
  {
    title: '标题',
    dataIndex: 'title',
    resizable: true,
    fixed: true,
    width: 250,
    minWidth: 250
  },
  {
    title: '封面图',
    dataIndex: 'cover',
    resizable: true,
    width: 80,
    minWidth: 80
  },
  {
    title: '文章模板',
    dataIndex: 'templateName',
    resizable: true,
    width: 150,
    minWidth: 150
  },
  {
    title: '摘要',
    dataIndex: 'summary',
    resizable: true,
    width: 200,
    minWidth: 200
  },
  {
    title: '分类',
    dataIndex: 'categoryName',
    resizable: true,
    width: 100,
    minWidth: 100
  },
  {
    title: '标签',
    dataIndex: 'tags',
    resizable: true,
    width: 200,
    minWidth: 200
  },
  {
    title: '推荐指数',
    dataIndex: 'recommendationIndex',
    resizable: true,
    width: 90,
    minWidth: 90
  },
  {
    title: '阅读量',
    dataIndex: 'viewCount',
    resizable: true,
    width: 80,
    minWidth: 80
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
  router.push({ name: '新增文章' })
}

const handlePreviewBtnClick = (record: PostItem) => {
  currentRecord.value = record
  previewDrawerVisible.value = true
}

const handlePreviewClose = () => {
  previewDrawerVisible.value = false
  currentRecord.value = undefined
}

const handleBatchProgressSuccess = () => {
  batchProgressVisible.value = false
  selectedRowKeys.value = []
  handleSearch()
}
</script>
