<template>
  <div class="fieldDetail">
    <van-nav-bar
      left-arrow
      fixed
      :border="false"
      placeholder
      safe-area-inset-top
      class="title"
      title="地块详情"
      @click-left="onClickLeft"
    />
    <div class="head">
      <div class="head-item item-first">
        <div class="fieldName">
          <span>地块名称：</span>
          <span>{{ field.fieldInfo.fieldName }}</span>
        </div>
        <div class="fieldArea">
          <span>地块面积：</span>
          <span>{{ field.fieldInfo.area?.toFixed(2) }}m&sup2;</span>
        </div>
      </div>
      <div class="head-item">
        <span>工作人员：</span>
        <span>{{ countField.managerName }}</span>
      </div>
      <div class="head-item">
        <span>当前作物：</span>
        <span>{{ field.fieldInfo.cropList?.join() }}</span>
      </div>
    </div>
    <van-nav-bar
      left-arrow
      :border="false"
      placeholder
      safe-area-inset-top
      class="video-title"
      @click-right="onClickVideoTitleRight"
    >
      <template #left>
        <span>{{ videoInfo?.videoBaseInfo?.DevName }}</span>
      </template>
      <template #right>
        <van-icon name="sort" size="20" color="#00cc90" style="transform: rotate(90deg)" />
        <span>切换</span>
      </template>
    </van-nav-bar>
    <!-- <video id="videoMain" class="video-main video-js vjs-default-skin vjs-big-play-centered">
      <source :src="" type="application/x-mpegURL">
    </video> -->
    <video-player :src="videoInfo.videoBaseInfo?.AppletAddr" v-if="!videoLoading" />
    <van-tabs
      swipeable
      v-model:active="tabtId"
      background="#1f2228"
      color="#ffffff"
      :line-width="56"
      line-height="2"
      title-inactive-color="#ffffff99"
      title-active-color="#ffffff"
      @change="handleClickTab"
      class="tabs-content"
    >
      <van-tab :name="item.id" v-for="item in tabs.list" :key="item.id">
        <template #title>
          <span style="font-weight: normal">{{ item.tabsName }}</span>
        </template>
        <template #default>
          <!-- 农事活动 -->
          <farm-active
            v-if="item.id === 1 && field.fieldInfo.actList?.length"
            :farmData="field.fieldInfo.actList"
          />
          <!-- 虫情测报 -->
          <pest-lamp
            v-if="item.id === 2 && !pestLoading && pestList.devInfo?.length"
            :objId="pestList.devInfo[0].DevId"
            :pestDate="pestRangeCalendar"
            @getPestReportList="getPestReportList"
          />
          <!-- 气象参数 -->
          <weather-monitor
            v-if="item.id === 3 && weatherInfo.weatherList?.length"
            :weatherList="weatherInfo.weatherList"
            :weatherId="weatherId"
          />
          <!-- 土壤参数 -->
          <soil-monitor
            v-if="item.id === 4 && soliInfo.soilList?.length"
            :soilList="soliInfo.soilList"
            :soilId="soilId"
          />
          <!-- 历史图片 -->
          <history-img
            v-if="item.id === 5 && imgList.takePhotoList?.length"
            :imgList="imgList.takePhotoList"
            :objId="equipmentId"
            :historyDate="historrRangeCalendar"
            @getVideoHistortList="getVideoHistortList"
          />
        </template>
      </van-tab>
    </van-tabs>
    <!-- 设备切换 -->
    <video-switch
      v-model:popup-visbile="showPopup"
      @handele-dev="handClickDev"
      :curentDevId="equipmentId"
      :videoList="videoList.devInfo"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed, ref, reactive, provide } from 'vue';
import type { ComputedRef, Ref } from 'vue';
import { userStore } from '@/store/user';
import { useRoute } from 'vue-router';
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { showLoadingToast, closeToast } from 'vant';
import moment from 'moment';
import {
  getField,
  getDevListByDevId,
  getVideoBaseInfo,
  getPestDataList,
  getPestImagesList,
  getRealDataList,
  getVideoImgList,
} from '@/api/field';
import {
  FieldDetailItem,
  DevListItem,
  VideoInfoItem,
  VideoBaseItem,
  DateItem,
  LineChartItem,
  ImglistItem,
  WeatherListItem,
  SoilListItem,
  ImgListItem,
} from '../index';
import { tabsList } from './base';
import VideoPlayer from './videoPlayer.vue';
import FarmActive from './farmActive.vue';
import PestLamp from '../pestLamp/index.vue';
import WeatherMonitor from './weatherMonitor.vue';
import SoilMonitor from './soilMonitor.vue';
import HistoryImg from './historyImg.vue';
import VideoSwitch from './videoSwitch.vue';

