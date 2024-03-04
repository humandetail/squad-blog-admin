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

router.beforeEach(async (to, from) => {
  NProgress.start()
  if (!whiteList.includes(to.path)) {
    const userStore = useUserStore()
    const token = userStore.token
    if (!token) {
      // 无 token 直接跳回登录页面
      return { path: 'login', query: { redirect: to.fullPath } }
    }

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
        return to.path === redirect ? to.fullPath : redirect
      } catch (err) {
        return '/exception/503'
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
