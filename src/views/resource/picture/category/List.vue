<template>
  <div class="page-resource-picture-category-list">
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
import { computed, onActivated, ref } from 'vue';

import { QueryList, BooleanCell, ListOperations } from '@/components/common/queryList';
import { useRouter } from 'vue-router';
import { useToggleIsShow, useDeleteItem } from '@/hooks/common/queryList';
import { deletePictureCategory, togglePictureCategoryIsShow } from '@/services';
import usePictureCategoryList from '@/hooks/resource/picture/category/usePictureCategoryList';

const router = useRouter();

const {
  loading: deleteLoading,
  handleDelete
} = useDeleteItem(
  deletePictureCategory,
  async () => {
    handleSearch();
  }
);

const {
  loading: toggleIsShowLoading,
  handleToggleIsShow
} = useToggleIsShow(togglePictureCategoryIsShow, () => {
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
} = usePictureCategoryList({
  handleDelete,
  handleToggleIsShow
});

const spinning = computed(() => deleteLoading.value || toggleIsShowLoading.value);

onActivated(async () => {
  await handleSearch();
});

const handleAdd = () => {
  router.push({ name: '新增图片分类' });
}
</script>
