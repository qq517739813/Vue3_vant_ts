export interface LineChartItem {
  ParamId: string;
  MaxVal: string | number;
  MinVal: string | number;
  ParamVal: string | number;
  Ctime: string;
}
export interface HistoryItem {
  ParamId: string;
  ParamCode: string;
  ParamName: string;
  ParamUnit: string;
  MaxVal: string | number;
  MinVal: string | number;
  ParamIcon: string;
  MonitorList: LineChartItem[];
}

export interface HistoryDataItem {
    historyList: HistoryItem[];
}
