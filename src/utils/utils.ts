import { userStore } from '@/store/user';

const store = userStore();

/**
 *  sessionStorage对象
 */
// export const SessionStorage = {
//   setKey(obj: any) {
//     for (const name in obj) {
//       if (name) {
//         window.sessionStorage.setItem(name, obj[name]);
//       }
//     }
//   },
//   getKey(name: string) {
//     return window.sessionStorage.getItem(name);
//   },
//   remove(name: string) {
//     window.sessionStorage.removeItem(name);
//   },
//   clear() {
//     window.sessionStorage.clear();
//   },
// };
// const userInfo: string | null = SessionStorage.getKey(USER_INFO);

/**
 *  返回登录页面
 */
export const redirectLogin = () => {
  store.upDateUserInfo({});
  store.upDateSystemInfo({});
  store.upDateDevList({});
  window.location.href = '/login';
};

/**
 *  获取用户Uid
 */
// export const getUserUid = () => JSON.parse(userInfo as any).Uid;

/**
 *  获取用户Token
 */
// export const getToken = () => SessionStorage.getKey(TOKEN_KEY);


