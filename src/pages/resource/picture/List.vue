<template>
  <div class="page-picture">
    <common-query-list
      :is-table="false"
      :loading="loading"
      :columns="[]"
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
          添加新图片
        </a-button>
      </template>

      <template #table>
        <resource-picture-picture-list
          :data-source="dataSource"
          @refresh="handleSearch"
        />
      </template>
    </common-query-list>
  </div>
</template>

<script setup lang="ts">
import useQueryList from '@/composables/useQueryList'
import { getPictures } from '@/services'

const router = useRouter()

const {
  dataSource,
  pagination,
  selectedRowKeys,
  loading,
  handleSearch,
  handleTableChange
} = useQueryList(getPictures)

onActivated(() => {
  handleSearch()
})

const handleAdd = () => {
  router.push({ name: '新增图片' })
}
</script>
