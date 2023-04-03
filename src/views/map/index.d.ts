interface Item {
  DevAddr?: string;
  TypeCode?: string;
  IconPath?: string;
  Icon?: string;
  OnIcon?: string;
  OffIcon?: string;
  SleepIcon?: string;
  ExpIcon?: string;
  FunCode?: string[];
  Gid?: string;
  Gname?: string;
  DevId?: string;
  DevName?: string;
  DevIcon?: string;
  Status?: string | number;
  Online?: string;
  Lng?: string;
  Lat?: string;
}

export interface DevListtem {
  DevList: Item;
}
