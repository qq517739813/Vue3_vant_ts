import request from '@/utils/request';

/**
 * @description 获取控制器通道(智能设备列表)
 * @param {API.Global.ControlParamPayload}
 * @return {Promise<*>}
 */
export function GetControlParamList(params: API.Global.ControlParamPayload) {
  return request({
    url: '/ControllerService/ControlParam',
    method: 'post',
    data: params,
  });
}

/**
 * @description 获取定时控制列表
 * @param {API.Global.CtrlID} 
 * @return {Promise<*>}
 */

export function GetTimerCtrolList(params: API.Global.CtrlID) {
  return request({
    url: 'ControllerService/TimerCtrolList',
    method: 'post',
    data: params,
  })
}

/**
 * @description 获取参数列表
 * @param {API.Global.CtrlID} 
 * @return {Promise<*>}
 */

export function GetParamCtrolList(params: API.Global.CtrlID) {
  return request({
    url: 'ControllerService/ParamCtrolList',
    method: 'post',
    data: params,
  })
}
/**
 * @description 获取循环控制信息
 * @param {API.Global.CtrlID} 
 * @return {Promise<*>}
 */

export function GetLoopCtrl(params: API.Global.CtrlID) {
  return request({
    url: 'ControllerService/LoopCtrl',
    method: 'post',
    data: params,
  })
}

/**
 * @description 配置定时
 * @param {API.Global.SetTimerCtrl} 
 * @return {Promise<*>}
 */

export function SetTimerCtrl(params: API.Global.SetTimerCtrl) {
  return request({
    url: 'ControllerService/SetTimerCtrl',
    method: 'post',
    data: params,
  })
}

/**
 * @description 删除定时控制
 * @param {API.Global.DevInfoPayload} 
 * @return {Promise<*>}
 */

 export function DelTimerCtrl(params: API.Global.DevInfoPayload) {
  return request({
    url: 'ControllerService/DelTimerCtrl',
    method: 'post',
    data: params,
  })
}

/**
 * @description 配置参数
 * @param {API.Global.SetTimerCtrl} 
 * @return {Promise<*>}
 */

 export function SetParamCtrl(params: API.Global.SetParamCtrl) {
  return request({
    url: 'ControllerService/SetParamCtrl',
    method: 'post',
    data: params,
  })
}

/**
 * @description 删除参数控制
 * @param {API.Global.DevInfoPayload} 
 * @return {Promise<*>}
 */

 export function DelParamCtrl(params: API.Global.DevInfoPayload) {
  return request({
    url: 'ControllerService/DelParamCtrl',
    method: 'post',
    data: params,
  })
}

/**
 * @description 配置循环
 * @param {API.Global.SetLoopCtrl} 
 * @return {Promise<*>}
 */

 export function SetLoopCtrl(params: API.Global.SetLoopCtrl) {
  return request({
    url: 'ControllerService/SetLoopCtrl',
    method: 'post',
    data: params,
  })
}