<template>
  <div class="page-personal-skill-list">
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
            @click="batchProgressVisible = true">
            <mac-command-outlined />
            批处理
          </a-button>
          <a-button
            type="primary"
            @click="handleAdd">
            <plus-outlined />
            添加个人技能
          </a-button>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'icon'">
            <CoverPreview
              :url="record.iconPic"
              width="80px"
              height="80px"
            />
          </template>

          <template v-if="column.dataIndex === 'personalBase'">
            <a-button
              type="link"
              @click="handleChangeBase(record)">
              {{ record.baseNickname }}
            </a-button>
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

    <BaseSelectorModal
      v-if="baseSelectorVisible && currentRow"
      :value="currentRow.baseId"
      @close="handleCloseBaseSelector"
      @select="handleBaseSelect"
    />

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
import { deletePersonalSkill, togglePersonalSkillIsShow } from '@/services';
import { useFetchPersonalSkillList } from '@/hooks/personal/skill';

import CoverPreview from '@/components/resource/picture/picture/form/Preview.vue';
import { useDefineAsyncComponent } from '@/hooks/common';
import { useChangePersonalBase } from '@/hooks/personal/base';

const BaseSelectorModal = useDefineAsyncComponent('/components/personal/base/BaseSelector.vue');
const BatchProgress = useDefineAsyncComponent('/components/personal/skill/batchProgress/index.vue');

const router = useRouter();

const batchProgressVisible = ref(false);

const {
  loading: deleteLoading,
  handleDelete
} = useDeleteItem(
  deletePersonalSkill,
  async () => {
    handleSearch();
  }
);

const {
  loading: toggleIsShowLoading,
  handleToggleIsShow
} = useToggleIsShow(togglePersonalSkillIsShow, () => {
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
} = useFetchPersonalSkillList({
  handleDelete,
  handleToggleIsShow
});

const {
  loading: changeLoading,
  currentRow,
  baseSelectorVisible,
  handleBaseSelect,
  handleChangeBase,
  handleCloseBaseSelector
} = useChangePersonalBase(() => {
  handleSearch();
});

const spinning = computed(() => deleteLoading.value || toggleIsShowLoading.value || changeLoading.value);

onActivated(async () => {
  await handleSearch();
});

const handleAdd = () => {
  router.push({ name: '新增个人技能' });
}

const handleBatchProgressSuccess = () => {
  batchProgressVisible.value = false;
  selectedRowKeys.value = [];
  handleSearch();
}
</script>
