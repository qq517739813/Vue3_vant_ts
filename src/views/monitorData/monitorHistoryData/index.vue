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
      <div class="historyItem-title">
        <span>采集数据</span>
        <span>{{ computedTitle }}</span>
      </div>
      <div class="historyItem-content" v-for="(item, index) in countLineChart.historyList" :key="index">
        <div class="content-head">
          <div class="head-left">
            <img :src="item.ParamIcon" alt="" />
            <span>{{ item.ParamName }}</span>
            <span>当前:</span>
            <span class="current-data">{{ `${computedCurentValue}${item.ParamUnit}` }}</span>
          </div>
          <div class="head-right">
            <img src="@/assets/historyNormal.png" alt="" />
            <span>正常</span>
            <span></span>
            <span>最大</span>
            <span></span>
            <span>最小</span>
          </div>
        </div>
        <common-line-chart :chartData="item" v-if="item.MonitorList.length > 0&&!loading" />
        <empty v-else />
      </div>
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
import CommonLineChart from '@/components/commonLineChart.vue';
import Empty from '@/components/empty.vue';
// import HistoryItem from './historyItem.vue';
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
const countLineChart = reactive<HistoryDataItem>({
  historyList: [],
});
const loading: Ref<boolean> = ref(false);
// 控制日期选择器状态
const calendarVisible: Ref<boolean> = ref(false);
// 路由参数(设备id)
const countObjId: ComputedRef = computed(() => {
  return route.query.ObjId;
});
// 计算时间标题
const computedTitle: ComputedRef = computed(() => {
  const list = [...new Set(Object.values(rangeCalendar.calendar))];
  return list.join('~');
});
// 计算当前值
const computedCurentValue: ComputedRef = computed(() => {
  return route.query.ParamVal;
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
  loading.value = true;
  const res: any = await GetHistoryDataList({ ...payload, Uid: store.userInfo.Uid });
  historyData.historyList = res.Data;
  const list = historyData.historyList.filter((Item) => Item.ParamId === route.query.paramId);
  countLineChart.historyList = list;
  loading.value = false;
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
  rangeCalendar.calendar = values.calendar;
  getDevBaseInfo(countObjId.value, rangeCalendar);
  calendarVisible.value = false;
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
    .historyItem-title {
      padding: 14px 0;
      span:first-child {
        margin-right: 10px;
        font-size: 16px;
        color: #cccccc;
      }
      font-size: 14px;
      color: #999999;
    }
    .historyItem-content {
      padding: 16px 0px;
      min-height: 250px;
      border-radius: 4px;
      border: 0.5px solid #333333;
      .content-head {
        padding: 0 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        color: #ffffff;
        .head-left {
          line-height: 18px;
          display: flex;
          span {
            margin-left: 5px;
          }
          .current-data {
            color: #00cc90;
          }
          img {
            width: 16px;
            height: 16px;
          }
        }
        .head-right {
          display: flex;
          align-items: center;
          line-height: 18px;
          img {
            margin-right: 5px;
            height: 12px;
          }
          span:nth-child(3) {
            margin: 0 5px;
            width: 12px;
            height: 4px;
            background: #ff3c58;
          }
          span:nth-child(5) {
            margin: 0 5px;
            width: 12px;
            height: 4px;
            background: #5591f4;
          }
        }
      }
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
