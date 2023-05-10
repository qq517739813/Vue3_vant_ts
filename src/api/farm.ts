import request from '@/utils/request';

/**
 * @description 获取添加农事活动农场主体
 *  @param {API.Global.IsAll} 
 * @return {Promise<*>}
 */
export function getMainGetList(data: API.Global.IsAll) {
  return request({
    url: '/admin/main/getList',
    method: 'post',
    data,
  });
}


/**
 * @description 获取添加农事活动农事地块
 *  @param {API.Global.IsAll} 
 * @return {Promise<*>}
 */
export function getTypeList(data: API.Global.IsAll) {
  return request({
    url: '/admin/actType/getTypeList',
    method: 'post',
    data,
  });
}


/**
 * @description 获取添加农事活动农事类型
 *  @param {API.Global.IsAll} 
 * @return {Promise<*>}
 */
export function getFieldList(data: API.Global.IsAll) {
  return request({
    url: '/admin/field/getList',
    method: 'post',
    data,
  });
}

/**
 * @description 拍照接口
 *  @param {<>} 
 * @return {Promise<*>}
 */
export function uploadPhoto(data: any) {
  return request({
    url: '/admin/file/uploadPhoto',
    headers:{"Content-Type":"multipart/form-data"},
    method: 'post',
    data,
  });
}
