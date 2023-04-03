interface CommonItem {
  ModuleCode: string;
  ModuleId: string;
  ModuleName: string;
  ModulePath?:string;
}

export interface UserEquipsItem {
  UserEquips: CommonItem[];
}
