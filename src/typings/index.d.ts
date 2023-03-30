// import { AxiosRequestConfig } from "axios";

// declare module 'axios' {
//   interface AxiosInstance{
//     (config:AxiosRequestConfig):Promise<any>
//   }
// }

declare namespace API {
  namespace Global {
    interface Params {
      Token: string|null;
      FunCode?: string;
    }
    interface LoginPayload {
      LoginName: string; // 用户名
      LoginPwd: string; // 密码
    }
    interface CommonPayload extends Params {
      Uid: string; // 用户id
    }
  }
}
