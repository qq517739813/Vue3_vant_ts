import request from '@/utils/request';

/**
 * @description 获取用户汇总数据（认养信息）
 *  @param {} 空对象{}
 * @return {Promise<*>}
 */
export function getUserSummaryData(data: any) {
  return request({
    url: '/webApi/UserDataService/UserDataSummary',
    method: 'post',
    data,
  });
}

/**
 * @description 获取地块列表（地块信息）
 *  @param {API.Global.FieldPayLoad}
 * @return {Promise<*>}
 */
export function getFieldList(data: API.Global.FieldPayLoad) {
  return request({
    url: '/admin/field/getList',
    method: 'post',
    data,
  });
}

/**
 * @description 获取农事记录列表（农事活动）
 *  @param {API.Global.FieldPayLoad}
 * @return {Promise<*>}
 */
export function getActList(data: API.Global.FieldPayLoad) {
  return request({
    url: '/admin/act/getList',
    method: 'post',
    data,
  });
}
