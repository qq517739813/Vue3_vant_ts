// import { AxiosRequestConfig } from "axios";

// declare module 'axios' {
//   interface AxiosInstance{
//     (config:AxiosRequestConfig):Promise<any>
//   }
// }

declare namespace API {
  namespace Global {
    // 登录参数
    interface LoginPayload {
      name: string; // 用户名
      password: string; // 密码
    }
    // 用户信息参数
    interface UserPayLoad {
      id?: string; // 用户uid
    }
    // 地块信息参数
    interface FieldPayLoad {
      page: number; // 当前页数
      pageSize: number; // 分页大小
      isAll: boolean; // 是否全部展示true是
    }
    interface CommonPayload {
      Uid: string; // 用户id
      FunCode?: string;
    }
  }
}
