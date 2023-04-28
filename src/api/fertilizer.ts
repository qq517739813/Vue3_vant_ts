import request from '@/utils/request';

/**
 * @description 获取施肥机状态数据
 * @param {API.Global.FertilizerPayload}
 * @return {Promise<*>}
 */
export function GetFertilizerList(data: API.Global.FertilizerPayload) {
  return request({
    url: '/IrrigationService/getFertilizerData',
    method: 'post',
    data,
  });
}
/**
 * @description 发送施肥机控制命令
 * @param {API.Global.ControlCommandPayload}
 * @return {Promise<*>}
 */
export function SendFertilizerCommand(data: API.Global.ControlCommandPayload) {
  return request({
    url: '/IrrigationService/FertilizerCommand',
    method: 'post',
    data,
  });
}
