export interface FarmItem {
  actIntro: string; // 农事内容
  actName: string; // 农事名称
  actType: string | any; // 农事类型
  creationTime: string; // 农事时间
  creator: string; // 农事负责人
  creatorId: string; // 农事负责人id
  fieldId: string; // 地块id
  fieldName: string; // 工作地块
  id: string; // 农事记录id(农事活动)
  imgPath: string | any; // 图片路径
  imgs: string[]; // 图片地址为imgPath+imgs(每一项)
  mainId: string;
  mainName: string; // 农事主体
  tenantId: string;
  typeId: string; // 农事类型id
}
export interface FieldItem {
  tenantName?: string;
  mainName?: string;
  managerName?: string; // 工作人员名字
  customerName?: string; // 客户名字
  cropIds?: string[]; // 当前作物的id
  cropList?: string[]; // 当前作物
  devList?: string[];
  actList?: FarmItem[];
  tenantId?: string;
  mainId?: string;
  fieldName?: string; // 当前地块
  manager?: string; // 工作人员id
  customer?: string; // 客户id
  position?: string;
  elevation?: number;
  area?: number; // 地块面积
  fieldIntro?: string;
  isActive?: boolean;
  id?: string; // 地块id
}
export interface FieldInfoBaseItem {
  totalRecord: number;
  totalPage: number;
  pageSize: number;
  page: number;
  dataList: FieldItem[];
}
export interface DevListBaseItem {
  DevAddr: any;
  TypeCode: string; // 类型
  IconPath: string; // 图片路径
  Icon: string; // 图片地址=图片路径+icon
  OnIcon: string; // 图片地址=图片路径+icon
  OffIcon: string; // 图片地址=图片路径+icon
  SleepIcon: string; // 图片地址=图片路径+icon
  ExpIcon: string; // 图片地址=图片路径+icon
  FunCode: string[]; // 农场菜单code
  Gid: string;
  Gname: string;
  DevId: string; // 设备id
  DevName: string; // 设备名字
  DevIcon: any; // 设备图标
  Status: string | number; // 设备状态 0在线
  Online: string; // 状态名称
  Lng: string; // 经度
  Lat: string; // 纬度
}
export interface VideoBaseItem {
  DevBrand: string;
  DevNo: string;
  DevType: number;
  DevIp: any;
  DevPort: number;
  DevTcpPort: number;
  LocalIp: any;
  LocalPort: number;
  LocalTcpPort: number;
  StreamType: number;
  LoginAccount: any;
  LoginPwd: any;
  OnlineAddr: string;
  RtspAddr: any;
  WapAddr: string;
  AppletAddr: any; // 视频地址
  IsCloud: true;
  CtrPwd: any;
  Channel: number;
  AppKey: any;
  SecretKey: any;
  Token: any;
  ExpireTime: string;
  NetMode: any;
  Signal: any;
  Power: any;
  Voltage: any;
  TypeCode: any;
  Gid: any;
  Gname: any;
  HeartBeat: any;
  ControlPwd: any;
  DevAddr: any;
  IconPath: any;
  Icon: any;
  OnIcon: any;
  OffIcon: any;
  SleepIcon: any;
  ExpIcon: any;
  DevId: string; // 设备id
  DevName: string; // 设备名称
  DevIcon: any;
  Status: number;
  Online: string; // 当前状态
  Lng: any;
  Lat: any;
}
export interface DateItem {
  calendar: {
    Bdate: string;
    Edate: string;
  };
}
export interface LineChartBaseItem {
  Ah: number; // 环境湿度/空气湿度
  At: number; // 环境温度/空气温度
  Ctime: string; // 时间
  Id: number | string;
  InnerAt: number; // 加热仓温度
}
// 地块信息
export interface FieldInfoItem {
  fieldInfo: FieldInfoBaseItem | any;
}
export interface FieldDetailItem {
  fieldInfo: FieldItem;
}
// 设备列表
export interface DevListItem {
  devInfo: DevListBaseItem[];
}
// 摄像机信息
export interface VideoInfoItem {
  videoBaseInfo?: VideoBaseItem;
}
// 虫情测报图表
export interface LineChartItem {
  pestList: LineChartBaseItem[];
}
// 虫情测报图像
export interface ImglistItem {
  pestImgsList: string[];
}