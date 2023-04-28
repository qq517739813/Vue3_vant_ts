export interface CommonItem {
  Id: string | number;
  ProId: string;
  DevId: string;
  MsgType: string | number;
  MsgTitle: string;
  MsgContent: string;
  Ctime: string;
}
export interface WarnMsgBaseItem {
    Condition: any;
    DataList: CommonItem[] | any;
    Page: number;
    PageSize: number;
    TotalPage: number;
    TotalRecord: number;
}
export interface WarnMsgItem {
  warnMsgInfo: WarnMsgBaseItem;
}
