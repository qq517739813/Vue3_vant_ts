import request from '@/utils/request';

/**
 * @description 获取杀虫灯监测数据(虫情监测)
 * @param {API.Global.HistoryDataPayload}
 * @return {Promise<*>}
 */
export function getKillPestDataList(data: API.Global.HistoryDataPayload) {
  return request({
    url: '/PestService/KillPestData',
    method: 'post',
    data,
  });
}

/**
 * @description 获取虫情测报灯监测数据(虫情测报)
 * @param {API.Global.HistoryDataPayload}
 * @return {Promise<*>}
 */
export function getPestDataList(data: API.Global.HistoryDataPayload) {
  return request({
    url: '/PestService/PestData',
    method: 'post',
    data,
  });
}
/**
 * @description 获取虫情测报灯图片(虫情测报)
 * @param {API.Global.HistoryDataPayload}
 * @return {Promise<*>}
 */
export function getPestImagesList(data: API.Global.HistoryDataPayload) {
  return request({
    url: '/PestService/PestImages',
    method: 'post',
    data,
  });
}
