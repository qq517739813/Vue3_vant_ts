<template>
  <div class="pestLamp">
    <van-nav-bar
      title="虫情测报"
      class="lamp-title"
      fixed
      :border="false"
      placeholder
      safe-area-inset-top
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #left>
        <van-icon name="arrow-left" size="20" color="#FFFFFF" style="margin-left: 11px" />
      </template>
      <template #right>
        <van-icon name="sort" size="20" color="#00cc90" style="transform: rotate(90deg)" />
        <span class="head-change">切换</span>
      </template>
    </van-nav-bar>
    <pull-refresh @pull-method="getDevBaseInfo" :equipmentId="equipmentId">
      <device-state :devBaseInfo="devInfo.devBaseInfo" />
      <device-switch v-model:popup-visbile="showPopup" @handele-dev="handClickDev" />
      <div class="temp-title">
        <div class="temp-title-left">
          <span>温/湿度走势图</span>
          <span>{{ computedTitle }}</span>
        </div>
        <div class="temp-title-right" @click="onClickChooseTime">
          <van-icon name="underway-o" size="16" color="#FFFFFF" />
          <span class="choose-time">选择时间</span>
        </div>
      </div>
      <!-- 空气温度 -->
      <air-temperature v-if="!loading && lineChartInfo.pestList.length > 0" />
      <!-- 环境湿度 -->
      <air-humidity v-if="!loading && lineChartInfo.pestList.length > 0" />
      <div class="img-title">
        <div class="temp-title-left">
          <span>拍摄图片</span>
          <span>{{ computedTitle }}</span>
        </div>
        <div class="temp-title-right">
          <span>共计</span>
          <span class="green">{{ pestImgInfo.pestImgsList.length }}</span>
          <span>张</span>
        </div>
      </div>
      <!-- 拍摄图片 -->
      <take-pictures v-if="!loading && pestImgInfo.pestImgsList.length > 0" />
    </pull-refresh>
    <!-- 选择时间 -->
    <common-calendar v-model:show-calendar="calendarVisible" @calendar-confirm="onConfirm" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed, ref, reactive, provide } from 'vue';
import type { Ref, ComputedRef } from 'vue';
import { useRoute } from 'vue-router';
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { userStore } from '@/store/user';
import { showLoadingToast, closeToast } from 'vant';
import { GetDevInfo } from '@/api/equipment';
import { getPestDataList, getPestImagesList } from '@/api/pestLamp';
import { getdevList } from '@/utils/base';
import { formatDate } from '@/utils/utils';
import { DevInfoItem, DevListBaseItem, DateItem } from '@/components/index';
import { LineChartItem, ImglistItem } from './index';
import pullRefresh from '@/components/pullRefresh.vue';
import DeviceState from '@/components/deviceState.vue';
import DeviceSwitch from '@/components/deviceSwitch.vue';
import CommonCalendar from '@/components/commonCalendar.vue';
import AirTemperature from './airTemperature.vue';
import AirHumidity from './airHumidity.vue';
import TakePictures from './takePictures.vue';

const route: RouteLocationNormalizedLoaded = useRoute();
const store = userStore();
// 控制图表显示
const loading: Ref<boolean> = ref(false);
// popup弹窗状态
const showPopup: Ref<boolean> = ref(false);
// 控制日期选择器状态
const calendarVisible: Ref<boolean> = ref(false);
// 设备基本信息
const devInfo = reactive<DevInfoItem>({ devBaseInfo: { DevId: '', ControlPwd: '' } });
// 折线图数据
const lineChartInfo = reactive<LineChartItem>({ pestList: [] });
// 拍摄图片数据
const pestImgInfo = reactive<ImglistItem>({ pestImgsList: [] });
provide('pestLampList', lineChartInfo);
provide('pestImgsList', pestImgInfo);
// 日期范围
const rangeCalendar = reactive<DateItem>({
  calendar: { Bdate: '', Edate: '' },
});
// 切换设备id
const equipmentId: Ref<string> = ref('');
// 路由参数
const countFuncode: ComputedRef = computed(() => {
  return route.params.FunCode;
});
// 路由参数(设备id)
const countObjId: ComputedRef = computed(() => {
  return route.query.ObjId;
});
// 计算时间标题
const computedTitle: ComputedRef = computed(() => {
  const list = [...new Set(Object.values(rangeCalendar.calendar))];
  return list.join('~');
});
// 获取设备基本信息
const getDevBaseInfo = async (DevId: string) => {
  showLoadingToast({
    message: 'loading...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0,
  });
  const payload = {
    Uid: store.userInfo.Uid,
    Token: store.userInfo.Token,
    ObjId: DevId,
  };
  const devRes: any = await GetDevInfo(payload);
  devInfo.devBaseInfo = devRes.Data;
  getPestReportList(DevId, rangeCalendar);
  closeToast();
};
// 根据时间获取虫情测报数据
const getPestReportList = async (DevId: string, item: DateItem) => {
  showLoadingToast({
    message: 'loading...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0,
  });
  const payload = {
    Bdate: item.calendar.Bdate,
    Edate: item.calendar.Edate,
    Token: store.userInfo.Token,
    ObjId: DevId,
  };
  loading.value = true;
  const pestListRes: any = await getPestDataList(payload);
  lineChartInfo.pestList = pestListRes.Data;
  const pestImgsRes: any = await getPestImagesList(payload);
  pestImgInfo.pestImgsList = pestImgsRes.Data;
  loading.value = false;
  closeToast();
};
// 导航栏左侧事件
const onClickLeft = () => history.back();
// 导航栏右侧事件
const onClickRight = () => {
  showPopup.value = true;
};
// 导航栏右侧选择事件
const onClickChooseTime = () => {
  calendarVisible.value = true;
};
// 日期确定事件
const onConfirm = (values: DateItem) => {
  rangeCalendar.calendar = values.calendar;
  getPestReportList(equipmentId.value, rangeCalendar);
  calendarVisible.value = false;
};
// 切换设备点击事件
const handClickDev = (item: DevListBaseItem) => {
  equipmentId.value = item.DevId;
  getDevBaseInfo(item.DevId);
  showPopup.value = false;
};
onMounted(async () => {
  rangeCalendar.calendar = {
    Bdate: formatDate(new Date()),
    Edate: formatDate(new Date()),
  };
  // 获取设备列表
  await getdevList(countFuncode.value);
  equipmentId.value = countObjId.value || store.devList[0].DevId;
  await getDevBaseInfo(equipmentId.value);
});
</script>

<style scoped lang="less">
.pestLamp {
  padding: 0 16px;
  .lamp-title {
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
  .temp-title,
  .img-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 14px 0;
    .temp-title-left {
      span:first-child {
        margin-right: 10px;
        font-size: 16px;
        color: #cccccc;
      }
      font-size: 12px;
      color: #999999;
    }
    .temp-title-right {
      .choose-time {
        margin-left: 5px;
        font-size: 16px;
        color: #ffffff;
      }
      span{
        font-size: 16px;
        color: #797a7e;
      }
      .green{
        color: #00cc90;
      }
    }
  }
}
</style>
