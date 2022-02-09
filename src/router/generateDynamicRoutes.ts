import _ from 'lodash';
import { IMenuItem } from '@/types/menu';
import { RouteRecordRaw } from 'vue-router';

export function generateDynamicRoutes (menus: IMenuItem[]): RouteRecordRaw[] {
  return [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        id: -1,
        parentId: 0,
        hidden: false,
        title: '首页',
        icon: 'HomeOutlined',
        keepAlive: true
      }
    },
    ...generator(menus.filter(menu => menu.type === 1)),
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      redirect: '/expection/404',
      meta: {
        hidden: true
      }
    }
  ]
}

const generator = (menus: IMenuItem[]): RouteRecordRaw[] => {
  return menus.map(menu => {
    const { id, parentId, name, router, path, icon, isShow, isCache } = menu;
    const currentRoute: RouteRecordRaw = {
      path: router ? `/${router}` : '/', // 路由 path
      name: name, // 路由名称(唯一)
      component: () => path ? import(`../views/${path}${/\.vue$/.test(path) ? '' : '.vue'}`) : import('../views/Home.vue'),
      meta: {
        id,
        parentId,
        title: name, // 页面标题
        icon,
        keepAlive: isCache,
        hidden: !isShow // 是否在侧边栏中隐藏
      }
    }

    // 是否有子菜单，并递归处理
    if (menu.children && !_.isEmpty(menu.children)) {
      // 递归
      currentRoute.children = generator(menu.children);
    }
    return currentRoute;
  })
}
