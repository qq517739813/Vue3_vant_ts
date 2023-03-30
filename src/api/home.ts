import request from '@/utils/request';

/**
 * @description 设备汇总
 * @param {API.Global.DevSummaryPayload}
 * @return {Promise<*>}
 */
export function devSummary(params: API.Global.CommonPayload) {
  return request({
    url: '/UserService/DevSummary',
    method: 'post',
    data: params,
  });
}
