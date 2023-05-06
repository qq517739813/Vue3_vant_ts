import request from '@/utils/request';

/**
 * @description 获取用户设备
 * @param {API.Global.CommonPayload}
 * @return {Promise<*>}
 */
export function GetUserEquips(data: API.Global.CommonPayload) {
  return request({
    url: '/UserService/GetFuncMenu',
    method: 'post',
    data,
  });
}
/**
 * @description 获取设备列表
 * @param {API.Global.CommonPayload}
 * @return {Promise<*>}
 */
export function GetEquipmentsList(data: API.Global.CommonPayload) {
  return request({
    url: '/UserService/GetDevList',
    method: 'post',
    data,
  });
}


