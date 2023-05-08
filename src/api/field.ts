import request from '@/utils/request';

const AdoptApi = '/adopt-api';
const FarmApi = '/farm-api';
/**
 * @description 获取地块
 *  @param {API.Global.FieldPayLoad}
 * @return {Promise<*>}
 */
export function getField(data: API.Global.FieldPayLoad) {
  return request({
    url: `${AdoptApi}/admin/field/get`,
    method: 'post',
    data,
  });
}
/**
 * @description 获取地块信息摄像头切换列表虫情测报，气象参数，土壤参数列表
 *  @param {API.Global.FieldPayLoad}
 * @return {Promise<*>}
 */
export function getDevListByDevId(data: API.Global.DevListPayload) {
  return request({
    url: `${FarmApi}/DevService/GetDevListByDevId`,
    method: 'post',
    data,
  });
}
/**
 * @description 获取摄像机基本信息
 * @param {API.Global.DevInfoPayload}
 * @return {Promise<*>}
 */
export function getVideoBaseInfo(data: API.Global.DevInfoPayload) {
  return request({
    url: `${FarmApi}/DataService/GetVideoData`,
    method: 'post',
    data,
  });
}
/**
 * @description 获取虫情测报灯监测数据(虫情测报) 时间默认为3天
 * @param {API.Global.HistoryDataPayload}
 * @return {Promise<*>}
 */
export function getPestDataList(data: API.Global.HistoryDataPayload) {
  return request({
    url: `${FarmApi}/PestService/PestData`,
    method: 'post',
    data,
  });
}
/**
 * @description 获取虫情测报灯图片(虫情测报) 时间为1天
 * @param {API.Global.HistoryDataPayload}
 * @return {Promise<*>}
 */
export function getPestImagesList(data: API.Global.HistoryDataPayload) {
  return request({
    url: `${FarmApi}/PestService/PestImages`,
    method: 'post',
    data,
  });
}
/**
 * @description 获取设备实时采集数据(气象参数和土壤参数)
 * @param {API.Global.DevInfoPayload}
 * @return {Promise<*>}
 */
export function GetRealDataList(data: API.Global.DevInfoPayload) {
  return request({
    url: `${FarmApi}/DataService/GetRealData`,
    method: 'post',
    data,
  });
}
/**
 * @description 获取摄像机历史图片
 * @param {API.Global.HistoryDataPayload} 时间为1天
 * @return {Promise<*>}
 */
export function getVideoImgList(data: API.Global.HistoryDataPayload) {
  return request({
    url: `${FarmApi}/DataService/GetVideoImg`,
    method: 'post',
    data,
  });
}