<template>
<a-layout>
  <a-layout-sider width="260px"></a-layout-sider>
  <a-layout>
    <a-layout-header>
      <CommonHeader />
    </a-layout-header>
    <a-layout-content>
      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.fade || 'fade'" mode="out-in">
          <keep-alive>
            <component
              :is="Component"
              :key="route.meta.usePathKey ? route.path : undefined"
            />
          </keep-alive>
        </transition>
      </router-view>
    </a-layout-content>
  </a-layout>
</a-layout>
</template>

<script setup lang="ts">
import CommonHeader from '@components/common/header/index.vue';
</script>

<style lang="less" scoped>
.ant-layout {
  height: 100%;

  .ant-layout-header {
    padding: 16px;
    background-color: #1a1a1a;
  }

  .ant-layout-content {
    padding: 16px;

    & > [class^="page-"] {
      height: 100%;
    }
  }
}
</style>
