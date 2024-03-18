<template>
  <div class="page-personal-work">
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
            添加作品集
          </a-button>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'icon'">
            <a-avatar
              :src="record.iconPic"
              :size="32"
              shape="square"
            />
          </template>

          <template v-if="column.dataIndex === 'pictures'">
            <a-image-preview-group>
              <a-image
                v-for="item of record.pictures"
                :key="item.id"
                :src="item.url"
                :width="60"
              />
            </a-image-preview-group>
          </template>

          <template v-if="column.dataIndex === 'personalBase'">
            <a-button
              type="link"
              @click="handleChangeBase(record)"
            >
              {{ record.baseNickname }}
            </a-button>
          </template>

          <template v-if="column.dataIndex === 'isShow'">
            <common-query-list-boolean-column
              :value="record.isShow"
            />
          </template>

          <template v-if="column.dataIndex === 'operations'">
            <common-query-list-is-show-button
              :record="record"
              :handler="togglePersonalWorkIsShow"
              v-model:is-show-loading="isShowLoading"
              @success="handleSearch"
            />

            <common-query-list-operation-button
              content="编辑"
              type="success"
              :record="record"
              :handler="() => router.push({
                name: '编辑作品集',
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

    <personal-base-selector
      v-if="baseSelectorVisible && currentRow"
      :value="currentRow.baseId"
      @close="handleCloseBaseSelector"
      @select="handleBaseSelect"
    />
  </div>
</template>

<script setup lang="ts">
import useChangePersonalBase from '@/composables/useChangePersonalBase'
import useDeleteItem from '@/composables/useDeleteItem'
import useQueryList from '@/composables/useQueryList'
import commonColumns from '@/config/commonColumns'
import { deletePersonalWork, getPersonalWorks, togglePersonalWorkIsShow } from '@/services'
import { type PersonalWorkItem } from '@/types/personal'
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
} = useQueryList(getPersonalWorks)

const {
  loading: deleteLoading,
  handleDelete
} = useDeleteItem(
  deletePersonalWork,
  () => {
    handleSearch()
  }
)

const columns: Array<TableColumnType<PersonalWorkItem>> = [
  {
    title: '名称',
    dataIndex: 'name',
    resizable: true,
    fixed: true,
    width: 160,
    minWidth: 160
  },
  {
    title: '展示图片',
    dataIndex: 'pictures',
    resizable: false,
    fixed: false,
    width: 280,
    minWidth: 280
  },
  {
    title: '链接',
    dataIndex: 'link',
    resizable: true,
    fixed: false,
    width: 160,
    minWidth: 160
  },
  {
    title: '挂载点',
    dataIndex: 'personalBase',
    resizable: true,
    width: 140,
    minWidth: 140
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

const {
  loading: changeLoading,
  currentRow,
  baseSelectorVisible,
  handleBaseSelect,
  handleChangeBase,
  handleCloseBaseSelector
} = useChangePersonalBase(() => {
  handleSearch()
})

const spinning = computed(() => isShowLoading.value || deleteLoading.value || changeLoading.value)

onActivated(() => {
  handleSearch()
})

const handleAdd = () => {
  router.push({ name: '新增作品集' })
}
</script>
