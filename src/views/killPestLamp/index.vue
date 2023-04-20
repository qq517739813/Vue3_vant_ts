<template>
  <div class="killPestLamp">
    <van-nav-bar
      title="虫情监测"
      class="head-title"
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
      <!-- 设备状态 -->
      <device-state :devBaseInfo="devInfo.devBaseInfo" />
      <!-- 设备切换 -->
      <device-switch v-model:popup-visbile="showPopup" @handele-dev="handClickDev" />
      <van-nav-bar
        class="pest-title"
        :border="false"
        placeholder
        safe-area-inset-top
        @click-right="onClickChooseTime"
      >
        <template #left>
          <span>虫情灯监测数据</span>
          <span>{{ computedTitle }}</span>
        </template>
        <template #right>
          <van-icon name="underway-o" size="16" color="#FFFFFF" />
          <span class="head-change">选择时间</span>
        </template>
      </van-nav-bar>
      <!-- 电击次数 -->
      <electric-num v-if="!loading && lineChartInfo.pestList.length > 0" />
      <!-- 电池电压 -->
      <cell-voltage v-if="!loading && lineChartInfo.pestList.length > 0" />
      <!-- 环境温度 -->
      <atmosphere-temperature v-if="!loading && lineChartInfo.pestList.length > 0" />
      <!-- 环境湿度 -->
      <atmosphere-humidity v-if="!loading && lineChartInfo.pestList.length > 0" />
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
import { getKillPestDataList } from '@/api/pestLamp';
import { getdevList } from '@/utils/base';
import { DevInfoItem, DevListBaseItem, DateItem } from '@/components/index';
import moment from 'moment';
import { LineChartItem } from './index';
import pullRefresh from '@/components/pullRefresh.vue';
import DeviceState from '@/components/deviceState.vue';
import DeviceSwitch from '@/components/deviceSwitch.vue';
import CommonCalendar from '@/components/commonCalendar.vue';
import ElectricNum from './electricNum.vue';
import CellVoltage from './cellVoltage.vue';
import AtmosphereTemperature from './atmosphereTemperature.vue';
import AtmosphereHumidity from './atmosphereHumidity.vue';

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
provide('pestLampList', lineChartInfo);
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
  getKillPestList(DevId, rangeCalendar);
  closeToast();
};
// 根据时间获取虫情灯监测数据
const getKillPestList = async (DevId: string, item: DateItem) => {
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
  const res: any = await getKillPestDataList(payload);
  lineChartInfo.pestList = res.Data;
  loading.value = false;
  closeToast();
};
// 导航栏左侧事件
const onClickLeft = () => history.back();
// 导航栏右侧切换事件
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
  getKillPestList(equipmentId.value, rangeCalendar);
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
    Bdate: moment().format('YYYY-MM-DD'),
    Edate: moment().format('YYYY-MM-DD'),
  };
  // 获取设备列表
  await getdevList(countFuncode.value);
  equipmentId.value = countObjId.value || store.devList[0].DevId;
  await getDevBaseInfo(equipmentId.value);
  // 提供传入子组件的值
});
</script>

<style scoped lang="less">
.killPestLamp {
  padding: 0 16px;
  .head-title {
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
  .pest-title {
    :deep(.van-nav-bar__content) {
      background: #1f2228;
      .van-nav-bar__left,
      .van-nav-bar__right {
        padding: 0;
      }
      .van-nav-bar__left {
        span:first-child {
          margin-right: 10px;
          font-size: 16px;
          color: #cccccc;
        }
        font-size: 12px;
        color: #999999;
      }
      .head-change {
        margin-left: 5px;
        font-size: 16px;
        color: #ffffff;
      }
    }
  }
}
</style>
