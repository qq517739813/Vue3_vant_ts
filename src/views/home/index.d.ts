
export interface BaseItem{
  AllNum?: number | string; // 所有
  FaultNum?: number | string; // 异常
  NetExpNum?: number | string;
  OnlineNum?: number | string; // 在线
  OutageNum?: number | string;
  ReadyNum?: number | string; // 待机
  FunCode?: string;
  Icon?: string;
  TypeId?: string;
  TypeName?:string;
}
export interface CommonItem extends BaseItem {
  DevType?: BaseItem[];
}
export interface EchartsDataItem {
  OnlineNum?: string; // 在线
  ReadyNum?: string; // 待机
  FaultNum?: string; // 异常
  value?: number; // 数量
  name?: string; // 名字
}

export interface DevSummaryItem {
  DevSummary: CommonItem;
}
