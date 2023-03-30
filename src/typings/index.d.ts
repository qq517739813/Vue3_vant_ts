// import { AxiosRequestConfig } from "axios";

// declare module 'axios' {
//   interface AxiosInstance{
//     (config:AxiosRequestConfig):Promise<any>
//   }
// }

declare namespace API {
  namespace Global {
    interface Params {
      Token: string | null;
    }

    /**
     * @description 用户登录
     */
    interface LoginPayload {
      LoginName: string; // 用户名
      LoginPwd: string; // 密码
    }
    /**
     * @description 设备汇总
     */
    interface DevSummaryPayload extends Params {
      Uid: string; // 用户id
    }
    /**
     * @description 用户设备
     */
    interface UserEquipsPayload extends Params {
      Uid: string; // 用户id
    }
  }
}
