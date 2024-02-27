import _ from 'lodash'
import type { MenuItem } from '@/types/menus'
import type { RouteRecordRaw } from 'vue-router'

export function generateDynamicRoutes (menus: MenuItem[]): RouteRecordRaw[] {
  return [
    {
      path: '/',
      name: 'home',
      component: async () => await import('@/pages/home/index.vue'),
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

const generator = (menus: MenuItem[]): RouteRecordRaw[] => {
  const pages = (import.meta as any).globEager('../pages/**/*.vue')

  const resolveComponent = (path: string) => {
    const importPage = pages[path ? `../pages/${path}${/\.vue$/.test(path) ? '' : '.vue'}` : '../views/Home.vue']

    if (!importPage) {
      throw new Error(`Unknown page ${path}. Is it located under Pages with a .vue extension?`)
    }

    return importPage.default
  }

  return menus.map(menu => {
    const { id, parentId, name, router, path, icon, isShow, isCache } = menu
    const currentRoute: RouteRecordRaw = {
      path: router ? `/${router}` : '/', // 路由 path
      name, // 路由名称(唯一)
      component: resolveComponent(path),
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
      (currentRoute as any).children = generator(menu.children)
    }
    return currentRoute
  })
}
