import request from '@/utils/request';

/**
 * @description 获取用户设备
 * @param {API.Global.CommonPayload}
 * @return {Promise<*>}
 */
export function GetUserEquips(params: API.Global.CommonPayload) {
  return request({
    url: '/UserService/GetFuncMenu',
    method: 'post',
    data: params,
  });
}
/**
 * @description 获取设备列表
 * @param {API.Global.CommonPayload}
 * @return {Promise<*>}
 */
export function GetEquipmentsList(params: API.Global.CommonPayload) {
  return request({
    url: '/UserService/GetDevList',
    method: 'post',
    data: params,
  });
}
/**
 * @description 获取设备汇总
 * @param {API.Global.CommonPayload}
 * @return {Promise<*>}
 */
export function devSummary(params: API.Global.CommonPayload) {
  return request({
    url: '/UserService/DevSummary',
    method: 'post',
    data: params,
  });
}
/**
 * @description 获取设备基本信息
 * @param {API.Global.DevInfoPayload}
 * @return {Promise<*>}
 */
export function GetDevInfo(params: API.Global.DevInfoPayload) {
  return request({
    url: '/DataService/GetDevInfo',
    method: 'post',
    data: params,
  });
}
/**
 * @description 获取设备实时采集数据
 * @param {API.Global.DevInfoPayload}
 * @return {Promise<*>}
 */
export function GetRealDataList(params: API.Global.DevInfoPayload) {
  return request({
    url: '/DataService/GetRealData',
    method: 'post',
    data: params,
  });
}