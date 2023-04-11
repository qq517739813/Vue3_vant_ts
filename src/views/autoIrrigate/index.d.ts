export interface Item {
  ActStatus?: number | string;
  ControlPwd: string;
  CtrlId?: string;
  DevAddr?: string;
  DevId: string;
  DevName?: string;
  Electricity?: string;
  ExpIcon?: string;
  FlowVal?: number | string;
  GateWayNo?: string;
  Gname?: string;
  GroupId?: string;
  HeartbeatTime?: string;
  Icon?: string;
  IconPath?: string;
  Ip?: string;
  Lat?: string;
  Lng?: string;
  NetMode?: string;
  OffIcon?: string;
  OnIcon?: string;
  Online?: string;
  Port?: number | string;
  PowerMode?: string;
  Signal?: string;
  SleepIcon?: string;
  Status?: number | string;
  Topic?: string;
  TypeCode?: string;
  TypeName?: string;
  ValveAddr?: number | string;
  Voltage?: string;
}

export interface IrrigateListItem {
  IrrigateList?: Item[];
}
export interface IrrigateInfoItem {
  IrrigateInfo: Item;
}
