import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './router/permission';

import 'nprogress/nprogress.css';
import 'ant-design-vue/dist/antd.dark.less';
import './assets/styles/index.less';

const app = createApp(App);

app
  .use(router)
  .use(createPinia())
  .mount('#app');
