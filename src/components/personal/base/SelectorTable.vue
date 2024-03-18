<template>
  <section class="personal-base-selector">
    <a-table
      bordered
      rowKey="id"
      size="small"
      :loading="loading"
      :columns="columns"
      :dataSource="dataSource"
      :scroll="{ x: 'max-content', scrollToFirstRowOnChange: true }"
      :pagination="pagination"
      :row-class-name="rowClassName"
      @change="handleTableChange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'avatar'">
          <a-avatar
            :src="record.avatarPic"
            :size="80"
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
          <a-button
            :disabled="record.id === value"
            type="link"
            @click="handleSelect(record)">
            选择
          </a-button>
        </template>
      </template>
    </a-table>
  </section>
</template>

<script setup lang="ts">
import { type TablePaginationConfig, type TableColumnType } from 'ant-design-vue'
import { useRequest } from '@/composables'
import { getPersonalBases } from '@/services'
import { type PersonalBaseItem } from '@/types/personal'
import commonColumns from '@/config/commonColumns'

const props = withDefaults(defineProps<{
  value?: number
}>(), {
  value: 0
})
const emit = defineEmits<(e: 'select', value: PersonalBaseItem) => void>()

const { loading, fetch } = useRequest(getPersonalBases)

const pagination = ref<TablePaginationConfig>({
  total: 0,
  current: 1,
  pageSize: 5,
  pageSizeOptions: ['10', '20', '50', '100', '200'],
  showTotal: (total: number, range: [number, number]) => `当前显示 ${range[0]}-${range[1]}，共 ${total} 条记录`,
  showQuickJumper: true,
  showSizeChanger: true
})

const columns: Array<TableColumnType<PersonalBaseItem>> = [
  {
    title: '头像',
    dataIndex: 'avatar',
    resizable: false,
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
    title: '展示作品集',
    dataIndex: 'isShowWorks',
    resizable: true,
    width: 120,
    minWidth: 120
  },
  ...commonColumns(),
  {
    title: '操作',
    dataIndex: 'operations',
    fixed: 'right',
    width: 60,
    minWidth: 60
  }
]

const dataSource = ref<PersonalBaseItem[]>([])

const rowClassName = (record: PersonalBaseItem, _index: number) => {
  return record.id === props.value ? 'highlight' : ''
}

const handleTableChange = (p: TablePaginationConfig) => {
  pagination.value = p
  handleSearch()
}

const handleSelect = (record: PersonalBaseItem) => {
  emit('select', record)
}

const handleSearch = async () => {
  const res = await fetch({
    current: pagination.value.current,
    pageSize: pagination.value.pageSize
  })

  dataSource.value = res.data.records || []
  pagination.value = {
    ...pagination.value,
    total: res.data.total || 0
  }
}

onMounted(() => {
  handleSearch()
})
</script>

<!-- <style lang="less" scoped>
.personal-base-selector :deep(.highlight) td {
  background-color: #68665b !important;
}
</style> -->
