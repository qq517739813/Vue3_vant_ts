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

/**
 * @description 保存新增活动
 *  @param {<>} 
 * @return {Promise<*>}
 */
export function actSave(data: any) {
  return request({
    url: `${AdoptApi}/admin/act/save`,
    method: 'post',
    data,
  });
}

/**
 * @description 获取投入品信息
 *  @param {<>} 
 * @return {Promise<*>}
 */
export function getActGoodsList(data: API.Global.FieldPayLoad) {
  return request({
    url: `${AdoptApi}/admin/act/getActGoodsList`,
    method: 'post',
    data,
  });
}



/**
 * @description 获取投入品列表
 *  @param {<>} 
 * @return {Promise<*>}
 */
export function goodsgetList(data: API.Global.FieldPayLoad) {
  return request({
    url: `${AdoptApi}/admin/goods/getList`,
    method: 'post',
    data,
  });
}

/**
 * @description 更新活动投入品
 *  @param {<>} 
 * @return {Promise<*>}
 */
export function saveActGoods(data: any) {
  return request({
    url: `${AdoptApi}/admin/act/saveActGoods`,
    method: 'post',
    data,
  });
}

/**
 * @description 获取活动数据
 *  @param {<>} 
 * @return {Promise<*>}
 */
export function getact(data: any) {
  return request({
    url: `${AdoptApi}/admin/act/get`,
    method: 'post',
    data,
  });
}



/**
 * @description 删除活动数据
 *  @param {<>} 
 * @return {Promise<*>}
 */
export function deleteact(data: any) {
  return request({
    url: `${AdoptApi}/admin/act/delete`,
    method: 'post',
    data,
  });
}

/**
 * @description 删除投入品
 *  @param {<>} 
 * @return {Promise<*>}
 */
export function deleteActGoods(data: any) {
  return request({
    url: `${AdoptApi}/admin/act/deleteActGoods`,
    method: 'post',
    data,
  });
}