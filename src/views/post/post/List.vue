<template>
  <div class="page-post-post-list">
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
        @refresh="handleSearch">
        <template #customOperations>
          <a-button
            type="primary"
            @click="batchProgressVisible = true">
            <mac-command-outlined />
            批处理
          </a-button>
          <a-button
            type="primary"
            @click="handleAdd">
            <plus-outlined />
            添加新文章
          </a-button>
        </template>

        <template #search>
          <ListSearch
            :loading="loading"
            @search="handleSearch"
          />
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'cover'">
            <CoverPreview
              :url="record.coverPic"
              width="80px"
              height="80px"
            />
          </template>

          <template v-if="column.dataIndex === 'tags'">
            <a-tag
              v-for="item in record.tags"
              :key="item.id">
              {{ item.displayName }}
            </a-tag>
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
    <BatchProgress
      v-if="batchProgressVisible"
      :selected-row-keys="selectedRowKeys"
      @success="handleBatchProgressSuccess"
      @close="batchProgressVisible = false"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onActivated, ref } from 'vue';

import { QueryList, BooleanCell, ListOperations } from '@/components/common/queryList';
import { useRouter } from 'vue-router';
import { useToggleIsShow, useDeleteItem } from '@/hooks/common/queryList';
import { deletePost, togglePostIsShow } from '@/services';
import usePostList from '@/hooks/post/post/usePostList';
import CoverPreview from '@/components/resource/picture/picture/form/Preview.vue';
import ListSearch from '@/components/post/post/ListSearch.vue';
import { useDefineAsyncComponent } from '@/hooks/common';

const BatchProgress = useDefineAsyncComponent('/components/post/post/batchProgress/index.vue');

const router = useRouter();

const batchProgressVisible = ref(false);

const {
  loading: deleteLoading,
  handleDelete
} = useDeleteItem(
  deletePost,
  async () => {
    handleSearch();
  }
);

const {
  loading: toggleIsShowLoading,
  handleToggleIsShow
} = useToggleIsShow(togglePostIsShow, () => {
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
} = usePostList({
  handleDelete,
  handleToggleIsShow
});

const spinning = computed(() => deleteLoading.value || toggleIsShowLoading.value);

onActivated(async () => {
  await handleSearch();
});

const handleAdd = () => {
  router.push({ name: '新增文章' });
}

const handleBatchProgressSuccess = () => {
  batchProgressVisible.value = false;
  selectedRowKeys.value = [];
  handleSearch();
}
</script>
