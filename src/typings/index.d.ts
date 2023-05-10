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
      page?: number; // 当前页数
      pageSize?: number; // 分页大小
      isAll?: boolean; // 是否全部展示true是
      Id?: string; // 地块id
    }
    // 地块信息摄像头切换列表虫情测报，气象参数，土壤参数列表参数
    interface DevListPayload {
      Id: string[]; // 设备列表
      Token: string; // iotToken(农场token)
      Val: string; // 空字符串
    }
    interface DevInfoPayload {
      Token: string; // iotToken(农场token)
      Uid?: string; // 用户id
      ObjId: string; // 设备id
    }
    interface HistoryDataPayload extends DevInfoPayload {
      Bdate: string; // 开始时间
      Edate: string; // 结束时间
    }
    interface CommonPayload {
      Uid: string; // 用户id
      FunCode?: string;
    }
    interface ResetPwd {
      val: string;
      id: string | number;
    }
    interface IsAll {
      IsAll:boolean; // 是否全部展示
    }
  }
}
