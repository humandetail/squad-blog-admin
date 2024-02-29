import _ from 'lodash'
import NProgress from 'nprogress'
import router from './index'
import { useUserStore } from '../store/user'
import { useCommonStore } from '../store/common'
import { generateDynamicRoutes } from './routes'
import { getQueryString } from '@/utils/tools'

NProgress.configure({
  showSpinner: false
})

const whiteList = ['/login', '/exception/503']

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (whiteList.includes(to.path)) {
    // 白名单直接放行
    next()
  } else {
    const userStore = useUserStore()
    const token = userStore.token
    if (!token) {
      // 无 token 直接跳回登录页面
      next({ path: 'login', query: { redirect: to.fullPath } })
    } else {
      if (!userStore.userInfo || !userStore.menus || _.isEmpty(userStore.userInfo) || _.isEmpty(userStore.menus)) {
        try {
          await Promise.all([
            userStore.setUserInfo(),
            userStore.setMenus()
          ])
          const routes = generateDynamicRoutes(userStore.menus)
          routes.forEach(route => router.addRoute(route))
          userStore.setRoutes(routes)
          const redirect = decodeURIComponent(getQueryString(from.query, 'redirect') || to.path)
          if (to.path === redirect) {
            // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            next({ ...to, replace: true })
          } else {
            // 跳转到目的路由
            next({ path: redirect })
          }
        } catch (err) {
          next('/exception/503')
        }
      } else {
        next()
      }
    }
  }
})

router.afterEach((to) => {
  // 收集菜单链
  const commonStore = useCommonStore()
  commonStore.setMenuChains({
    id: to.meta.id as number,
    parentId: to.meta.parentId as number,
    title: to.meta.title as string,
    icon: to.meta.icon as string,
    router: to.path
  })
  NProgress.done()
})
