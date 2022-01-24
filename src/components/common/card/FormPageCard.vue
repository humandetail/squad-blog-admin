<template>
  <a-card
    :title="title">
    <template #extra>
      <div class="operations">
        <a-button @click="back">
          <ArrowLeftOutlined />
          返回上一页
        </a-button>

        <a-button
          v-if="handleReset"
          @click="handleReset">
          <SyncOutlined />
          重置
        </a-button>

        <a-button
          v-if="handleSubmit"
          type="primary"
          :loading="loading"
          @click="handleSubmit">
          <SaveOutlined />
          提交
        </a-button>
      </div>
    </template>

    <slot />
  </a-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

defineProps<{
  title: string;
  loading?: boolean;
  handleSubmit?: Function,
  handleReset?: Function
}>();

const router = useRouter();

const back = () => {
  router.back();
}
</script>

<style lang="less" scoped>
.operations {
  > :not(:first-of-type) {
    margin-left: 16px;
  }
}
</style>
