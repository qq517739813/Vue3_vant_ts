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

