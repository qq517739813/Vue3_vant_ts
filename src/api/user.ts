import request from '@/utils/request';

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