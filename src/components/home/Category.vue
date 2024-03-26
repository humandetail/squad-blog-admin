<template>
  <section class="category">
    <ul class="list">
      <li
        v-for="option of options"
        :key="option.value"
        class="item"
        :class="{
          active: modelValue === option.value
        }"
        @click="handleItemClick(option.value)"
      >
        {{ option.label }}
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { theme } from 'ant-design-vue'

withDefaults(defineProps<{
  modelValue: number
}>(), {
  modelValue: 1
})

const emits = defineEmits<(e: 'update:modelValue', value: number) => void>()

const { token } = theme.useToken()

const options = [
  { label: '今天', value: 1 },
  { label: '昨天', value: 2 },
  { label: '最近7天', value: 3 },
  { label: '最近30天', value: 4 }
]

const handleItemClick = (value: number) => {
  emits('update:modelValue', value)
}
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
  border: 1px solid v-bind('token.colorBorderSecondary');
  border-radius: 8px;
  background-color: v-bind('token.colorBgContainer');
  overflow: hidden;

  .item {
    padding: 0 16px;
    line-height: 32px;
    cursor: pointer;

    &:not(.active):hover {
      color: v-bind('token.colorPrimary');
    }

    &.active {
      color: v-bind('token.colorWhite');
      background-color: v-bind('token.colorPrimary');
    }
  }
}
</style>
