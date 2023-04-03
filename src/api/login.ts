import request from '@/utils/request'

/**
 * @description 用户登录
 * @param {API.Global.LoginPayload}  
 * @return {Promise<*>}
 */
export function login(params: API.Global.LoginPayload) {
  return request({
    url: '/UserService/UserLogin',
    method: 'post',
    data: params,
  });
}

/**
 * @description 获取系统基本信息
 * @return {Promise<*>}
 */
export function getSystemInfo(params:any) {
  return request({
    url: '/CommService/SysInfo',
    method: 'post',
    data: params,
  });
}