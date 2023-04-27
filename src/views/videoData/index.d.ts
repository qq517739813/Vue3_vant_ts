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
  AppletAddr: any;  // 视频地址
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
export interface VideoListItem {
  videoList: VideoBaseItem[];
}
export interface VideoInfoItem{
  videoBaseInfo?:VideoBaseItem
}
export interface ImgListItem{
  takePhotoList: string[];
}