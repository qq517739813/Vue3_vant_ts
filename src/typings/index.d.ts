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
    interface LoginPayload {
      name: string; // 用户名
      password: string; // 密码
    }
    interface CommonPayload extends Params {
      Uid: string; // 用户id
      FunCode?: string;
    }
    interface DevInfoPayload extends Params {
      Uid?: string; // 用户id
      ObjId: string; // 设备id
    }
    interface ResetPwd {
      val: string;
      id: string | number;
    }
  }
}
