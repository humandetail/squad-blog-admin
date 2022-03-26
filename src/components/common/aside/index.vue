<template>
  <aside class="common-aside">
    <Logo />
    <Menus />
  </aside>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue';
import Menus from './Menus.vue';
</script>

<style lang="less" scoped>
.common-aside {
  position: sticky;
  top: 0;
}
</style>
