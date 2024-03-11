<template>
  <a-badge
    :status="isTruthy ? 'success' : 'error'"
    :text="isTruthy ? trueText : falseText"
  />
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  value?: any
  trueText?: string
  falseText?: string
}>(), {
  value: 1,
  trueText: '是',
  falseText: '否'
})

const isTruthy = computed(() => !!props.value)
</script>
