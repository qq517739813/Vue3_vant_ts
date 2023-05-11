import request from '@/utils/request';

const AdoptApi = '/adopt-api';
const FarmApi = '/farmupload-api';
/**
 * @description 获取添加农事活动农场主体
 *  @param {API.Global.IsAll} 
 * @return {Promise<*>}
 */
export function getMainGetList(data: API.Global.IsAll) {
  return request({
    url: `${AdoptApi}/admin/main/getList`,
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
    url: `${AdoptApi}/admin/actType/getTypeList`,
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
    url: `${AdoptApi}/admin/field/getList`,
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
    url: `${FarmApi}/admin/file/uploadPhoto`,
    headers:{"Content-Type":"multipart/form-data"},
    method: 'post',
    data,
  });
}
