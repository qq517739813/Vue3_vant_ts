import request from '@/utils/request';

/**
 * @description 获取表格统计分析(数据分析)
 * @param {API.Global.AnalysisDataPayload}
 * @return {Promise<*>}
 */
export function GetAnalysisTableData(data: API.Global.AnalysisDataPayload) {
  return request({
    url: '/AnalysisService/TableAnalysis',
    method: 'post',
    data,
  });
}
/**
 * @description 获取图形统计分析(数据分析)
 * @param {API.Global.AnalysisDataPayload}
 * @return {Promise<*>}
 */
export function GetAnalysisChartData(data: API.Global.AnalysisDataPayload) {
  return request({
    url: '/AnalysisService/ChartAnalysis',
    method: 'post',
    data,
  });
}
/**
 * @description 获取图形分析切换数据参数(数据分析)
 * @param {API.Global.AnalysisDataPayload}
 * @return {Promise<*>}
 */
export function GetChartDevParam(data: API.Global.AnalysisDataPayload) {
  return request({
    url: '/AnalysisService/GetDevParam',
    method: 'post',
    data,
  });
}
/**
 * @description 获取对比分析(数据分析)
 * @param {API.Global.AnalysisDataPayload}
 * @return {Promise<*>}
 */
export function GetAnalysisQoqData(data: API.Global.AnalysisDataPayload) {
  return request({
    url: '/AnalysisService/QoqData',
    method: 'post',
    data,
  });
}
