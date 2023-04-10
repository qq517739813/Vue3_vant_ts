export interface DevListBaseItem {
  DevAddr?: string;
  DevIcon?: string;
  DevId: string;
  DevName?: string;
  ExpIcon?: string;
  FunCode?: string[];
  Gid?: string;
  Gname?: string;
  Icon?: string;
  IconPath?: string;
  Lat?: string;
  Lng?: string;
  OffIcon?: string;
  OnIcon?: string;
  Online?: string;
  SleepIcon?: string;
  Status?: number | string;
  TypeCode?: string;
}
export interface DevInfoBaseItem {
  ControlPwd?: string;
  DevAddr?: string;
  DevIcon?: string;
  DevId?: string;
  DevName?: string;
  ExpIcon?: string;
  Gid?: string;
  Gname?: string;
  HeartBeat?: string;
  Icon?: string;
  IconPath?: string;
  Lat?: string;
  Lng?: string;
  NetMode?: string;
  OffIcon?: string;
  OnIcon?: string;
  Online?: string;
  Power?: string;
  Signal?: string;
  SleepIcon?: string;
  Status?: string | number;
  TypeCode?: string;
  Voltage?: string;
}

export interface DevListItem {
  DevList: BaseItem[];
}
export interface DevInfoItem {
  devBaseInfo: DevInfoBaseItem;
}
