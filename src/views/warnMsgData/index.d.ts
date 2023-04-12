
export interface CommonItem {
    Id: string | number;
    ProId: string;
    DevId: string;
    MsgType: string | number;
    MsgTitle: string;
    MsgContent: string;
    Ctime: string;
}
export interface WarnMsgItem {
  warnMsgInfo: {
    Condition?: any;
    DataList?: CommonItem[];
    Page?: number;
    PageSize?: ?number;
    TotalPage?: number;
    TotalRecord?: number;
  };
}

