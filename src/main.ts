import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { components, icons } from './common/antd';

const app = createApp(App);

app
  .use(router)
  .use(createPinia())
  .use(components)
  .use(icons)
  .mount('#app');
