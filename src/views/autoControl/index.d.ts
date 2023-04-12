export interface ChannelItem {
  CtrlId: string;
  CtrlAddr?: string;
  CtrlName?: string;
  ChannelNo?: string | number;
  ChannelName?: string;
  R_ChannelNo?: string | number;
  R_ChannelName?: string;
  OffName?: string;
  IsTurn?: boolean; // 是否反转
  Status?: string | number;
  Icon?: string;
  OffIcon?: string;
  IsOnline?: boolean; // 是否在线
  CtrlPwd: string;
}

export interface ControlItem {
  DevId: string;
  DevName?: string;
  CommMode?: string;
  Topic?: string;
  Ip?: string;
  Port?: string | number;
  ChannelList: ChannelItem[];
}


export interface ControlInfoItem {
  controlInfo: ControlItem;
}
export interface ChannelInfoItem {
  channelInfo: ChannelItem;
}

