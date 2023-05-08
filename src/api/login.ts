import request from '@/utils/request'

const AdoptApi = '/adopt-api';
/**
 * @description 用户登录
 * @param {API.Global.LoginPayload}  
 * @return {Promise<*>}
 */
export function login(data: API.Global.LoginPayload) {
  return request({
    url: `${AdoptApi}/admin/Authorize/Login`,
    method: 'post',
    data,
  });
}

/**
 * @description 获取系统基本信息
 * @return {Promise<*>}
 */
export function getSystemInfo(data:any) {
  return request({
    url: `${AdoptApi}/CommService/SysInfo`,
    method: 'post',
    data,
  });
}