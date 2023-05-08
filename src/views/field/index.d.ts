interface FieldItem {
  tenantName: string;
  mainName: string;
  managerName: string; // 工作人员名字
  customerName: string; // 客户名字
  cropIds: string[]; // 当前作物的id
  cropList: string[]; // 当前作物
  devList: string[];
  actList: any[];
  tenantId: string;
  mainId: string;
  fieldName: string; // 当前地块
  manager: string; // 工作人员id
  customer: string; // 客户id
  position: string;
  elevation: number;
  area: number; // 地块面积
  fieldIntro: string;
  isActive: boolean;
  id: string; // 地块id
}
export interface FieldInfoBaseItem {
  totalRecord: number;
  totalPage: number;
  pageSize: number;
  page: number;
  dataList: FieldItem[];
}
// 地块信息
export interface FieldInfoItem {
  fieldInfo: FieldInfoBaseItem | any;
}
