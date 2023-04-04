import { defineStore } from 'pinia';

interface UserStoreState {
  [propName: string]: any;
}
interface SystemStoreState {
  [propName: string]: any;
}
export const userStore = defineStore('userInfo', {
  state: (): UserStoreState => {
    return {
      userInfo: {},
      systemInfo:{}
    };
  },
  actions: {
    upDateUserInfo(info: UserStoreState) {
      this.$state.userInfo = info;
    },
    upDateSystemInfo(info: SystemStoreState) {
      this.$state.systemInfo = info;
    }
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