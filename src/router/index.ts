import {
  createRouter,
  createWebHistory,
  RouteRecordRaw
} from 'vue-router';

import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },

  {
    path: '/login',
    name: 'login',
    component: Login
  },

  {
    path: '/sys/menu/list',
    name: 'sysMenuList',
    component: () => import('@/views/sys/menu/List.vue')
  },

  {
    path: '/sys/menu/add',
    name: 'sysMenuAdd',
    component: () => import('@/views/sys/menu/Add.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
