import request from '@/utils/request';

/**
 * @description 获取用户设备模块
 * @param {API.Global.UserEquipsPayload}
 * @return {Promise<*>}
 */
export function GetUserEquips(params: API.Global.CommonPayload) {
  return request({
    url: '/UserService/GetFuncMenu',
    method: 'post',
    data: params,
  });
}
