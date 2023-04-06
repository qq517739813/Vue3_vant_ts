import request from '@/utils/request';

/**
 * @description 获取用户基本信息
 * @param {API.Global.DevSummaryPayload}
 * @return {Promise<*>}
 */
export function getUserInfo(params: API.Global.CommonPayload) {
  return request({
    url: '/CommService/SysInfo',
    method: 'post',
    data: params,
  });
}

/**
 * @description 版本更新记录
 * @param {API.Global.VersionManagePayload}
 * @return {Promise<*>}
 */
export function getVersionList(params: API.Global.VersionManagePayload) {
  return request({
    url: '/AppService/AppUpdateList',
    method: 'post',
    data: params,
  });
}