<template>
  <div class="page-sys-menu-list">
    <a-spin :spinning="spinning">
      <query-list
        row-key="id"
        :loading="loading"
        :columns="columns"
        :data-source="treeData"
        :pagination="pagination"
        :is-tree-data="true"
        :show-search="false"
        v-model:selected-row-keys="selectedRowKeys"
        @table-change="handleTableChange"
        @refresh="handleSearch"
        @expand="handleExpand">
        <template #customOperations>
          <a-button
            type="primary"
            @click="handleAdd">
            <plus-outlined />
            添加新菜单
          </a-button>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'type'">
            {{ EMenuType[record.type] }}
          </template>

          <template v-if="column.dataIndex === 'icon'">
            <template v-if="!record.icon">-</template>
            <DynamicIcon v-else :icon="record.icon" />
          </template>

          <template v-if="column.dataIndex === 'isCache'">
            <BooleanCell :value="record.isCache" />
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
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useDeleteItem, useToggleIsShow } from '@/hooks/common/queryList';
import { toggleMenuIsShow, deleteMenu } from '@/services';
import { EMenuType } from '@/config/constants';
import { QueryList, BooleanCell, ListOperations } from '@/components/common/queryList';
import { DynamicIcon } from '@/components/common/icons';
import { useExpand, useMenuList } from '@/hooks/sys/menu';

const router = useRouter();

const {
  loading: expandLoading,
  handleExpand
} = useExpand();

const {
  loading: deleteLoading,
  handleDelete
} = useDeleteItem(
  deleteMenu,
  () => {
    handleSearch();
  }
);

const {
  loading: toggleIsShowLoading,
  handleToggleIsShow
} = useToggleIsShow(toggleMenuIsShow, () => {
  handleSearch();
});

const {
  columns,
  treeData,
  pagination,
  selectedRowKeys,
  loading,
  handleSearch,
  handleTableChange,
  getOperations
} = useMenuList({
  handleDelete,
  handleToggleIsShow
});

const spinning = computed(() => deleteLoading.value || toggleIsShowLoading.value || expandLoading.value);

onMounted(async () => {
  await handleSearch();
});

const handleAdd = () => {
  router.push({ name: '新增菜单' });
}
</script>
