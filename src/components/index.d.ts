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
export interface DevInfoBaseItem extends DevListBaseItem {
  ControlPwd: string;
  HeartBeat?: string;
  NetMode?: string;
  Power?: string;
  Signal?: string;
  Voltage?: string;
}

export interface DevListItem {
  DevList: BaseItem[];
}
export interface DevInfoItem {
  devBaseInfo: DevInfoBaseItem;
}

export interface DateItem {
  calendar: {
    Bdate: string;
    Edate: string;
  };
}