import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './assets/reset.scss'
import './router/permission'

import { registerAntdFormElements } from './plugins/antdFormElements'

import App from './App.vue'

const app = createApp(App)

app
  .use(createPinia())
  .use(router)
  .use(registerAntdFormElements)
  .mount('#app')
