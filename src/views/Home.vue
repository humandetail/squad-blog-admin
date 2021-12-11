<template>
  <div>Home {{ count }} <DatePicker /> <a-button>这可能是个按钮</a-button></div>
</template>

<script setup lang="ts">
import { useUserStore } from '../store/user';
import { DatePicker } from 'ant-design-vue';
// import { axios } from '@utils/http';
import { onMounted } from 'vue';
import { success, error, warning } from '@utils/http/message'

const userStore = useUserStore();

onMounted(async () => {
  // const res = await axios.post('/api/squad-admin/login');
  // console.log(res);
  error('error').then(() => {
    console.log('1');
  }, () => {});
  success('success');
  warning('warning');
  // info('info');
})

const { count } = userStore;
</script>
