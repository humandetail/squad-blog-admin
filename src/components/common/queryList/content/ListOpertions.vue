<template>
  <template
    v-for="(operation, index) of $props.operations"
    :key="index">
    <a-divider v-if="index > 0" type="vertical" />
    <ListOpertionsButton v-bind="operation" />
  </template>
</template>

<script>
import ListOpertionsButton from './ListOperationButton';
export default {
  props: ['operations'],
  components: { ListOpertionsButton }
}
</script>
