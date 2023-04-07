export interface BaseItem {
  Id?: number;
  AppName?: string;
  AppCode?: string;
  FileName?: string;
  FileSize?: number;
  UpType?: number;
  Version?: number;
  VersionStr?: string;
  FileUrl?: string;
  Description?: string;
  Ctime?: string;
}

export interface VersionItem {
  versionList?: BaseItem[];
}
