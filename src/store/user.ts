import { defineStore } from 'pinia';

interface UserStoreState {
  [propName: string]: any;
}

export const userStore = defineStore('userInfo', {
  state: (): UserStoreState => {
    return {
      userInfo:{}
    };
  },
  actions: {
    upDateUserInfo(info: UserStoreState) {
      this.$state.userInfo = info;
    },
  },
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [
      {
        storage: sessionStorage, // storage可以填sessionStorage，localStorage
      },
    ],
  },
});
