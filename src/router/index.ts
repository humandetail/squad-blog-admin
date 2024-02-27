import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw
} from 'vue-router'

import Login from '@/pages/login/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => {
    return {
      behavior: 'smooth',
      top: 0
    }
  }
})

export default router
