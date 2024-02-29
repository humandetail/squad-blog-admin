<template>
  <a-dropdown arrow>
    <div
      class="user-info"
    >
      <a-avatar
        :src="userInfo?.avatarPic"
      >
        <template #icon><UserOutlined /></template>
      </a-avatar>
      <div class="nickname">
        {{ userInfo?.nickname ?? '-' }}
      </div>
    </div>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <a-button type="link">
            <SettingOutlined />
            账号设置
          </a-button>
        </a-menu-item>
        <a-menu-item>
          <a-button type="link">
            <EditOutlined />
            修改密码
          </a-button>
        </a-menu-item>
        <a-menu-item>
          <a-button
            type="link"
            danger
            @click="userStore.doLogout"
          >
            <LoginOutlined />
            退出登录
          </a-button>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

const userInfo = computed(() => userStore.userInfo)
</script>

<style lang="scss" scoped>
.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}
</style>