const store = userStore();
const route: RouteLocationNormalizedLoaded = useRoute();
// 路由参数
const countField: ComputedRef = computed(() => {
  return {
    fieldId: route.query.fieldId,
    managerName: route.query.managerName,
  };
});
// 控制显示状态
const loading: Ref<boolean> = ref(false);
// 控制虫情测报显示状态
const pestLoading: Ref<boolean> = ref(false);
const videoLoading: Ref<boolean> = ref(false);
// 切换设备id
const equipmentId: Ref<string> = ref('');
// 切换设备popup弹窗状态
const showPopup: Ref<boolean> = ref(false);
// 气象参数id
const weatherId: Ref<string> = ref('');
// 土壤参数id
const soilId: Ref<string> = ref('');
// 切换Tab标签页id
const tabtId: Ref<number> = ref(1);
// 切换Tabs数据
const tabs = reactive({ list: tabsList });
// 地块信息
const field = reactive<FieldDetailItem>({ fieldInfo: {} });
// 设备列表
// const devList = reactive<DevListItem>({ devInfo: [] });
const devList = reactive<any>({ devInfo: [] });
// 摄像头列表
const videoList = reactive<DevListItem>({ devInfo: [] });
// 摄像机信息
const videoInfo: VideoInfoItem = reactive({});
// 虫情测报列表
const pestList = reactive<DevListItem>({ devInfo: [] });
// 虫情测报折线图数据
const lineChartInfo = reactive<LineChartItem>({ pestList: [] });
// 虫情测报拍摄图片数据
const pestImgInfo = reactive<ImglistItem>({ pestImgsList: [] });
provide('pestLampList', lineChartInfo);
provide('pestImgsList', pestImgInfo);
// 气象参数列表
const weatherList = reactive<DevListItem>({ devInfo: [] });
// 气象参数实时数据
const weatherInfo = reactive<WeatherListItem>({ weatherList: [] });
// 土壤参数列表
const soilList = reactive<DevListItem>({ devInfo: [] });
// 土壤参数实时数据
const soliInfo = reactive<SoilListItem>({ soilList: [] });
// 拍摄图片
const imgList = reactive<ImgListItem>({ takePhotoList: [] });
// 虫情测报日期范围
const pestRangeCalendar = reactive<DateItem>({
  calendar: { Bdate: '', Edate: '' },
});
// 历史图片日期范围
const historrRangeCalendar = reactive<DateItem>({
  calendar: { Bdate: '', Edate: '' },
});
// 导航栏左侧事件
const onClickLeft = () => history.back();
// 摄像导航栏左侧事件
const onClickVideoTitleRight = () => {
  showPopup.value = true;
};
// 切换设备点击事件
const handClickDev = (item: VideoBaseItem) => {
  videoLoading.value = true;
  const rangeCalendar = {
    calendar: {
      // Bdate: moment().subtract(3, 'day').format('YYYY-MM-DD'),
      Bdate: moment().format('YYYY-MM-DD'),
      Edate: moment().format('YYYY-MM-DD'),
    },
  };
  equipmentId.value = item.DevId;
  getVideoData(item.DevId);
  getVideoHistortList(item.DevId, rangeCalendar);
  videoLoading.value = false;
  showPopup.value = false;
};
// tab标签点击事件
const handleClickTab = (name: number) => {
  tabtId.value = name;
};
// 获取地块信息
const getFieldInfo = async (Id: string) => {
  // loading.value = true;
  const payload = {
    Id,
  };
  const { data: fieldRes } = await getField(payload);
  field.fieldInfo = fieldRes;
  await getDevList(fieldRes.devList);
  // loading.value = false;
};
// 获取设备列表
const getDevList = async (ids: string[]) => {
  const payload = {
    Id: ids,
    Token: store.userInfo.user.iotToken,
    Val: '',
  };
  const { Data: listRes } = (await getDevListByDevId(payload)) as any;
  // devList.devInfo = listRes;
  devList.devInfo.push(123213);
  videoList.devInfo = listRes.filter((item: any) => item.TypeCode === 'Camera');
  equipmentId.value = videoList.devInfo[0].DevId;
  pestList.devInfo = listRes.filter((item: any) => item.TypeCode === 'PestLamp');
  weatherList.devInfo = listRes.filter((item: any) => item.TypeCode === 'WeatherMonitor');
  weatherId.value = weatherList.devInfo[0].DevId;
  soilList.devInfo = listRes.filter((item: any) => item.TypeCode === 'SoilMonitor');
  soilId.value = soilList.devInfo[0].DevId;
};
// 获取摄像机基本信息
const getVideoData = async (ObjId: string) => {
  const payload = {
    ObjId,
    Token: store.userInfo.user.iotToken,
  };
  const { Data: videoBaseRes } = (await getVideoBaseInfo(payload)) as any;
  videoInfo.videoBaseInfo = videoBaseRes as VideoBaseItem;
};
// 根据时间获取虫情测报数据
const getPestReportList = async (ObjId: string, item: DateItem) => {
  showLoadingToast({
    message: 'loading...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0,
  });
  pestLoading.value = true;
  const payload = {
    Bdate: item.calendar.Bdate,
    Edate: item.calendar.Edate,
    Token: store.userInfo.user.iotToken,
    ObjId,
  };
  pestRangeCalendar.calendar = item.calendar;
  const { Data: pestListRes } = (await getPestDataList(payload)) as any;
  lineChartInfo.pestList = pestListRes;
  const { Data: pestImgsRes } = (await getPestImagesList(payload)) as any;
  pestImgInfo.pestImgsList = pestImgsRes;
  pestLoading.value = false;
  closeToast();
};
// 获取气象参数
const getWeatherList = async (ObjId: string) => {
  const payload = {
    ObjId,
    Token: store.userInfo.user.iotToken,
  };
  const { Data: weatherRes } = (await getRealDataList(payload)) as any;
  weatherInfo.weatherList = weatherRes;
};
// 获取土壤参数
const getSoilList = async (ObjId: string) => {
  const payload = {
    ObjId,
    Token: store.userInfo.user.iotToken,
  };
  const { Data: soilRes } = (await getRealDataList(payload)) as any;
  soliInfo.soilList = soilRes;
};
// 获取摄像机历史图片
const getVideoHistortList = async (ObjId: string, item: DateItem) => {
  const payload = {
    ObjId,
    Bdate: item.calendar.Bdate,
    Edate: item.calendar.Edate,
    Token: store.userInfo.user.iotToken,
  };
  historrRangeCalendar.calendar = item.calendar;
  const { Data: imgRes } = (await getVideoImgList(payload)) as any;
  imgList.takePhotoList = imgRes;
};
// 初始化数据
const init = async (Id: string) => {
  showLoadingToast({
    message: 'loading...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0,
  });
  loading.value = true;
  const rangeCalendar = {
    calendar: {
      // Bdate: moment().subtract(3, 'day').format('YYYY-MM-DD'),
      Bdate: moment().format('YYYY-MM-DD'),
      Edate: moment().format('YYYY-MM-DD'),
    },
  };
  await getFieldInfo(Id);
  await getVideoData(equipmentId.value);
  await getPestReportList(pestList.devInfo[0].DevId, rangeCalendar);
  await getWeatherList(weatherList.devInfo[0].DevId);
  await getSoilList(soilList.devInfo[0].DevId);
  await getVideoHistortList(equipmentId.value, rangeCalendar);
  loading.value = false;
  closeToast();
};
onMounted(async () => {
  await init(countField.value.fieldId);
});
</script>

