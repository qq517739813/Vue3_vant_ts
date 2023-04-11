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
      LoginName: string; // 用户名
      LoginPwd: string; // 密码
    }
    interface CommonPayload extends Params {
      Uid: string; // 用户id
      FunCode?: string;
    }
    interface VersionManagePayload extends Params {
      Condition: string;
      Page: number;
      PageSize: number;
    }
    interface DevInfoPayload extends Params {
      ObjId: string; // 设备id
    }
    interface AutoIrrigatePayload {
      Id: string; // 用户id
    }
    interface FertilizerPayload {
      Id: string; // 设备id
    }
    interface ControlCommandPayload extends Params {
      ObjId: string; // 设备id
      Uid: string; // 用户id
      Command: number; // 1为开，0为关
    }
  }
}
