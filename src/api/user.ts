import request from '@/utils/request';

const AdoptApi = '/adopt-api';
/**
 * @description 获取用户信息
 *  @param {API.Global.UserPayLoad}
 * @return {Promise<*>}
 */
export function getUserInfo(data: API.Global.UserPayLoad) {
  return request({
    url: `${AdoptApi}/admin/UserCenter/get`,
    method: 'post',
    data,
  });
}
/**
 * @description 重置密码
 * @param data
 * @returns
 */
export function ResetPwd(data: API.Global.ResetPwd) {
  return request({
    url: `${AdoptApi}admin/UserCenter/SetPwd`,
    method: 'post',
    data,
  });
}

/**
 * @description 重置手机号码
 * @param data 
 * @returns 
 */
export function ResetPhone(data: API.Global.ResetPwd) {
  return request({
    url: `${AdoptApi}admin/UserCenter/SetPhone`,
    method: 'post',
    data,
  });
}

/**
 * @description 重置邮箱
 * @param data
 * @returns
 */
export function Resetemail(data: API.Global.ResetPwd) {
  return request({
    url: `${AdoptApi}admin/UserCenter/SetEmail`,
    method: 'post',
    data,
  });
}
