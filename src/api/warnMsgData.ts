import request from '@/utils/request';

/**
 * @description 获取异常数据(预警通知)
 * @param {API.Global.WarnMsgPayload}
 * @return {Promise<*>}
 */
export function GetWarnMsgList(params: API.Global.WarnMsgPayload) {
  return request({
    url: '/WarnService/DataExpMsg',
    method: 'post',
    data: params,
  });
}
