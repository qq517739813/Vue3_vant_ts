<template>
  <div class="analyzeData">
    <van-nav-bar
      title="数据分析"
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
      <template #right v-if="activeId !== 3">
        <van-icon name="sort" size="20" color="#00cc90" style="transform: rotate(90deg)" />
        <span class="head-change">切换</span>
      </template>
    </van-nav-bar>
    <van-tabs
      v-model:active="activeId"
      swipeable
      background="#1f2228"
      color="#00CC90"
      :line-width="60"
      line-height="2"
      title-inactive-color="#ffffff99"
      title-active-color="#00CC90"
      animated
      sticky
      offset-top="46"
      class="tabs-content"
    >
      <van-tab v-for="item in tabsList" :key="item.id" :name="item.value" :title="item.lable">
        <analyze-table-data
          v-if="!loading && item.value === 1"
          @open-date-picker="openDatePicker"
          @get-table-list="getTableDataList"
          :rangeCalendar="rangeCalendar"
          :tableList="analyzeTable.analysisTableList"
          :equipmentId="equipmentId"
        />
        <analyze-chart-data
          v-if="!loading && item.value === 2 && parmaChart.analysisChartList?.length"
          @open-date-picker="openDatePicker"
          @open-switch-data="openSwitchData"
          @get-chart-list="getChartDataList"
          :rangeCalendar="rangeCalendar"
          :equipmentId="equipmentId"
        />
        <analyze-qoq-data
          v-if="!loading && item.value === 3 && analyzeQoq.analysisQoqList"
          @get-qoq-list="getQoqDataList"
          :rangeCalendar="rangeCalendar"
          :equipmentId="paramId"
        />
      </van-tab>
    </van-tabs>
  </div>
  <!-- 设备切换 -->
  <device-switch
    v-model:popup-visbile="showPopup"
    @handele-dev="handClickDev"
    :curentDevId="equipmentId"
  />
  <!-- 表格汇总图形汇总选择时间 -->
  <common-date-picker v-model:show-calendar="datePickerVisible" @calendar-confirm="onConfirm" />
  <!-- 图形汇总切换数据 -->
  <params-switch
    v-model:popup-visbile="showParamsPopup"
    @handele-dev="handClickParam"
    :curentParamId="paramId"
  />
</template>

<script lang="ts" setup>
import { onMounted, computed, ref, reactive, provide } from 'vue';
import type { Ref, ComputedRef } from 'vue';
import { useRoute } from 'vue-router';
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { userStore } from '@/store/user';
import { getdevList } from '@/utils/base';
import {
  GetAnalysisTableData,
  GetAnalysisChartData,
  GetChartDevParam,
  GetAnalysisQoqData,
} from '@/api/analyzeData';
import {
  TableItem,
  ParmItem,
  ChartItem,
  ChartBaseItem,
  QoqDataItem,
  DevParamBaseItem,
} from './index';
import { showLoadingToast, closeToast } from 'vant';
import moment from 'moment';
import { DevListBaseItem, DateItem } from '@/components/index';
import DeviceSwitch from '@/components/deviceSwitch.vue';
import AnalyzeTableData from './table/index.vue';
import AnalyzeChartData from './chart/index.vue';
import AnalyzeQoqData from './qoq/index.vue';
import ParamsSwitch from './paramsSwitch.vue';
import CommonDatePicker from '@/components/commonDatePicker.vue';

