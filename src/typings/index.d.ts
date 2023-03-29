// import { AxiosRequestConfig } from "axios";

 declare namespace API {
  namespace Global {
    interface Params {
      token: string;
    }

    interface LoginPayload {
      LoginName: string;
      LoginPwd: string;
    }
  }
}

// declare module 'axios' {
//   interface AxiosInstance{
//     (config:AxiosRequestConfig):Promise<any>
//   }
// }
