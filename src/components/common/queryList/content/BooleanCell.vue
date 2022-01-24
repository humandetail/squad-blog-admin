<template>
  <a-badge
    v-if="$props.value"
    color="green"
    text="是"
  />
  <a-badge
    v-else
    color="red"
    text="否"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: [Boolean, Number],
      default: false
    }
  }
}
</script>
