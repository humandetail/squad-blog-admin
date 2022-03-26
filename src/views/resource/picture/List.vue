<template>
  <div class="page-resource-picture-category-list">
    <a-spin :spinning="spinning">
      <query-list
        row-key="id"
        :loading="loading"
        :show-search="true"
        :is-table="false"
        :pagination="pagination"
        @table-change="handleTableChange"
        @refresh="handleSearch"
        @search="handleSearch({ keyword: $event })">
        <template #customOperations>
          <a-button
            type="primary"
            @click="handleAdd">
            <plus-outlined />
            添加新图片
          </a-button>
        </template>

        <template #table>
          <PictureList
            :data-source="dataSource"
            @refresh="handleSearch"
          />
        </template>
      </query-list>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import { QueryList } from '@/components/common/queryList';
import { useQueryList } from '@/hooks/common/queryList';
import { getPictures } from '@/services';
import { IBasePageResponse } from '@/types/common';
import { IPictureItem } from '@/types/picture';
import { onActivated, ref } from 'vue';

import PictureList from '@/components/resource/picture/picture/list/index.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const {
  dataSource,
  pagination,
  loading,
  handleSearch,
  handleTableChange
} = useQueryList<IPictureItem, IBasePageResponse<IPictureItem[]>>(getPictures);

const spinning = ref(false);

onActivated(() => {
  handleSearch();
});

const handleAdd = () => {
  router.push({
    name: '新增图片'
  });
}
</script>
