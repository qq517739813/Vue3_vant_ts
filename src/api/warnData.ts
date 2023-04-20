import request from '@/utils/request';

/**
 * @description 获取设备预警汇总数据(预警统计柱状图)
 * @param {API.Global.WarnDataPayload}
 * @return {Promise<*>}
 */
export function GetWarnDataList(data: API.Global.WarnDataPayload) {
  return request({
    url: '/WarnService/WarnData',
    method: 'post',
    data,
  });
}
/**
 * @description 获取参数预警表格数据(预警统计)
 * @param {API.Global.WarnDataPayload}
 * @return {Promise<*>}
 */
export function GetWarnTableDataList(data: API.Global.WarnDataPayload) {
  return request({
    url: '/WarnService/WarnTableData',
    method: 'post',
    data,
  });
}
/**
 * @description 获取参数预警曲线数据折线图(预警统计)
 * @param {API.Global.WarnDataPayload}
 * @return {Promise<*>}
 */
export function GetWarnLineDataList(data: API.Global.WarnDataPayload) {
  return request({
    url: '/WarnService/WarnLineData',
    method: 'post',
    data,
  });
}
