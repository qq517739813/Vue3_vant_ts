import request from '@/utils/request';

/**
 * @description 获取设备列表
 * @param {API.Global.DevSummaryPayload}
 * @return {Promise<*>}
 */
export function GetEquipmentsList(params: API.Global.CommonPayload) {
  return request({
    url: '/UserService/GetDevList',
    method: 'post',
    data: params,
  });
}
