<template>
  <div class="warnData">
    <van-nav-bar
      title="预警统计"
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
    <pull-refresh @pull-method="getDevBaseInfo" :equipmentId="equipmentId">
      <device-switch
        v-model:popup-visbile="showPopup"
        @handele-dev="handClickDev"
        :curentDevId="equipmentId"
      />
      <div class="warnData-totalNum">
        <div class="totalNum-left">
          <span>参数报警统计次数</span>
          <span>{{ computedTitle }}</span>
        </div>
        <div class="totalNum-right" @click="onClickChooseTime">
          <van-icon name="underway-o" size="16" color="#FFFFFF" />
          <span class="choose-time">选择时间</span>
        </div>
      </div>
      <!-- 参数报警统计次数柱状图 -->
      <bar-chart
        :barGraphList="barGraph.barGraphList"
        v-if="!loading && barGraph.barGraphList?.length"
      />
      <empty v-else />
      <van-sticky :offset-top="32" z-index="9999">
        <div class="warnHistortData-totalNum">
          <div class="history-title">报警数据历史统计</div>
          <div class="history-text">
            <div class="text-left">
              <span
                class="tabs-title"
                v-for="(item, index) in tabsList"
                :key="index"
                :class="{ isActive: tabsActive === index }"
                @click="handleTabsClick(index)"
                >{{ item }}</span
              >
            </div>
            <div class="text-right" @click="handleShowDialog">
              <img src="@/assets/paramSetting.svg" alt="" />
              <span class="choose-param">选择参数</span>
            </div>
          </div>
        </div>
      </van-sticky>
      <!-- 报警数据历史统计列表 -->
      <warn-table-data
        :tableDataList="tableData"
        :paramIds="paramIds"
        :rangeCalendar="rangeCalendar"
        @edit-requestPage="editRequestPage"
        v-if="!loading && tabsActive === 0 && tableData.tableDataList?.length"
      />
      <empty v-else-if="tabsActive === 0" />
      <!-- 报警数据历史统计图形-->
      <warn-line-chart
        :lineChartList="lineChart.lineChartList"
        v-if="!loading && tabsActive === 1 && lineChart.lineChartList?.length"
      />
      <empty v-else-if="tabsActive === 1" />
    </pull-refresh>
    <!-- 选择时间 -->
    <common-date-picker v-model:show-calendar="datePickerVisible" @calendar-confirm="onConfirm" />
    <van-dialog
      v-model:show="dialogShow"
      width="343"
      class="warnData-dialog"
      closeOnClickOverlay
      @closed="handleCloseDialog"
      @touchmove.stop.prevent="moveHandle"
    >
      <template #title>
        <van-nav-bar
          left-text="选择参数(多数)"
          class="dialog-title"
          @click-right="onDialogClickRight"
        >
          <template #right>
            <van-icon name="cross" size="20" color="#ffffff" />
          </template>
        </van-nav-bar>
      </template>
      <template #footer>
        <van-checkbox-group v-model="checkedIds" icon-size="21">
          <van-checkbox
            v-for="item in barGraph.barGraphList"
            :key="item.ParamId"
            :name="item.ParamId"
            shape="square"
            checked-color="#00CC90"
          >
            {{ item.ParamName }}
          </van-checkbox>
        </van-checkbox-group>
        <div class="dialog-submit">
          <van-button @click="handleCheckIds(checkedIds)">确定</van-button>
        </div>
      </template>
    </van-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, reactive } from 'vue';
import type { Ref, ComputedRef } from 'vue';
import { useRoute } from 'vue-router';
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { userStore } from '@/store/user';
import moment from 'moment';
import { showLoadingToast, closeToast, showToast } from 'vant';
import { GetWarnDataList, GetWarnTableDataList, GetWarnLineDataList } from '@/api/warnData';
import { DevListBaseItem, DateItem } from '@/components/index';
import {
  barGraphListItem,
  lineChartListItem,
  TableListItem,
  lineBaseItem,
  barGraphBaseItem,
} from './index';
import { getdevList } from '@/utils/base';
import DeviceSwitch from '@/components/deviceSwitch.vue';
import PullRefresh from '@/components/pullRefresh.vue';
import CommonDatePicker from '@/components/commonDatePicker.vue';
import BarChart from './barChart.vue';
import WarnTableData from './warnTableData.vue';
import WarnLineChart from './warnLineChart.vue';
import empty from '@/components/empty.vue';

