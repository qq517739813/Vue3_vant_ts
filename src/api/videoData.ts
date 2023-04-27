import request from '@/utils/request';

/**
 * @description 获取摄像机列表切换列表
 * @param {API.Global.CommonPayload}
 * @return {Promise<*>}
 */
export function getVideoDataList(data: API.Global.CommonPayload) {
  return request({
    url: '/DataService/GetVideoList',
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
    url: '/DataService/GetVideoData',
    method: 'post',
    data,
  });
}
/**
 * @description 获取摄像机历史图片
 * @param {API.Global.HistoryDataPayload}
 * @return {Promise<*>}
 */
export function getVideoImgList(data: API.Global.HistoryDataPayload) {
  return request({
    url: '/DataService/GetVideoImg',
    method: 'post',
    data,
  });
}
/**
 * @description 摄像机移动
 * @param {API.Global.VideoMovePayload} // 'up'上  'down'下  'left'左  'right'右  'zoomin' 拉近  'zoomout'拉远
 * @return {Promise<*>}
 */
export function optVideoMove(data: API.Global.VideoMovePayload) {
  return request({
    url: '/DataService/VideoMove',
    method: 'post',
    data,
  });
}

