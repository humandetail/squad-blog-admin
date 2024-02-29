import type { MenuChain, MenuItem } from '@/types/menus'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useUserStore } from './user'
import { ThemeMode } from '@/config/constants'

let _themeMode = localStorage.getItem('HUMANDETAIL_THEME') ?? ''

if (!_themeMode) {
  // 跟随系统
  const scheme = window.matchMedia(`(prefers-color-scheme: ${_themeMode})`)

  if (!scheme.matches) {
    _themeMode = _themeMode === ThemeMode.light ? ThemeMode.dark : ThemeMode.light
  }
}

if (![ThemeMode.light, ThemeMode.dark].includes(_themeMode as ThemeMode)) {
  _themeMode = ThemeMode.light
}

document.documentElement.setAttribute('data-theme', _themeMode)
localStorage.setItem('HUMANDETAIL_THEME', _themeMode)

export const useCommonStore = defineStore('common', () => {
  const menuChains = ref<MenuChain[]>([])
  const themeMode = ref(_themeMode as ThemeMode)

  const setMenuChains = async (currentMenu: MenuChain) => {
    const userStore = useUserStore()
    const menus = computed(() => userStore.menus)

    const _menuChains: MenuChain[] = [currentMenu]

    let parentMenu: MenuItem | undefined = menus.value.find(({ id }) => currentMenu.parentId !== 0 && id === currentMenu.parentId)
    while (parentMenu) {
      _menuChains.unshift({
        id: parentMenu.id,
        parentId: parentMenu.parentId,
        title: parentMenu.name,
        icon: parentMenu.icon,
        router: parentMenu.router
      })

      parentMenu = menus.value.find(({ id }) => id === parentMenu!.parentId)
    }

    menuChains.value = _menuChains.map((chain) => {
      chain.router = chain.router && !/^\//.test(chain.router)
        ? `/${chain.router}`
        : chain.router

      return chain
    })
  }

  const switchThemeMode = () => {
    themeMode.value = themeMode.value === ThemeMode.dark
      ? ThemeMode.light
      : ThemeMode.dark

    localStorage.setItem('HUMANDETAIL_THEME', themeMode.value)
    document.documentElement.setAttribute('data-theme', themeMode.value)
  }

  return {
    menuChains,
    themeMode,

    setMenuChains,
    switchThemeMode
  }
})
