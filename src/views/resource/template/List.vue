<template>
  <div class="page-resource-template-list">
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
            添加新文章模板
          </a-button>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'name'">
            <a-button
              type="link"
              :href="record.qiniuDomain + record.qiniuKey"
              target="_blank">
              {{ record.name }}
            </a-button>
          </template>

          <template v-if="column.dataIndex === 'coverPic'">
            <PicturePreview
              :url="record.coverPic"
              width="110px"
              height="90px"
            />
          </template>

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
import { deleteTemplate, toggleTemplateIsShow } from '@/services';
import { useTemplateList } from '@/hooks/resource/template';
import PicturePreview from '@/components/resource/picture/picture/form/Preview.vue';

const router = useRouter();

const {
  loading: deleteLoading,
  handleDelete
} = useDeleteItem(
  deleteTemplate,
  async () => {
    handleSearch();
  }
);

const {
  loading: toggleIsShowLoading,
  handleToggleIsShow
} = useToggleIsShow(toggleTemplateIsShow, () => {
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
} = useTemplateList({
  handleDelete,
  handleToggleIsShow
});

const spinning = computed(() => deleteLoading.value || toggleIsShowLoading.value);

onActivated(async () => {
  await handleSearch();
});

const handleAdd = () => {
  router.push({ name: '新增文章模板' });
}
</script>
