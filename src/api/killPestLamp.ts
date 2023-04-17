import request from '@/utils/request';


/**
 * @description 获取历史采集数据
 * @param {API.Global.HistoryDataPayload}
 * @return {Promise<*>}
 */
export function getKillPestDataList(params: API.Global.HistoryDataPayload) {
  return request({
    url: '/PestService/KillPestData',
    method: 'post',
    data: params,
  });
}
