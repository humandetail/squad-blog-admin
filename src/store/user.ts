import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    count: 1
  })
});
