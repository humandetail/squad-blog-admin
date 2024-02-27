<template>
  <a-layout>
    <a-layout-sider width="260px">
      aside
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        header
      </a-layout-header>
      <router-view v-slot="{ Component, route }">
        <transition>
          <a-layout-content>
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
</script>

  <style lang="scss" scoped>
  .ant-layout {
    min-height: 100%;

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
