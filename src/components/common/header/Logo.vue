<template>
  <router-link
    to="/"
    class="logo-wrapper"
  >
    <img
      class="logo"
      src="/logo.svg"
      alt="Logo"
    />
    <div class="site-name">
      后台管理中心
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
.logo-wrapper {
  display: flex;
  align-items: center;
  gap: 16px;
  color: inherit;

  .logo {
    width: 48px;
    height: 48px;
  }

  .site-name {
    font-size: 20px;
    font-weight: 700;
  }
}
</style>
