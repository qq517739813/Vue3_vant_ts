<template>
  <div class="monitorHistoryData">
    <van-nav-bar
      title="历史数据曲线"
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
        <van-icon name="underway-o" size="14" color="#00cc90" />
        <span class="head-change">选择时间</span>
      </template>
    </van-nav-bar>
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="onRefresh"
      class="historyData-pull-refresh"
    >
      <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
      <template #pulling="props">
        <div class="pulling" :style="{ height: props.distance }">
          <van-icon name="arrow-down" />
          <span>下拉即可刷新...</span>
        </div>
      </template>
      <!-- 释放提示 -->
      <template #loosing>
        <div class="loosing">
          <van-icon name="arrow-up" />
          <span>释放即可刷新...</span>
        </div>
      </template>
      <history-item :dateTitle="rangeCalendar.calendar" :lineChartData="lineChartList.historyList" />
    </van-pull-refresh>
    <common-calendar v-model:show-calendar="calendarVisible" @calendar-confirm="onConfirm" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, reactive } from 'vue';
import type { Ref, ComputedRef } from 'vue';
import { useRoute } from 'vue-router';
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { userStore } from '@/store/user';
import { showLoadingToast, closeToast } from 'vant';
import { GetHistoryDataList } from '@/api/monitorData';
import { formatDate } from '@/utils/utils';
import CommonCalendar from '@/components/commonCalendar.vue';
import HistoryItem from './historyItem.vue';
import { DateItem } from '@/components/index';
import { HistoryDataItem } from './index';

const route: RouteLocationNormalizedLoaded = useRoute();
const store = userStore();
// 刷新状态
const refreshLoading: Ref<boolean> = ref(false);
// 日期范围
const rangeCalendar = reactive<DateItem>({
  calendar: { Bdate: '', Edate: '' },
});
// 历史数据
const historyData = reactive<HistoryDataItem>({
  historyList: [],
});
// 折线图数据
const lineChartList = reactive<HistoryDataItem>({
  historyList: [],
});
// 控制日期选择器状态
const calendarVisible: Ref<boolean> = ref(false);
// 路由参数(设备id)
const countObjId: ComputedRef = computed(() => {
  return route.query.ObjId;
});
// 路由参数(实时数据设备id)
const countParamId: ComputedRef = computed(() => {
  return route.query.paramId;
});
// 获取设备基本信息
const getDevBaseInfo = async (DevId: string, item: DateItem) => {
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
  const res: any = await GetHistoryDataList({ ...payload, Uid: store.userInfo.Uid });
  historyData.historyList = res.Data;
  lineChartList.historyList = countLineChart(countParamId.value);
  closeToast();
};
// 导航栏左侧事件
const onClickLeft = () => history.back();
// 导航栏右侧事件
const onClickRight = () => {
  calendarVisible.value = true;
};
// 下拉刷新
const onRefresh = () => {
  refreshLoading.value = true;
  getDevBaseInfo(countObjId.value, rangeCalendar);
  refreshLoading.value = false;
};
// 日期确定事件
const onConfirm = (values: DateItem) => {
  console.log('values :>> ', values);
  rangeCalendar.calendar = values.calendar;
  getDevBaseInfo(countObjId.value, rangeCalendar);
  calendarVisible.value = false;
};
// 设备id对应的折线图数据
const countLineChart = (paramId: string) => {
  const list = historyData.historyList.filter((item) => item.ParamId === paramId);
  return list;
};
onMounted(async () => {
  rangeCalendar.calendar = {
    Bdate: formatDate(new Date()),
    Edate: formatDate(new Date()),
  };
  // 获取设备列表
  await getDevBaseInfo(countObjId.value, rangeCalendar);
});
</script>

<style scoped lang="less">
.monitorHistoryData {
  padding: 0 16px;
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
  .historyData-pull-refresh {
    :deep(.van-pull-refresh__track) {
      min-height: calc(100vh - 46px);
    }
  }

  .pulling,
  .loosing {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    font-size: 20px;

    span {
      margin-left: 10px;
    }
  }
}
</style>
