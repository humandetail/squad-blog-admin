<template>
  <section class="picture-list">
    <a-empty
      v-if="isEmpty"
      :image="simpleImage"
    />

    <template v-else>
      <resource-picture-picture-list-item
        v-for="item of dataSource"
        :key="item.id"
        :picture="item"
        @refresh="emit('refresh')"
      />
    </template>
  </section>
</template>

<script setup lang="ts">
import { type PictureItem } from '@/types/picture'
import { Empty } from 'ant-design-vue'

const props = defineProps<{
  dataSource: PictureItem[]
}>()

const emit = defineEmits<(e: 'refresh') => void>()

const isEmpty = computed(() => props.dataSource.length <= 0)
const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE
</script>

<style lang="scss" scoped>
.picture-list {
  display: flex;
  flex-wrap: wrap;
  min-height: 250px;
  gap: 16px;
}
</style>
