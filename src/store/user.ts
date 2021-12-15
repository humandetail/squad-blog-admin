import { TOKEN } from '@/config/constants';
import router from '@/router';
import { getUserInfo, logout } from '@/services';
import { IMenuItem, IUserInfo } from '@/types/user';
import { error } from '@/utils/http';
import { defineStore } from 'pinia';

interface IUserState {
  token: string;
  userInfo: IUserInfo | null;
  menus: IMenuItem[]
}

const token = localStorage.getItem(TOKEN) || '';

export const useUserStore = defineStore('user', {
  state: () => (<IUserState>{
    token,
    userInfo: null,
    menus: []
  }),

  actions: {
    setToken (token = '') {
      this.token = token;
      localStorage.setItem(TOKEN, token);
    },

    async setUserInfo () {
      try {
        const res = await getUserInfo();
        if (res.code !== 200) {
          throw res;
        }

        this.userInfo = res.data;
      } catch (err: any) {
        error(err.message);
      }
    },

    setMenus (menus: IMenuItem[]) {
      this.menus = menus;
    },

    async logout () {
      try {
        if (this.token) {
          await logout();
        }
      } finally {
        this.setToken('');
        router.push('/login');
      }
    }
  }
});
