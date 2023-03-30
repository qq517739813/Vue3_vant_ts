import request from '@/utils/request';

/**
 * @description 用户基本信息
 * @param {API.Global.DevSummaryPayload}
 * @return {Promise<*>}
 */
export function getUserInfo(params: API.Global.CommonPayload) {
  return request({
    url: '/CommService/SysInfo',
    method: 'post',
    data: params,
  });
}
