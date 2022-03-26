<template>
  <section class="picture-list">
    <a-empty
      v-if="isEmpty"
      :image="simpleImage"
    />

    <template v-else>
      <PictureItem
        v-for="item in dataSource"
        :key="item.id"
        :picture="item"
        @refresh="emit('refresh')"
      />
    </template>
  </section>
</template>

<script setup lang="ts">
import { IPictureItem } from '@/types/picture';
import { computed } from 'vue';
import { Empty } from 'ant-design-vue';

import PictureItem from './Item.vue';

const props = defineProps<{
  dataSource: IPictureItem[]
}>();

const emit = defineEmits<{(e: 'refresh'): void}>();

const isEmpty = computed(() => props.dataSource.length <= 0);
const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
</script>

<style lang="less" scoped>
.picture-list {
  display: flex;
  flex-wrap: wrap;
  min-height: 250px;
  margin: 0 -8px;
  padding: 8px 0;

  .picture-item {
    margin: 8px;
  }
}
</style>
