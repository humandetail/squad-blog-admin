<template>
  <div class="page-sys-menu-list">
    <a-spin :spinning="expandLoading || deleteLoading">
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
import { computed, onActivated } from 'vue';
import { useRouter } from 'vue-router';
import type { TableColumnType } from 'ant-design-vue';
import { useQueryList } from '@/hooks/queryList';
import { deleteMenu, getMenusByParentId } from '@/services/sys/menu';
import { showDashes } from '@/utils/tools';
import { EMenuType } from '@/config/constants';
import { IMenuItem } from '@/types/menu';
import { IBasePageResponse, IOperationButtonProps } from '@/types/common';
import commonColumns from '@/config/commonColumns';
import { useRequest } from '@/hooks/common';
import { QueryList, BooleanCell, ListOperations } from '@/components/common/queryList';
import { DynamicIcon } from '@/components/common/icons';
import { success } from '@/utils/http';

export type TableDataType = {
  key: string;
  name: string;
  age: number;
  address: string;
  chidren?: any[]
};

const router = useRouter();

const { loading: expandLoading, fetch: expandFetch } = useRequest<IBasePageResponse<IMenuItem[]>, [number, any]>(getMenusByParentId);
const { loading: deleteLoading, fetch: deleteFetch } = useRequest(deleteMenu);

const {
  dataSource,
  pagination,
  selectedRowKeys,
  loading,
  handleSearch,
  handleTableChange
} = useQueryList<IMenuItem, IBasePageResponse<IMenuItem[]>>(getMenusByParentId.bind(null, 0));

onActivated(async () => {
  await handleSearch();
});

const columns: TableColumnType<TableDataType>[] = [
  {
    title: '菜单名称',
    dataIndex: 'name',
    resizable: true,
    sorter: true,
    fixed: true,
    sortDirections: ['descend'],
    width: 150,
    minWidth: 150
  },
  {
    title: '类型',
    dataIndex: 'type',
    resizable: true,
    sorter: true,
    width: 80,
    minWidth: 80
  },
  {
    title: '路由地址',
    dataIndex: 'router',
    resizable: true,
    width: 150,
    minWidth: 150,
    customRender: ({ text }) => showDashes(text)
  },
  {
    title: '权限代码',
    dataIndex: 'permission',
    resizable: true,
    width: 150,
    minWidth: 150,
    customRender: ({ text }) => showDashes(text)
  },
  {
    title: '组件路径',
    dataIndex: 'path',
    resizable: true,
    width: 150,
    minWidth: 150,
    customRender: ({ text }) => showDashes(text)
  },
  {
    title: '图标',
    dataIndex: 'icon',
    resizable: true,
    width: 70,
    minWidth: 70
  },
  {
    title: '是否缓存',
    dataIndex: 'isCache',
    resizable: true,
    sorter: true,
    width: 100,
    minWidth: 100
  },
  ...commonColumns(),
  {
    title: '操作',
    dataIndex: 'operations',
    fixed: 'right',
    width: 110,
    minWidth: 110
  }
];

const treeData = computed(() => {
  return dataSource.value.map(item => {
    if (item.hasChildren && !item.children) {
      item.children = [];
    }
    return item;
  })
});

const getOperations = (record: IMenuItem): IOperationButtonProps[] => {
  return [
    {
      text: '编辑',
      type: 'success',
      handler: () => {
        router.push({
          name: '编辑菜单',
          params: {
            id: record.id
          }
        });
      }
    },
    {
      text: '删除',
      type: 'danger',
      handler: () => {
        handleDelete(record.id);
      }
    }
  ]
}

const handleExpand = async (expanded: boolean, record: IMenuItem) => {
  if (expanded && record.children?.length === 0) {
    const res = await expandFetch(record.id, null);
    record.children = res.data.records.map(item => {
      if (item.hasChildren && !item.children) {
        item.children = [];
      }
      return item;
    });
  }
}

const handleAdd = () => {
  router.push({ name: '新增菜单' });
}

const handleDelete = async (id: number) => {
  await deleteFetch(id);
  success('删除成功');
  await handleSearch();
}
</script>
