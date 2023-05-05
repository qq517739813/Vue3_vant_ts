import request from '@/utils/request';

/**
 * @description 重置头像
 * @param data 
 * @returns 
 */

export function SetUserHead(data: any) {
  return request({
    url: 'UserService/SetUserHead',
    method: 'post',
    data
  })
}
/**
 * @description 重置昵称
 * @param data 
 * @returns 
 */
export function ResetName(data: any) {
  return request({
    url: 'UserService/ResetName',
    method: 'post',
    data
  })
}

/**
 * @description 重置密码
 * @param data 
 * @returns 
 */
export function ResetPwd(data: any) {
  return request({
    url: 'UserService/ResetPwd ',
    method: 'post',
    data
  })
}



/**
 * @description 重置手机
 * @param data 
 * @returns 
 */
export function ResetPhone(data: any) {
  return request({
    url: 'UserService/ResetPhone ',
    method: 'post',
    data
  })
}

/**
 * @description 重置邮箱
 * @param data 
 * @returns 
 */
export function ResetEmail(data: any) {
  return request({
    url: 'UserService/ResetEmail  ',
    method: 'post',
    data
  })
}
