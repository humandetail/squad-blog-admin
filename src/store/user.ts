import { TOKEN } from '@/config/constants';
import router from '@/router';
import { getAllowMenus, getUserInfo, logout } from '@/services';
import { IMenuItem } from '@/types/menu';
import { IUserInfo } from '@/types/user';
import { error } from '@/utils/http';
import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';

interface IUserState {
  token: string;
  userInfo: IUserInfo | null;
  menus: IMenuItem[],
  routes: RouteRecordRaw[]
}

const token = localStorage.getItem(TOKEN) || '';

export const useUserStore = defineStore('user', {
  state: () => (<IUserState>{
    token,
    userInfo: null,
    menus: [],
    routes: []
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

    async setMenus () {
      try {
        const res = await getAllowMenus();
        if (res.code !== 200) {
          throw res;
        }
        this.menus = res.data.records;
      } catch (err: any) {
        error(err.message);
      }
    },

    setRoutes (routes: RouteRecordRaw[]) {
      this.routes = routes;
    },

    async logout () {
      try {
        if (this.token) {
          await logout();
        }
      } finally {
        // 清空所有数据
        this.setToken('');
        this.menus = [];
        this.userInfo = null;
        this.routes = [];
        router.push('/login');
      }
    }
  }
});
