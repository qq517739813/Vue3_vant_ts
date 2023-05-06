export interface AdoptionInfoBaseItem {
  customerNum?: number; // 认养人
  fieldArea?: number; // 占地面积
  fieldNum?: number; // 现有地
  usedFieldNum?: number; // 认养地块
  userName: string; // 农场主(权限为worker为农事负责人,权限为customer为认养人)
  workerNum?: number; // 员工
  cropData?: string; // 当前作物
  farmerData?: string; // 权限不为farmer时为农场主
  fieldData?: string; // 种植地块
  managerData?: string; // 权限为customer为农事负责人
}
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
// 认养信息
export interface AdoptionInfoItem {
  adoptInfo: AdoptionInfoBaseItem | any;
}
// 地块信息
export interface FieldInfoItem {
  fieldInfo: FieldInfoBaseItem | any;
}
