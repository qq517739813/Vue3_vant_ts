export interface RealDataItem {
  ParamUnit: string;
  ParamIcon: string;
  ParamCode: string;
  ParamVal: string | number;
  MaxVal: string | number;
  MinVal: string | number;
  Ctime: string;
  DevId?: string;
  DevName?: string;
  ParamId: string;
  ParamName: string;
}

export interface RealListItem {
  realList: RealDataItem[];
}