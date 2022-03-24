<template>
  <div class="page-personal-base-list">
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
            添加基本信息
          </a-button>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'avatar'">
            <CoverPreview
              :url="record.avatarPic"
              width="80px"
              height="80px"
            />
          </template>

          <template v-if="column.dataIndex === 'isShow'">
            <BooleanCell :value="record.isShow" />
          </template>

          <template v-if="column.dataIndex === 'isDefault'">
            <BooleanCell :value="record.isDefault" />
          </template>

          <template v-if="column.dataIndex === 'isShowSkills'">
            <BooleanCell :value="record.isShowSkills" />
          </template>

          <template v-if="column.dataIndex === 'isShowWorks'">
            <BooleanCell :value="record.isShowWorks" />
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
import { deletePersonalBase, togglePersonalBaseIsDefault, togglePersonalBaseIsShow } from '@/services';
import { useFetchPersonalBaseList } from '@/hooks/personal/base';

import CoverPreview from '@/components/resource/picture/picture/form/Preview.vue';
import useToggleIsDefault from '@/hooks/common/queryList/useToggleIsDefault';

const router = useRouter();

const {
  loading: deleteLoading,
  handleDelete
} = useDeleteItem(
  deletePersonalBase,
  async () => {
    handleSearch();
  }
);

const {
  loading: toggleIsShowLoading,
  handleToggleIsShow
} = useToggleIsShow(togglePersonalBaseIsShow, () => {
  handleSearch();
});

const {
  loading: toggleIsDefaultLoading,
  handleToggleIsDefault
} = useToggleIsDefault(togglePersonalBaseIsDefault, () => {
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
} = useFetchPersonalBaseList({
  handleDelete,
  handleToggleIsShow,
  handleToggleIsDefault
});

const spinning = computed(() => deleteLoading.value || toggleIsShowLoading.value || toggleIsDefaultLoading.value);

onActivated(async () => {
  await handleSearch();
});

const handleAdd = () => {
  router.push({ name: '新增基本信息' });
}
</script>
