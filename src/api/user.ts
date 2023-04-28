import request from '@/utils/request';

/**
 * @description 版本更新记录
 * @param {API.Global.VersionManagePayload}
 * @return {Promise<*>}
 */
export function getVersionList(data: API.Global.VersionManagePayload) {
  return request({
    url: '/AppService/AppUpdateList',
    method: 'post',
    data,
  });
}

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

/* ****** 报警设置 ***** */

/**
 * @description 获取报警时间
 * @param data 
 * @returns 
 */

export function GetWarnTime(data: any) {
  return request({
    url: 'WarnService/GetWarnTime',
    method: 'post',
    data
  })
}


/**
 * @description 获取报警方式
 * @param data 
 * @returns 
 */

export function GetWarnAccount(data: any) {
  return request({
    url: 'WarnService/GetWarnAccount',
    method: 'post',
    data
  })
}

/**
 * @description 报警时间配置
 * @param data 
 * @returns 
 */

export function WarnTimeConfig(params: any) {
  return request({
    url: 'WarnService/WarnTimeConfig',
    method: 'post',
    data: params,
  })
}

/**
 * @description 报警方式
 * @param {API.Global.WarnAccount }
 * @returns {Promise<*>}
 */

export function WarnAccount(params: API.Global.WarnAccount) {
  return request({
    url: 'WarnService/WarnAccount',
    method: 'post',
    data: params,
  })
}
/**
 * @description 删除报警方式
 * @param {API.Global.WarnAccount }
 * @returns {Promise<*>}
 */

 export function DelWarnAccount(params: API.Global.WarnAccount) {
  return request({
    url: 'WarnService/DelWarnAccount',
    method: 'post',
    data: params,
  })
}