const route: RouteLocationNormalizedLoaded = useRoute();
const store = userStore();
// 控制图表显示
const loading: Ref<boolean> = ref(false);
// popup弹窗状态
const showPopup: Ref<boolean> = ref(false);
// 控制日期选择器状态
const datePickerVisible: Ref<boolean> = ref(false);
// 切换设备id
const equipmentId: Ref<string> = ref('');
// 选择参数id
const paramIds: Ref<string> = ref('');
// 选择参数id
const tabsActive: Ref<number> = ref(0);
// 控制dialog显示与隐藏
const dialogShow: Ref<boolean> = ref(false);
// 页码尺寸
const requestPage: Ref<number> = ref(1);
// dialog复选框选中值
const checkedIds: Ref<string[]> = ref([]);
// 自定义tabs列表
const tabsList = reactive(['列表', '图形']);
// 日期范围
const rangeCalendar = reactive<DateItem>({
  calendar: { Bdate: '', Edate: '' },
});
// 柱状图数据
const barGraph = reactive<barGraphListItem>({ barGraphList: [] });
// 折线图所有数据
const allLineChart = reactive<lineChartListItem>({ lineChartList: [] });
// 折线图数据
const lineChart = reactive<lineChartListItem>({ lineChartList: [] });
// 列表数据
const tableData = reactive<TableListItem>({
  Page: 1,
  PageSize: 10,
  RecordNum: 0,
  tableDataList: [],
});
// 路由参数
const countFuncode: ComputedRef = computed(() => {
  return route.params.FunCode;
});
// 计算时间标题
const computedTitle: ComputedRef = computed(() => {
  const timeStr = moment(rangeCalendar.calendar.Bdate).format('YYYY年MM月');
  return timeStr;
});
// 获取设备基本信息
const getDevBaseInfo = async (DevId: string) => {
  showLoadingToast({
    message: 'loading...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0,
  });
  loading.value = true;
  await getWarnData(DevId, rangeCalendar);
  await getWarnTableData(paramIds.value, rangeCalendar);
  await getWarnLineData(DevId, rangeCalendar);
  loading.value = false;
  closeToast();
};
// 根据时间获取设备预警汇总数据(柱状图选择参数列表)
const getWarnData = async (DevId: string, item: DateItem) => {
  const payload = {
    Bdate: item.calendar.Bdate,
    Edate: item.calendar.Edate,
    Token: store.userInfo.Token,
    ObjId: DevId,
  };
  const warnDataRes: any = await GetWarnDataList(payload);
  barGraph.barGraphList = warnDataRes.Data;
  if (barGraph.barGraphList.length > 0) {
    paramIds.value = barGraph.barGraphList[0].ParamId;
  } else {
    paramIds.value = '';
  }
};
// 根据时间获取参数预警表格数据
const getWarnTableData = async (paramId: string, item: DateItem) => {
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
    ObjIds: paramId.split(',') || [],
    Page: requestPage.value,
    PageSize: 10,
  };
  loading.value = true;
  const warnTableDataRes: any = await GetWarnTableDataList(payload);
  tableData.Page = warnTableDataRes.Data.Page;
  tableData.PageSize = warnTableDataRes.Data.PageSize;
  tableData.RecordNum = warnTableDataRes.Data?.RecordNum;
  tableData.tableDataList = warnTableDataRes.Data?.Datas;
  loading.value = false;
  closeToast();
};
// 根据时间获取参数预警曲线数据(折线图)
const getWarnLineData = async (DevId: string, item: DateItem) => {
  const payload = {
    Bdate: item.calendar.Bdate,
    Edate: item.calendar.Edate,
    Token: store.userInfo.Token,
    DevId,
  };
  const { barGraphList } = barGraph;
  const { Data: warnAllLineData } = (await GetWarnLineDataList(payload)) as any;
  allLineChart.lineChartList = warnAllLineData;
  const arr: lineBaseItem[] = [];
  // 筛选对应历史统计图形数据
  (warnAllLineData || []).forEach((ele: lineBaseItem) => {
    barGraphList.forEach((ind: barGraphBaseItem) => {
      if (ele.ParamId === ind.ParamId) {
        arr.push(ele);
      }
    });
  });
  lineChart.lineChartList = arr;
};
// 导航栏左侧事件
const onClickLeft = () => history.back();
// 导航栏右侧事件
const onClickRight = () => {
  showPopup.value = true;
};
// 选择时间事件
const onClickChooseTime = () => {
  datePickerVisible.value = true;
};
// 日期确定事件
const onConfirm = (values: DateItem) => {
  rangeCalendar.calendar = values.calendar;
  getDevBaseInfo(equipmentId.value);
  datePickerVisible.value = false;
};
// 切换设备点击事件
const handClickDev = (item: DevListBaseItem) => {
  equipmentId.value = item.DevId;
  getDevBaseInfo(item.DevId);
  showPopup.value = false;
};
// 自定义tabs点击事件
const handleTabsClick = (index: number) => {
  tabsActive.value = index;
};
// 修改表格页码尺寸大小
const editRequestPage = async (pageSize: number) => {
  if (requestPage.value === pageSize) {
    return
  }
  requestPage.value = pageSize;
  const payload = {
    Bdate: rangeCalendar.calendar.Bdate,
    Edate: rangeCalendar.calendar.Edate,
    Token: store.userInfo.Token,
    ObjIds: paramIds.value.split(',') || [],
    Page: requestPage.value,
    PageSize: 10,
  };
  const warnTableDataRes: any = await GetWarnTableDataList(payload);
  tableData.Page = warnTableDataRes.Data.Page;
  tableData.PageSize = warnTableDataRes.Data.PageSize;
  tableData.RecordNum = warnTableDataRes.Data?.RecordNum;
  tableData.tableDataList = [
    ...new Set([...tableData.tableDataList, ...warnTableDataRes.Data?.Datas]),
  ];
};
// 打开弹窗
const handleShowDialog = () => {
  // 打开弹窗
  dialogShow.value = true;
};
// 关闭弹窗
const handleCloseDialog = () => {
  // 清空勾选复选框状态
  checkedIds.value = [];
  // 关闭弹窗
  dialogShow.value = false;
};
// dialog关闭事件
const onDialogClickRight = () => {
  handleCloseDialog();
};
// 阻止dialog页面滑动
const moveHandle = () => {};
// dialog确定按钮事件
const handleCheckIds = (ids: string[]) => {
  if (!ids.length) {
    showToast({
      message: '请选择参数',
      forbidClick: true,
      position: 'middle',
      duration: 500,
    });
    return;
  }
  const strIds = ids.join();
  // 获取表格数据
  getWarnTableData(strIds, rangeCalendar);
  // 获取折线图数据
  const { lineChartList } = allLineChart;
  const arr: lineBaseItem[] = [];
  ids.forEach((item: string) => {
    lineChartList.forEach((ele: lineBaseItem) => {
      if (item === ele.ParamId) {
        arr.push(ele);
      }
    });
  });
  lineChart.lineChartList = arr;
  // ids.forEach
  // 关闭弹窗
  handleCloseDialog();
};
onMounted(async () => {
  rangeCalendar.calendar = {
    Bdate: moment().startOf('month').format('YYYY-MM-DD'),
    Edate: moment().endOf('month').format('YYYY-MM-DD'),
  };
  // 获取设备列表
  await getdevList(countFuncode.value);
  equipmentId.value = store.devList[0].DevId;
  await getDevBaseInfo(equipmentId.value);
  await handleTabsClick(tabsActive.value);
});
</script>

