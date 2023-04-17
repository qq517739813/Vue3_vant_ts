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
      Uid?: string; // 用户id
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
      Command: number; // 1为开或正向，0为关或停止，2反向
    }
    interface ControlParamPayload extends Params {
      TypeId: string; // 空字符串
      ObjId: string; // 设备id
    }
    interface WarnMsgPayload extends Params {
      Page: number;
      PageSize: number;
      ProId: string; // 项目id
      Type: number;  // 1参数异常(环境参数) 2虫情异常
    }
    interface HistoryDataPayload extends DevInfoPayload {
      Bdate: string;
      Edate: string;
    }
    // tss
    interface ProId extends Params {
      ProId: string;
    }
    interface WarnAccount extends ProId {
      Account:string;
      AccountType:Number;
    }
  }
}
