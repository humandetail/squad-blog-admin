<template>
  <section class="template-selector">
    <ul class="list">
      <li
        v-for="item in records"
        :key="item.id"
        class="item"
        :class="item.id === value ? 'checked' : ''"
        @click="handleItemClick(item.id)">
        <a-image
          :src="item.coverPic"
          :alt="item.name"
          :preview="false"
        />
        <p class="name">{{ item.name }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { RecordType } from '@/types/common';
import { ITemplateItem } from '@/types/template';
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  value: number;
  records: Array<Pick<ITemplateItem, 'id' | 'coverPic' | 'name'> & RecordType>;
  width?: string;
  height?: string;
}>(), {
  records: () => [],
  width: '220px',
  height: '180px'
});

const gutter = 16;

const emit = defineEmits<{(e: 'update:value', value: number): void}>();

const wrapperWidth = computed(() => {
  const len = props.records.length;

  return gutter * (len - 1) + len * parseInt(props.width) + 'px';
});

const handleItemClick = (id: number) => {
  emit('update:value', id === props.value ? 0 : id);
}
</script>

<style lang="less" scoped>
.template-selector {
  height: v-bind(height);
  overflow-x: scroll;
  overflow-y: hidden;
  scroll-behavior: smooth;

  .list {
    list-style: none;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    width: v-bind(wrapperWidth);
    height: calc(v-bind(height) + '18px');
    margin: 0;
    padding: 0;

    .item {
      position: relative;
      width: v-bind(width);
      height: v-bind(height);
      border: 1px solid #303030;
      border-radius: 4px;;

      &.checked {
        border-color: @error-color;
      }

      & + .item {
        margin-left: calc(v-bind(gutter) * 1px);
      }

      :deep(.ant-image) {
        display: flex;
        align-items: center;
        justify-content: center;
        width: calc(v-bind(width) - 4px);
        height: calc(v-bind(height) - 4px);

        img {
          display: block;
          width: auto;
          max-width: calc(v-bind(width) - 4px);
          max-height: calc(v-bind(height) - 4px);
        }
      }

      .name {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        margin: 0;
        padding: 0 16px;
        line-height: 32px;
        background-color: rgba(0, 0, 0, .5);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        opacity: 0;
        transform: translateY(100%);
        transition: all .3s ease-in;
      }

      &:hover .name {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
}
</style>
