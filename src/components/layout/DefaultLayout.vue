<template>
<a-layout>
  <a-layout-sider width="260px">
    <CommonAside />
  </a-layout-sider>
  <a-layout>
    <a-layout-header>
      <CommonHeader />
    </a-layout-header>
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.fade || 'fade'" mode="out-in">
        <a-layout-content>
          <CommonBreadcrumb />

          <keep-alive v-if="route.meta.keepAlive">
            <component
              :is="Component"
              :key="route.fullPath"
            />
          </keep-alive>
          <component
            v-else
            :is="Component"
            :key="route.fullPath"
          />
        </a-layout-content>
      </transition>
    </router-view>
  </a-layout>
</a-layout>
</template>

<script setup lang="ts">
import CommonHeader from '@components/common/header/index.vue';
import CommonAside from '@components/common/aside/index.vue';
import CommonBreadcrumb from '../common/Breadcrumb.vue';
</script>

<style lang="less" scoped>
.ant-layout {
  min-height: 100%;

  .ant-layout-header {
    padding: 16px;
    background-color: #1a1a1a;
  }

  .ant-layout-content {
    padding: 16px;

    & > [class^="page-"] {
      height: 100%;
    }

    .ant-breadcrumb {
      margin-bottom: 16px;
    }
  }
}
</style>
