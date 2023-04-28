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
      Type: number; // 1参数异常(环境参数) 2虫情异常
    }
    interface HistoryDataPayload extends DevInfoPayload {
      Bdate: string; // 开始时间
      Edate: string; // 结束时间
    }
    interface ProId extends Params {
      ProId: string;
    }
    interface WarnAccount extends ProId {
      Account: string;
      AccountType: Number;
    }
    interface CtrlID extends Params {
      CtrlID: string; // 控制器id
    }
    interface SetTimerCtrl {
      Bdate:string;
      CtrId:string; 
      Edate:string;
      Enabled:boolean;
      IsDate:boolean;
      Opaction:string | number;
      Optime:string
    }
    interface SetParamCtrl{
      CtrId:string;
      Enabled:boolean;
      Opaction:string | number;
      ParamId:string;
      Type: string | number;
      Value: number;  
    }
    interface SetLoopCtrl{
      Bdate:string;
      CtrId:string; 
      Edate:string;
      Enabled:boolean;
      Duration:number;
      Action:number;
      Frequency:number;
      Btime:string;
      Etime:string;
    }
    interface WarnDataPayload extends Params {
      Bdate: string; // 开始时间
      Edate: string; // 结束时间
      ObjId?: string; // 设备id
      ObjIds?: string[]; // 选择参数id
      Page?: number;
      PageSize?: number;
      DevId?: string; // 设备id
    }
    interface AnalysisDataPayload extends Params {
      Month?: string; // 月份
      ObjId?: string; // 设备id
      ParamId?:string;  // 设备参数id
      Months?: string[]; // 多个月份
      ParamId?: string; // 选择参数id
    }
    interface VideoMovePayload extends Params{
      DevId: string|any;
      Val: string;  // 'up'上  'down'下  'left'左  'right'右  'zoomin' 拉近  'zoomout'拉远
    }
  }
}
