export interface baseItem {
  ParamCode: string | any;
  ParamId: string; // 参数id
  ParamName: string; // 参数名字
  ParamUnit: string | any; // 参数单位
}
export interface DataItem {
  Num: number; // 数量
  Ctime: string; // 报警时间
}
export interface barGraphBaseItem extends baseItem {
  AllNum: number; // 总数
  DevId: string; // 设备id
  DevName?: string | any; // 设备名称
  ParamIcon: string; // 参数图片
}
export interface lineBaseItem extends baseItem {
  Datas: DataItem[];
  ParamIcon: string; // 参数图片
}
export interface TableBaseItem extends baseItem {
  CorrVal: number; 
  Ctime: string; // 报警时间
  DevId: string; // 设备id
  DevName: string; // 设备名称
  GroupName?: string | any;
  Id?: string | any;
  MaxVal: number; // 最大值
  MinVal: number; // 最小值
  ParamVal: number; // 异常数据
}
// 柱状图
export interface barGraphListItem {
  barGraphList: barGraphBaseItem[];
}
// 折线图
export interface lineChartListItem {
  lineChartList: lineBaseItem[];
}
// 表格
export interface TableListItem {
  Page: number;
  PageSize: number;
  RecordNum: number;
  tableDataList: TableBaseItem[];
}