<style scoped lang="less">
.fieldDetail {
  padding: 0 16px;
  .title {
    :deep(.van-nav-bar--fixed) {
      background: #1f2228;
      .van-nav-bar__left {
        .van-nav-bar__arrow {
          font-size: 18px;
          color: #ffffff;
        }
      }
      .van-nav-bar__title {
        font-weight: normal;
        font-size: 18px;
        color: #ffffff;
      }
    }
  }
  .video-title {
    :deep(.van-nav-bar__content) {
      background: #1f2228;
      .van-nav-bar__left {
        padding-left: 0;
        font-size: 16px;
        font-weight: normal;
        color: #ffffff;
        pointer-events: none;
      }
      .van-nav-bar__right {
        padding-right: 0;
        span {
          margin-left: 5px;
          font-size: 14px;
          color: #00cc90;
        }
      }
      .van-nav-bar__title {
        font-weight: normal;
        font-size: 18px;
        color: #ffffff;
      }
    }
  }
  .head {
    // margin: 18px 0;
    margin-top: 16px;
    min-height: 110px;
    padding: 12px;
    padding-right: 25px;
    border-radius: 0px 4px 4px 4px;
    box-sizing: border-box;
    border: 0.5px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .head-item {
      font-size: 14px;
      color: #9e9e9e;
      span:nth-child(2) {
        color: #ffffff;
      }
    }
    .item-first {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  :deep(.tabs-content) {
    .van-tabs__content {
      .van-tab__panel {
        min-height: calc(100vh - 495px);
      }
    }
  }
}
</style>
