import request from '@/utils/request';

/**
 * @description 获取阀门(灌溉)列表（用户）
 * @param {API.Global.AutoIrrigatePayload}
 * @return {Promise<*>}
 */
export function GetIrrigateList(data: API.Global.AutoIrrigatePayload) {
  return request({
    url: '/IrrigationService/getValveListByUser',
    method: 'post',
    data,
  });
}
/**
 * @description 发送控制命令（阀门）(灌溉阀门、智能灌溉)(控制器、智能控制)
 * @param {API.Global.ControlCommandPayload}
 * @return {Promise<*>}
 */
export function SendControlCommand(data: API.Global.ControlCommandPayload) {
  return request({
    url: '/IrrigationService/sendCtrolCommand',
    method: 'post',
    data,
  });
}