const route: RouteLocationNormalizedLoaded = useRoute();
const store = userStore();
// 切换Tab标签页id
const activeId: Ref<number> = ref(1);
// 控制图表显示
const loading: Ref<boolean> = ref(false);
// 切换设备popup弹窗状态
const showPopup: Ref<boolean> = ref(false);
// 图形汇总切换数据popup弹窗状态
const showParamsPopup: Ref<boolean> = ref(false);
// 控制日期选择器状态
const datePickerVisible: Ref<boolean> = ref(false);
// 切换设备id
const equipmentId: Ref<string> = ref('');
// 切换数据参数id
const paramId: Ref<string> = ref('');
// 日期范围
const rangeCalendar = reactive<DateItem>({
  calendar: { Bdate: '', Edate: '' },
});
// tabs数据
const tabsList = reactive([
  { id: 1, value: 1, lable: '表格分析' },
  { id: 2, value: 2, lable: '图形汇总' },
  { id: 3, value: 3, lable: '对比分析' },
]);
// 表格数据
const analyzeTable = reactive<TableItem>({ analysisTableList: [] });
// 所有图形数据
const allAnalyzeChart = reactive<ChartItem>({ analysisChartList: [] });
// 某参数对应的图形数据
const parmaChart = reactive<ChartItem>({ analysisChartList: [] });
provide('parmaChart', parmaChart);
// 对比分析数据
const analyzeQoq = reactive<QoqDataItem>({
  analysisQoqList: {
    DevId: '',
    DevName: '',
    ParamId: '',
    ParamCode: '',
    ParamName: '',
    ParamUnit: '',
    ParamIcon: '',
    NorMaxVal: 0,
    NorMinVal: 0,
    MonitorList: [],
  },
});
provide('analysisQoqList', analyzeQoq);
// 切换数据
const analyzeParam = reactive<ParmItem>({ paramsList: [] });
provide('paramsList', analyzeParam);
// 路由参数(设备id)
const countObjId: ComputedRef = computed(() => {
  return route.query.ObjId;
});
// 路由参数
const countFuncode: ComputedRef = computed(() => {
  return route.params.FunCode;
});
// 导航栏左侧事件
const onClickLeft = () => history.back();
// 导航栏右侧事件
const onClickRight = () => {
  showPopup.value = true;
};
// 切换设备点击事件
const handClickDev = (item: DevListBaseItem) => {
  equipmentId.value = item.DevId;
  initInfo(item.DevId);
  showPopup.value = false;
};
const initInfo = async (DevId: string) => {
  showLoadingToast({
    message: 'loading...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0,
  });
  loading.value = true;
  await getDveParam(DevId);
  await getTableDataList(DevId, rangeCalendar);
  await getChartDataList(DevId, rangeCalendar);
  await getQoqDataList(paramId.value, rangeCalendar);
  loading.value = false;
  closeToast();
};
// 时间选择或切换数据获取信息
const getDevBaseInfo = async (DevId: string) => {
  showLoadingToast({
    message: 'loading...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0,
  });
  loading.value = true;
  await getTableDataList(DevId, rangeCalendar);
  await getChartDataList(DevId, rangeCalendar);
  loading.value = false;
  closeToast();
};
// 获取表格(汇总)分析
const getTableDataList = async (ObjId: string, item: DateItem) => {
  showLoadingToast({
    message: 'loading...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0,
  });
  const MonthStr = [...new Set(Object.values(item.calendar))][0];
  const payload = {
    Month: MonthStr,
    ObjId,
    Token: store.userInfo.Token,
  };
  const { Data: analysisTableData } = (await GetAnalysisTableData(payload)) as any;
  analyzeTable.analysisTableList = analysisTableData;
  closeToast();
};
// 获取对比分析
const getQoqDataList = async (ParamId: string, item: DateItem) => {
  loading.value = true;
  showLoadingToast({
    message: 'loading...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0,
  });
  // const MonthList = [...new Set(Object.values(item.calendar))];
  const MonthList = item.calendar.Bdate.split(',');
  const payload = {
    Months: MonthList,
    ParamId,
    Token: store.userInfo.Token,
  };
  const { Data: analysisQoqData } = (await GetAnalysisQoqData(payload)) as any;
  analyzeQoq.analysisQoqList = analysisQoqData;
  loading.value = false;
  closeToast();
};
// 获取图形(汇总)分析
const getChartDataList = async (ObjId: string, item: DateItem) => {
  showLoadingToast({
    message: 'loading...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0,
  });
  loading.value = true;
  const MonthStr = [...new Set(Object.values(item.calendar))][0];
  const payload = {
    Month: MonthStr,
    ObjId,
    Token: store.userInfo.Token,
  };
  const { Data: analysisChartData } = (await GetAnalysisChartData(payload)) as any;
  allAnalyzeChart.analysisChartList = analysisChartData;
  const arr: ChartBaseItem[] = [];
  (analysisChartData || []).forEach((ele: ChartBaseItem) => {
    if (ele.ParamId === paramId.value) {
      arr.push(ele);
    }
  });
  parmaChart.analysisChartList = arr;
  loading.value = false;
  closeToast();
};
// 获取图形(汇总)分析切换数据
const getDveParam = async (ObjId: string) => {
  const payload = {
    ObjId,
    Token: store.userInfo.Token,
  };
  const { Data: analysisParamsData } = (await GetChartDevParam(payload)) as any;
  analyzeParam.paramsList = analysisParamsData;
  paramId.value = analysisParamsData[0].ParamId;
};
// 打卡时间选择弹窗
const openDatePicker = (val: boolean) => {
  datePickerVisible.value = val;
};

// 日期确定事件
const onConfirm = (values: DateItem) => {
  rangeCalendar.calendar.Bdate = moment(values.calendar.Bdate).format('YYYY-MM');
  rangeCalendar.calendar.Edate = moment(values.calendar.Edate).format('YYYY-MM');
  getDevBaseInfo(equipmentId.value);
  datePickerVisible.value = false;
};
// 打开图形汇总切换数据弹窗
const openSwitchData = () => {
  showParamsPopup.value = true;
};
// 切换数据点击事件
const handClickParam = (item: DevParamBaseItem) => {
  showLoadingToast({
    message: 'loading...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0,
  });
  loading.value = true;
  paramId.value = item.ParamId;
  const arr: ChartBaseItem[] = [];
  allAnalyzeChart.analysisChartList.forEach((ele) => {
    if (ele.ParamId === item.ParamId) {
      arr.push(ele);
    }
  });
  parmaChart.analysisChartList = arr;
  showParamsPopup.value = false;
  setTimeout(() => {
    loading.value = false;
    closeToast();
  }, 500);
};
onMounted(async () => {
  // 获取当月时间
  rangeCalendar.calendar = {
    Bdate: moment().startOf('month').format('YYYY-MM'),
    Edate: moment().endOf('month').format('YYYY-MM'),
  };
  // 获取设备列表
  await getdevList(countFuncode.value);
  equipmentId.value = countObjId.value || store.devList[0].DevId;
  await initInfo(equipmentId.value);
});
</script>

<style scoped lang="less">
.analyzeData {
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
  :deep(.tabs-content) {
    .van-tabs__content {
      .van-tab__panel {
        min-height: calc(100vh - 90px);
      }
    }
  }
}
</style>
