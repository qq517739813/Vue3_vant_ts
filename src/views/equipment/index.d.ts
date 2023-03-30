interface Item {
  ModuleCode: string;
  ModuleId: string;
  ModuleName: string;
  ModulePath?:string;
}

export interface UserEquipsItem {
  UserEquips: Item[];
}
