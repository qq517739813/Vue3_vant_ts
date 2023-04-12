import { DevInfoBaseItem } from '@/components/index';

export interface FertilizerDataItem {
  ParamAddr: string | number;
  ParamIcon: string;
  ParamName: string;
  Val: string | number;
  Unit: string;
}

export interface FertilizerControlItem {
  CtrlId: string;
  ParamAddr: string | number;
  ParamIcon: string;
  ParamName: string;
  Val: string | number;
}

export interface Item extends DevInfoBaseItem {
  Param: FertilizerDataItem[];
  CtrlParam: FertilizerControlItem[];
  [propName: string]: any;
}

export interface FertilizerInfoItem {
  fertilizerInfo: Item;
}

export interface FertilizerControlInfoItem {
  controlInfo: FertilizerControlItem;
}
