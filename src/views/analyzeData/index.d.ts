export interface CommonItem {
  ParamId: string;
  ParamCode: string | any;
  ParamName: string;
  ParamUnit: string; // 单位
  ParamIcon: string | any;
  NorMaxVal: number; // 范围高
  NorMinVal: number; // 范围低
  MaxVal: number;
  MinVal: number;
  AvgVal?: number;
  ParamVal?: number;
  Ctime: string;
  MonitorList: CommonItem[];
}
export interface DevParamBaseItem {
  DevId: string | any;
  DevName: string | any;
  ParamId: string;
  ParamName: string;
}
export interface MonitorListItem {
  ParamId: string;
  MaxVal: number;
  MinVal: number;
  ParamVal: number;
  Ctime: string;
}
export interface ChartBaseItem extends CommonItem {
  AllNum: number; // 采集总量
  UpNum: number; // 偏高值
  LowNum: number; // 偏低值
  NorNum: number; // 正常值
}
export interface QoqDataBaseItem {
  DevId: string;
  DevName: string;
  ParamId: string;
  ParamCode: string | any;
  ParamName: string;
  ParamUnit: string;
  ParamIcon: string | any;
  NorMaxVal: number;
  NorMinVal: number;
  MonitorList: MonitorListItem[];
}
export interface TableItem {
  analysisTableList: CommonItem[];
}
export interface ChartItem {
  analysisChartList: ChartBaseItem[];
}
export interface QoqDataItem {
  analysisQoqList: QoqDataBaseItem;
}
export interface ParmItem {
  paramsList: DevParamBaseItem[];
}
