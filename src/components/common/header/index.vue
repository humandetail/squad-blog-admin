<template>
  <header class="common-header">
    <UserWrapper />
  </header>
</template>

<script setup lang="ts">
import UserWrapper from './user/index.vue';
</script>

<style lang="less" scoped>
.common-header {
  line-height: 32px;
}
</style>
