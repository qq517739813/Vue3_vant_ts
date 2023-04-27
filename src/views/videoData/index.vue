<template>
  <div class="videoData">
    <van-nav-bar
      title="视频监控"
      class="title"
      fixed
      :border="false"
      placeholder
      safe-area-inset-top
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #left>
        <van-icon name="arrow-left" size="20" color="#FFFFFF" />
      </template>
      <template #right>
        <van-icon name="sort" size="20" color="#00cc90" style="transform: rotate(90deg)" />
        <span class="head-change">切换</span>
      </template>
    </van-nav-bar>
    <live-video v-if="!loading && videoInfo?.videoBaseInfo" />
    <video-img :imgList="imgList.takePhotoList" v-if="!loading" />
  </div>
  <!-- 设备切换 -->
  <video-switch
    v-model:popup-visbile="showPopup"
    @handele-dev="handClickDev"
    :curentDevId="equipmentId"
    :videoList="videoData.videoList"
  />
</template>

<script lang="ts" setup>
import { onMounted, computed, ref, reactive, provide } from 'vue';
import type { Ref, ComputedRef } from 'vue';
import { useRoute } from 'vue-router';
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { userStore } from '@/store/user';
import { getVideoDataList, getVideoBaseInfo, getVideoImgList } from '@/api/videoData';
import { VideoBaseItem, VideoListItem, VideoInfoItem, ImgListItem } from './index';
import { showLoadingToast, closeToast } from 'vant';
import VideoSwitch from './videoSwitch.vue';
import LiveVideo from './liveVideo.vue';
import VideoImg from './videoImg.vue';
import moment from 'moment';

const route: RouteLocationNormalizedLoaded = useRoute();
const store = userStore();
// 控制显示
const loading: Ref<boolean> = ref(false);
// 切换设备popup弹窗状态
const showPopup: Ref<boolean> = ref(false);
// 切换设备id
const equipmentId: Ref<string> = ref('');
// 摄像机列表
const videoData = reactive<VideoListItem>({ videoList: [] });
// 摄像机信息
const videoInfo: VideoInfoItem = reactive({});
provide('videoInfo', videoInfo);
// 拍摄图片
const imgList = reactive<ImgListItem>({ takePhotoList: [] });
// 路由参数(设备id)
const countObjId: ComputedRef = computed(() => {
  return route.query.ObjId;
});
// 导航栏左侧事件
const onClickLeft = () => history.back();
// 导航栏右侧事件
const onClickRight = () => {
  showPopup.value = true;
};
// 切换设备点击事件
const handClickDev = (item: VideoBaseItem) => {
  equipmentId.value = item.DevId;
  getBaseInfo(item.DevId);
  getVideoHistortList(item.DevId);
  showPopup.value = false;
};
// 获取获取摄像机列表
const getVideoList = async () => {
  const payload = {
    Uid: store.userInfo.Uid,
    Token: store.userInfo.Token,
  };
  const { Data: videoListRes } = (await getVideoDataList(payload)) as any;
  videoData.videoList = videoListRes;
};
// 获取摄像机基本信息
const getBaseInfo = async (ObjId: string) => {
  showLoadingToast({
    message: 'loading...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0,
  });
  loading.value = true;
  const payload = {
    ObjId,
    Token: store.userInfo.Token,
  };
  const { Data: videoBaseRes } = (await getVideoBaseInfo(payload)) as any;
  videoInfo.videoBaseInfo = videoBaseRes as VideoBaseItem;
  loading.value = false;
  closeToast();
};
// 获取摄像机历史图片
const getVideoHistortList = async (ObjId: string) => {
  showLoadingToast({
    message: 'loading...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0,
  });
  loading.value = true;
  const payload = {
    ObjId,
    Bdate:moment().format('YYYY-MM-DD'),
    Edate:moment().format('YYYY-MM-DD'),
    Token: store.userInfo.Token,
  };
  const { Data: imgRes } = (await getVideoImgList(payload)) as any;
  imgList.takePhotoList=imgRes
  loading.value = false;
  closeToast();
};
onMounted(async () => {
  // 获取设备列表
  await getVideoList();
  equipmentId.value = countObjId.value || videoData.videoList.at(0)?.DevId;
  await getBaseInfo(equipmentId.value);
  await getVideoHistortList(equipmentId.value);
});
</script>

<style scoped lang="less">
.videoData {
  .title {
    :deep(.van-nav-bar--fixed) {
      background: #1f2228;

      .van-nav-bar__title {
        font-weight: normal;
        font-size: 18px;
        color: #ffffff;
      }
      .head-change {
        margin-left: 5px;
        font-size: 14px;
        color: #00cc90;
      }
    }
  }
}
</style>
