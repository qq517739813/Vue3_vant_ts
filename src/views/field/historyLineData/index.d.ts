export interface LineChartItem {
  ParamId: string;
  MaxVal: number;
  MinVal: number;
  ParamVal: number;
  Ctime: string;
}
export interface HistoryItem {
  ParamId: string;
  ParamCode: string;
  ParamName: string;
  ParamUnit: string;
  MaxVal: number;
  MinVal: number;
  ParamIcon: string;
  MonitorList: LineChartItem[];
}

export interface HistoryDataItem {
    historyList: HistoryItem[];
}
export interface EchartsDataItem {
  OnlineNum?: string; // 在线
  ReadyNum?: string; // 待机
  FaultNum?: string; // 异常
  value?: number; // 数量
  name?: string; // 名字
}