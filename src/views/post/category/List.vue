<template>
  <div class="page-post-category-list">
    <a-spin :spinning="spinning">
      <query-list
        row-key="id"
        :loading="loading"
        :columns="columns"
        :data-source="dataSource"
        :pagination="pagination"
        :is-tree-data="true"
        :show-search="true"
        v-model:selected-row-keys="selectedRowKeys"
        @table-change="handleTableChange"
        @refresh="handleSearch"
        @search="handleSearch({ keyword: $event })">
        <template #customOperations>
          <a-button
            type="primary"
            @click="handleAdd">
            <plus-outlined />
            添加新分类
          </a-button>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'isShow'">
            <BooleanCell :value="record.isShow" />
          </template>

          <template v-if="column.dataIndex === 'operations'">
            <ListOperations :operations="getOperations(record)"></ListOperations>
          </template>
        </template>
      </query-list>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import { computed, onActivated } from 'vue';

import { QueryList, BooleanCell, ListOperations } from '@/components/common/queryList';
import { useRouter } from 'vue-router';
import { useToggleIsShow, useDeleteItem } from '@/hooks/common/queryList';
import { deletePostCategory, togglePostCategoryIsShow } from '@/services';
import usePostCategoryList from '@/hooks/post/category/usePostCategoryList';

const router = useRouter();

const {
  loading: deleteLoading,
  handleDelete
} = useDeleteItem(
  deletePostCategory,
  async () => {
    handleSearch();
  }
);

const {
  loading: toggleIsShowLoading,
  handleToggleIsShow
} = useToggleIsShow(togglePostCategoryIsShow, () => {
  handleSearch();
});

const {
  columns,
  dataSource,
  pagination,
  selectedRowKeys,
  loading,
  handleSearch,
  handleTableChange,
  getOperations
} = usePostCategoryList({
  handleDelete,
  handleToggleIsShow
});

const spinning = computed(() => deleteLoading.value || toggleIsShowLoading.value);

onActivated(async () => {
  await handleSearch();
});

const handleAdd = () => {
  router.push({ name: '新增文章分类' });
}
</script>
