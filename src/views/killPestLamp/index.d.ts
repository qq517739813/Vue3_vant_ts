export interface LineChartBaseItem {
  ChargeVoltage: number; 
  CellVoltage: number; // 电池电压
  At: number; // 环境温度
  Ah: number; // 环境湿度
  Num: number; // 最大最小 , 电击次数
  Ctime: string; // 时间
}

export interface LineChartItem {
  pestList: LineChartBaseItem[];
}
