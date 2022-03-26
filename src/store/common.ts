
import { IMenuChain, IMenuItem } from '@/types/menu';
import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useUserStore } from './user';

interface ICommonState {
  menuChains: IMenuChain[];
}

export const useCommonStore = defineStore('common', {
  state: () => (<ICommonState>{
    menuChains: []
  }),

  actions: {
    async setMenuChains (currentMenu: IMenuChain) {
      const userStore = useUserStore();
      const menus = computed(() => userStore.menus);

      const menuChains: IMenuChain[] = [currentMenu];

      let parentMenu: IMenuItem | undefined = menus.value.find(({ id }) => currentMenu.parentId !== 0 && id === currentMenu.parentId);
      while (parentMenu) {
        menuChains.unshift({
          id: parentMenu.id,
          parentId: parentMenu.parentId,
          title: parentMenu.name,
          icon: parentMenu.icon,
          router: parentMenu.router
        });

        parentMenu = menus.value.find(({ id }) => id === parentMenu!.parentId);
      }

      this.menuChains = menuChains.map((chain) => {
        chain.router = chain.router && !/^\//.test(chain.router)
          ? `/${chain.router}`
          : chain.router;

        return chain;
      });
    }
  }
});
