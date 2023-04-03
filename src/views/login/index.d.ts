export interface LoginItem {
  LoginName: string;
  LoginPwd: string;
}

interface BaseItem {
  Builders?: string;
  CompanyAddr?: string;
  CompanyIntro?: string;
  CompanyName?: ?string;
  Email?: string;
  EnSysName?: string;
  LinkUrl?: string;
  LoginBg?: string;
  QQ?: string;
  ServerIp?: string;
  ServicePort?: string;
  Supporter?: string;
  SysCode?: string;
  SysLogo?: string;
  SysName?: string;
  SysType?: number;
  TelPhone?: string;
  WebSite?: string;
}
export interface SystemItem {
  systemBaseInfo: BaseItem;
}