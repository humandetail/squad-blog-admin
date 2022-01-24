<template>
  <section class="logo-wrapper">
    <router-link class="link" to="/">
      <div class="logo">
        <img class="logo-img" src="/logo.png" alt="Logo" />
      </div>
      <div class="site-name">{{ siteName }}</div>
    </router-link>
  </section>
</template>

<script setup lang="ts">
const siteName = '后台管理中心';
</script>

<style lang="less" scoped>
.logo-wrapper {
  height: 64px;
  padding: 16px;
  margin-bottom: 16px;

  .link {
    display: inline-flex;
    align-items: center;
    height: 100%;
    color: #fff;
    cursor: pointer;

    .logo-img {
      width: 32px;
      height: 32px;
    }

    .site-name {
      margin-left: 8px;
      font-size: 20px;
      font-weight: 700;
    }
  }
}
</style>
