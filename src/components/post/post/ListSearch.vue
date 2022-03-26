<template>
  <a-input-group compact>
    <a-select
      v-model:value="categoryId"
      style="width: 120px">
      <a-select-option
        :value="0">
        所有分类
      </a-select-option>
      <a-select-option
        v-for="item in categories"
        :key="item.id"
        :value="item.id">
        {{ item.displayName }}
      </a-select-option>
    </a-select>
    <InputSearch
      :loading="loading"
      @search="$emit('search', { categoryId, keyword: $event })"
      style="width: 200px"
    />
  </a-input-group>
</template>

<script setup lang="ts">
import { useRequest } from '@/hooks/common';
import { getPostCategories } from '@/services';
import { IBasePageParams, IBasePageResponse } from '@/types/common';
import { IPostCategoryItem } from '@/types/postCategory';
import { onMounted, ref } from 'vue';
import InputSearch from '@/components/common/form/InputSearch.vue';

type IQueryParams = {
  categoryId: number;
  keyword: string;
}

withDefaults(defineProps<{
  loading?: boolean;
}>(), {
  loading: false
});

defineEmits<{(e: 'search', value: IQueryParams): void}>();

const categoryId = ref<number>(0);
const categories = ref<IPostCategoryItem[]>([]);

const {
  loading: fetchLoading,
  fetch
} = useRequest<IBasePageResponse<IPostCategoryItem[]>, [IBasePageParams]>(getPostCategories);

onMounted(async () => {
  const res = await fetch({
    current: 1,
    pageSize: 100
  });

  categories.value = res.data.records || [];
});
</script>
