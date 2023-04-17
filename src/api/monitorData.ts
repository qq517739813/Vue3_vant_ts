import request from '@/utils/request';

/**
 * @description 获取设备实时采集数据
 * @param {API.Global.DevInfoPayload}
 * @return {Promise<*>}
 */
export function GetRealDataList(data: API.Global.DevInfoPayload) {
  return request({
    url: '/DataService/GetRealData',
    method: 'post',
    data,
  });
}
/**
 * @description 获取历史采集数据
 * @param {API.Global.HistoryDataPayload}
 * @return {Promise<*>}
 */
export function GetHistoryDataList(data: API.Global.HistoryDataPayload) {
  return request({
    url: '/DataService/GetHistoryData',
    method: 'post',
    data,
  });
}
