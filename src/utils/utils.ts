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

/**
 *  格式化日期 yyyy-mm-dd
 */
export const formatDate = (date?: Date) => {
  // 格式化日期 年月日
  const nowDate = date || new Date();
  const year = nowDate.getFullYear(); // 返回当前日期的年  2019
  let month: number | string = nowDate.getMonth() + 1; // 月份 返回的月份小1个月   记得月份+1 呦
  month = month < 10 ? `0${month}` : month;
  let dates: number | string = nowDate.getDate(); // 返回的是 几号
  dates = dates < 10 ? `0${dates}` : dates;
  const toTime = `${year}-${month}-${dates}`;
  return toTime;
};

