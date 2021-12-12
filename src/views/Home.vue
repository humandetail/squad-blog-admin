<template>
  <div>Home {{ token }} <DatePicker /> <a-button>这可能是个按钮</a-button></div>
</template>

<script setup lang="ts">
import { useUserStore } from '../store/user';
import { DatePicker } from 'ant-design-vue';
import { login } from '@/services';
import { onMounted } from 'vue';
import { success, error, warning } from '@utils/http/message'

const userStore = useUserStore();

onMounted(async () => {
  const res = await login({
    username: 'admin',
    password: 'abc@123'
  });
  console.log(res);
  error('error').then(() => {
    console.log('1');
  }, () => {});
  success('success');
  warning('warning');
  // info('info');
})

const { token } = userStore;
</script>
