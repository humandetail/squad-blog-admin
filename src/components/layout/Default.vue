<template>
  <a-layout>
    <a-layout-header>
      <common-header />
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        collapsible
      >
        <common-aside />
      </a-layout-sider>
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
import { theme } from 'ant-design-vue'

const { token } = theme.useToken()
</script>

  <style lang="scss" scoped>
  .ant-layout {
    min-height: 100%;

    .ant-layout-header {
      position: sticky;
      top: 0;
      z-index: 9;
      padding-inline: 16px;
      background-color: v-bind('token.colorBgContainer');
      box-shadow: 0 1px 4px v-bind('token.colorBorder');
    }

    .ant-layout-sider {
      background-color: v-bind('token.colorBgContainer');
    }

    :deep(.ant-layout-sider-trigger) {
      color: v-bind('token.colorText');
      background-color: v-bind('token.colorBgElevated');
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