<style scoped lang="less">
.warnData {
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
  .warnData-totalNum {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 14px 0;
    .totalNum-left {
      font-size: 16px;
      color: #cccccc;
      span:last-child {
        margin-left: 10px;
        font-size: 14px;
      }
    }
    .totalNum-right {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 9px;
      border-radius: 4px;
      border: 0.5px solid rgba(255, 255, 255, 0.4);
      .choose-time {
        margin-left: 5px;
        font-size: 12px;
        color: #ffffff;
      }
    }
  }
  .warnHistortData-totalNum {
    background: #1f2228;
    .history-title {
      margin: 14px 0;
      font-size: 16px;
      color: #cccccc;
    }
    .history-text {
      display: flex;
      justify-content: space-between;
      .text-left {
        .tabs-title {
          margin-right: 20px;
          font-size: 14px;
          color: #ffffff;
          padding-bottom: 5px;
        }
        .isActive {
          color: #00cc90;
          border-bottom: 3px solid #00cc90;
        }
      }
      .text-right {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6px 9px;
        border-radius: 4px;
        border: 0.5px solid rgba(255, 255, 255, 0.4);
        img {
          font-size: 16px;
        }
        .choose-param {
          margin-left: 5px;
          font-size: 12px;
          color: #ffffff;
        }
      }
    }
  }
  :deep(.warnData-dialog) {
    background: #1f2228;
    .van-dialog__header--isolated {
      padding: 0;
      .dialog-title {
        background: #1f2228;
        .van-nav-bar__text {
          font-weight: normal;
          font-size: 16px;
          color: #cccccc;
        }
        &::after {
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
      }
    }
    .van-checkbox-group {
      padding: 0 16px;
      .van-checkbox {
        padding: 14px 0;
        border-bottom: 0.5px solid rgba(255, 255, 255, 0.1);
        .van-checkbox__label {
          margin-left: 15px;
          font-size: 14px;
          color: #cccccc;
        }
        &:last-child {
          border-bottom: none;
        }
      }
    }
    .dialog-submit {
      margin: 26px 0;
      display: flex;
      justify-content: center;
      button {
        width: 150px;
        height: 33px;
        font-size: 14px;
        color: #ffffff;
        background: #00cc90;
        border: 0.5px solid rgba(255, 255, 255, 0.2);
        border-radius: 4px;
      }
    }
  }
}
</style>
