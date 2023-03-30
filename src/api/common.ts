import request from '@/utils/request';

/**
 * @description 设备汇总
 * @param {API.Global.DevSummaryPayload}
 * @return {Promise<*>}
 */
export function devSummary(params: API.Global.DevSummaryPayload) {
  return request({
    url: '/UserService/DevSummary',
    method: 'post',
    data: params,
  });
}
/**
 * @description 获取用户设备模块
 * @param {API.Global.UserEquipsPayload}
 * @return {Promise<*>}
 */
export function GetUserEquips(params: API.Global.UserEquipsPayload) {
  return request({
    url: '/UserService/GetFuncMenu',
    method: 'post',
    data: params,
  });
}
