<template>
  <div class="fieldDetail">
    <van-nav-bar
      left-arrow
      fixed
      :border="false"
      placeholder
      safe-area-inset-top
      class="title"
      title="地块信息"
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
        <span>{{ videoList.devInfo.at(0)?.DevName }}</span>
      </template>
      <template #right>
        <van-icon name="sort" size="20" color="#00cc90" style="transform: rotate(90deg)" />
        <span>切换</span>
      </template>
    </van-nav-bar>
    <div class="video-main">视频</div>
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
          <pest-lamp v-if="item.id === 2 && !pestLoading && pestList.devInfo?.length" />
          <!-- 气象参数 -->
          <weather-monitor v-if="item.id === 3 && field.fieldInfo.actList?.length" />
          <!-- 土壤参数 -->
          <soil-monitor v-if="item.id === 4 && field.fieldInfo.actList?.length" />
          <!-- 历史图片 -->
          <history-img v-if="item.id === 5 && field.fieldInfo.actList?.length" />
        </template>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed, ref, reactive,provide } from 'vue';
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
} from '@/api/field';
import {
  FieldDetailItem,
  DevListItem,
  VideoInfoItem,
  VideoBaseItem,
  DateItem,
  LineChartItem,
  ImglistItem,
} from '../index';
import { tabsList } from './base';
import FarmActive from './farmActive.vue';
import PestLamp from '../pestLamp/index.vue';
import WeatherMonitor from './weatherMonitor.vue';
import SoilMonitor from './soilMonitor.vue';
import HistoryImg from './historyImg.vue';

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
// 切换设备id
const equipmentId: Ref<string> = ref('');
// 切换Tab标签页id
const tabtId: Ref<number> = ref(1);
// 切换Tabs数据
const tabs = reactive({ list: tabsList });
// 地块信息
const field = reactive<FieldDetailItem>({ fieldInfo: {} });
// 设备列表
const devList = reactive<DevListItem>({ devInfo: [] });
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
// 土壤参数列表
const soilList = reactive<DevListItem>({ devInfo: [] });
// 日期范围
const rangeCalendar = reactive<DateItem>({
  calendar: { Bdate: '', Edate: '' },
});
// 导航栏左侧事件
const onClickLeft = () => history.back();
// 摄像导航栏左侧事件
const onClickVideoTitleRight = () => {
  console.log('切换');
};
// tab标签点击事件
const handleClickTab = (name: number) => {
  tabtId.value = name;
};
// 获取地块信息
const getFieldInfo = async (Id: string) => {
  loading.value = true;
  const payload = {
    Id,
  };
  const { data: fieldRes } = await getField(payload);
  field.fieldInfo = fieldRes;
  await getDevList(fieldRes.devList);
  loading.value = false;
};
// 获取设备列表
const getDevList = async (ids: string[]) => {
  const payload = {
    Id: ids,
    Token: store.userInfo.user.iotToken,
    Val: '',
  };
  const { Data: listRes } = (await getDevListByDevId(payload)) as any;
  devList.devInfo = listRes;
  videoList.devInfo = listRes.filter((item: any) => item.TypeCode === 'Camera');
  equipmentId.value = videoList.devInfo[0].DevId;
  pestList.devInfo = listRes.filter((item: any) => item.TypeCode === 'PestLamp');
  weatherList.devInfo = listRes.filter((item: any) => item.TypeCode === 'WeatherMonitor');
  soilList.devInfo = listRes.filter((item: any) => item.TypeCode === 'SoilMonitor');
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
  pestLoading.value = true;
  const payload = {
    Bdate: item.calendar.Bdate,
    Edate: item.calendar.Edate,
    Token: store.userInfo.user.iotToken,
    ObjId,
  };
  const { Data: pestListRes } = (await getPestDataList(payload)) as any;
  lineChartInfo.pestList = pestListRes;
  const { Data: pestImgsRes } = (await getPestImagesList(payload)) as any;
  pestImgInfo.pestImgsList = pestImgsRes;
  pestLoading.value = false;
};
onMounted(async () => {
  showLoadingToast({
    message: 'loading...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0,
  });
  rangeCalendar.calendar = {
    Bdate: moment().subtract(3, 'day').format('YYYY-MM-DD'),
    Edate: moment().format('YYYY-MM-DD'),
  };
  await getFieldInfo(countField.value.fieldId);
  await getVideoData(equipmentId.value);
  await getPestReportList(pestList.devInfo[0].DevId, rangeCalendar);
  closeToast();
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
    margin: 18px 0;
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
  .video-main {
    background: #00cc90;
    height: 195px;
    border-radius: 8px;
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
