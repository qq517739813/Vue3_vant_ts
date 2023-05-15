export interface BaseItem {
  totalRecord: number;
  totalPage: number;
  page: number;
  pageSize: number;
}
interface main extends BaseItem {
  dataList: mainItem[]
}

export interface mainItem {
  creationTime: string;
  creatorId: any;
  id: string;
  iotAccount: string;
  iotPwd: string;
  mainIntro: string;
  mainName: string;
  mainType: number | string;
  status: number | string;
  tenantId: string;
  tenantName: string;

}
interface field extends BaseItem {
  dataList: fieldItem[]
}
interface FieldItem {
  id: string;
  tenantId: string;
  tenantName: string;
  mainId: string;
  mainName: string;
  fieldName: string;
  area: number;
  position: string;
  elevation: number;
  customer: string;
  customerName: string;
  manager: string;
  managerName: string;
  devList: string[];
  cropIds: string[];
  cropList: string[];
  actList: any[];
  isActive: boolean;
  fieldIntro: string;
}

interface acttype extends BaseItem {
  dataList: acttypeItem[]
}
interface acttypeItem {
  actionName: string;
  enabled: boolean;
  id: string;
  mainId: string;
  mainName: string;
  tenantId: string;
  tenantName: string;
}

// 主体农场
export interface MainInfoItem {
  mainInfo: main | any;
}
// 工作地块
export interface fieldInfoItem {
  fieldInfo: field | any;
}
// 农事类型
export interface acttypeInfoItem {
  acttypeInfo: acttype | any;
}


interface FarmItem {
  mainName: string; // 农事主体
  creationTime: string; // 农事时间
  creatorId: string; // 农事负责人id
  creator: string; // 农事负责人
  actType: string; // 农事类型
  fieldName: string; // 工作地块
  tenantId: string;
  mainId: string;
  fieldId: string; // 地块id
  typeId: string; // 农事类型id
  actName: string; // 农事名称
  actIntro: string; // 农事内容
  imgPath: string; // 图片路径
  imgs: string[]; // 图片地址为imgPath+imgs(每一项)
  id: string; // 农事记录id(农事活动)
}

// 农事记录
export interface FarmRecordItem {
  farmInfo: FarmRecordBaseItem | any;
}

export interface FarmRecordBaseItem {
  totalRecord: number;
  totalPage: number;
  pageSize: number;
  page: number;
  dataList: FarmItem[];
}


// 投入品列表

export interface goodsInfoItem {
  goodsinfo: goods | any;
}

interface goods extends BaseItem {
  dataList: goodsItem[]
}

interface goodsItem {
  mainName: string;
  creationTime: string;
  creatorId: any;
  tenantId: string;
  mainId: string;
  goodsName: string;
  code: string;
  stockNum: number;
  unit: string;
  isRecycle: boolean;
  enabled: boolean;
  id: string;

}

// 活动数据
export interface actInfoItem {
  actinfo: act | any
}

interface act {
  id: string;
  mainId: string;
  fieldId: string;
  typeId: string;
  actName: string;
  actIntro: string;
  imgPath: string;
  imgs: string[];
  tenantId: string;
}