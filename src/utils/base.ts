import MonitorData from '@/assets/MonitorData.svg';
import VideoData from '@/assets/VideoData.svg';
import PestLamp from '@/assets/PestLamp.svg';
import KillPestLamp from '@/assets/KillPestLamp.svg';
import AutoIrrigate from '@/assets/AutoIrrigate.svg';
import AutoControl from '@/assets/AutoControl.svg';
import AnalyzeData from '@/assets/AnalyzeData.svg';
import WarnData from '@/assets/WarnData.svg';
import Fertilizer from '@/assets/Fertilizer.svg';
import WarnMsgData from '@/assets/WarnMsgData.svg';

export interface EquipItem {
  ModuleCode: string;
}
export const getEquipImg = (param: EquipItem) => {
  switch (param.ModuleCode) {
    // 监测数据
    case 'MonitorData':
      return MonitorData;
    // 视频直播
    case 'VideoData':
      return VideoData;
    // 虫情测报
    case 'PestLamp':
      return PestLamp;
    // 虫情监测
    case 'KillPestLamp':
      return KillPestLamp;
    // 智能灌溉
    case 'AutoIrrigate':
      return AutoIrrigate;
    // 智能控制
    case 'AutoControl':
      return AutoControl;
    // 数据分析
    case 'AnalyzeData':
      return AnalyzeData;
    // 预警统计
    case 'WarnData':
      return WarnData;
    // 预警通知
    case 'WarnMsgData':
      return WarnMsgData;
    // 水肥控制
    case 'Fertilizer':
      return Fertilizer;
    default:
      break;
  }
};