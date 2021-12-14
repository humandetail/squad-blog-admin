import { TOKEN } from '@/config/constants';
import { logout } from '@/services';
import { IMenuItem, IUserInfo } from '@/types/user';
import { defineStore } from 'pinia';

interface IUserState {
  token: string;
  userInfo: IUserInfo | null;
  menus: IMenuItem[]
}

export const useUserStore = defineStore('user', {
  state: () => (<IUserState>{
    token: '',
    userInfo: null,
    menus: []
  }),

  actions: {
    setToken (token = '') {
      this.token = token;
      localStorage.setItem(TOKEN, token);
    },

    setUserInfo (userInfo: IUserInfo) {
      this.userInfo = userInfo;
    },

    setMenus (menus: IMenuItem[]) {
      this.menus = menus;
    },

    async logout () {
      try {
        await logout();
      } finally {
        this.setToken('');
      }
    }
  }
});
