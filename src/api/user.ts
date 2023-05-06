import request from '@/utils/request';


/**
 * @description 重置密码
 * @param data 
 * @returns 
 */
export function ResetPwd(data: API.Global.ResetPwd) {
  return request({
    url: 'admin/UserCenter/SetPwd ',
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

