<template>
  <div class="page-personal-skill">
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
            添加个人技能
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
              :handler="togglePersonalSkillIsShow"
              v-model:is-show-loading="isShowLoading"
              @success="handleSearch"
            />

            <common-query-list-operation-button
              content="编辑"
              type="success"
              :record="record"
              :handler="() => router.push({
                name: '编辑个人技能',
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
import { deletePersonalSkill, getPersonalSkills, togglePersonalSkillIsShow } from '@/services'
import { type PersonalSkillItem } from '@/types/personal'
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
} = useQueryList(getPersonalSkills)

const {
  loading: deleteLoading,
  handleDelete
} = useDeleteItem(
  deletePersonalSkill,
  () => {
    handleSearch()
  }
)

const columns: Array<TableColumnType<PersonalSkillItem>> = [
  {
    title: '图标',
    dataIndex: 'icon',
    resizable: false,
    fixed: true,
    width: 80,
    minWidth: 80
  },
  {
    title: '名称',
    dataIndex: 'name',
    resizable: true,
    fixed: true,
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
  router.push({ name: '新增个人技能' })
}
</script>
