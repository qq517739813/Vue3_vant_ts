import request from '@/utils/request';

/**
 * @description 获取控制器通道(智能设备列表)
 * @param {API.Global.ControlParamPayload}
 * @return {Promise<*>}
 */
export function GetControlParamList(params: API.Global.ControlParamPayload) {
  return request({
    url: '/ControllerService/ControlParam',
    method: 'post',
    data: params,
  });
}
