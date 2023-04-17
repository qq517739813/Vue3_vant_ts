export interface LineChartBaseItem {
  Ah: number;  // 环境湿度/空气湿度
  At: number;  // 环境温度/空气温度
  Ctime: string; // 时间
  Id: number | string;
  InnerAt: number;  // 加热仓温度
}

export interface LineChartItem {
  pestList: LineChartBaseItem[];
}

export interface ImglistItem {
  pestImgsList:string[];
}