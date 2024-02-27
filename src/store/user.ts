import type { RouteRecordRaw } from 'vue-router'
import type { MenuItem } from '@/types/menus'
import type { UserInfo } from '@/types/user'
import { TOKEN } from '@/config/constants'
import { getAllowMenus, getUserInfo, logout } from '@/services'
import { error } from '@/utils/http'
import { defineStore } from 'pinia'
import router from '../router'

const _token = localStorage.getItem(TOKEN) ?? ''

export const useUserStore = defineStore('user', () => {
  const token = ref(_token)
  const userInfo = ref<UserInfo | null>(null)
  const menus = ref<MenuItem[]>([])
  const routes = ref<RouteRecordRaw[]>([])

  const setToken = (t = '') => {
    token.value = t
    localStorage.setItem(TOKEN, t)
  }

  const setUserInfo = async () => {
    try {
      const res = await getUserInfo()
      if (res.code !== 200) {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw res
      }

      userInfo.value = res.data
    } catch (err: unknown) {
      error((err as Error)?.message)
      router.push('/login')
    }
  }

  const setMenus = async () => {
    try {
      const res = await getAllowMenus()
      if (res.code !== 200) {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw res
      }
      menus.value = res.data.records
    } catch (err: unknown) {
      error((err as Error)?.message)
      router.push('/login')
    }
  }

  const setRoutes = (value: RouteRecordRaw[]) => {
    routes.value = value
  }

  const doLogout = async () => {
    try {
      if (token.value) {
        await logout()
      }
    } finally {
      // 清空所有数据
      setToken('')
      menus.value = []
      userInfo.value = null
      routes.value = []

      router.push('/login')
    }
  }

  return {
    userInfo,
    token,
    menus,
    routes,

    setMenus,
    setUserInfo,
    setRoutes,
    doLogout
  }
})
