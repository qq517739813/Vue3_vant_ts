interface Item {
  AllNum: number | string;
  FaultNum: number | string;
  NetExpNum: number | string;
  OnlineNum: number | string;
  OutageNum: number | string;
  ReadyNum: number | string;
  DevType: any[];
}

export interface DevSummaryItem {
  DevSummary: Item;
}
