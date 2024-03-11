<template>
  <a-card
    class="form-page-card"
    :title="title"
  >
    <template #extra>
      <a-space class="operations">
        <a-button @click="back">
          <ArrowLeftOutlined />
          返回上一页
        </a-button>

        <a-button
          v-if="reset"
          @click="reset"
        >
          <ReloadOutlined />
          重置
        </a-button>

        <a-button
          v-if="submit"
          type="primary"
          :loading="loading"
          @click="submit"
        >
          <SaveOutlined />
          提交
        </a-button>
      </a-space>
    </template>

    <slot />
  </a-card>
</template>

<script setup lang="ts">
import type { Noop } from '@/types/common'
import { theme } from 'ant-design-vue'

defineProps<{
  title: string
  loading?: boolean
  reset?: Noop
  submit?: Noop
}>()

const { token } = theme.useToken()

const router = useRouter()

const back = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
.form-page-card {
  :deep(.ant-card-head) {
    position: sticky;
    top: 64px;
    z-index: 10;
    background-color: v-bind('token.colorBgContainer');
  }
}
</style>
