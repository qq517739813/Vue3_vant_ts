<template>
  <div class="analyzeChartData">
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="onRefresh"
      class="analyzeChartData-pull-refresh"
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
      <div class="graph-total">
        <div class="total-left">
          <span>月平均值分析</span>
          <span>{{ computedTitle }}</span>
        </div>
        <div class="total-center" @click="onClickChooseTime">
          <van-icon name="underway-o" size="16" color="#FFFFFF" />
          <span class="choose-time">选择时间</span>
        </div>
        <div class="total-right" @click="onClickSwitchData">
          <van-icon name="sort" size="16" color="#FFFFFF" style="transform: rotate(90deg)" />
          <span class="choose-data">切换数据</span>
        </div>
      </div>
      <div class="chart">
        <div class="head">{{ countLineTitle }}线</div>
        <line-diagram v-if="chartList.analysisChartList[0].MonitorList?.length" />
        <empty v-else />
        <pie-diagram  v-if="chartList.analysisChartList?.length" />
        <empty v-else />
      </div>
    </van-pull-refresh>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, inject } from 'vue';
import type { Ref, ComputedRef } from 'vue';
import moment from 'moment';
import { DateItem } from '@/components/index';
import { ChartItem } from '../index';
import empty from '@/components/empty.vue';
import LineDiagram from './lineDiagram.vue';
import PieDiagram from './pieDiagram.vue';

// 接收数据
const chartList = inject('parmaChart') as ChartItem;
interface Props {
  rangeCalendar: DateItem;
  equipmentId: string;
}
// 父传子数据
const props = withDefaults(defineProps<Props>(), {
  rangeCalendar: () => {
    return { calendar: { Bdate: '', Edate: '' } };
  },
  equipmentId: '',
});
// 父子传方法
const emit = defineEmits<{
  (e: 'openDatePicker', value: boolean): void;
  (e: 'openSwitchData'): void;
  (e: 'getChartList', ObjId: string, item: DateItem): void;
}>();
// 刷新状态
const refreshLoading: Ref<boolean> = ref(false);
// 计算时间标题
const computedTitle: ComputedRef = computed(() => {
  const timeStr = moment(props.rangeCalendar.calendar.Bdate).format('YYYY-MM');
  return timeStr;
});
// 计算折线图标题
const countLineTitle: ComputedRef = computed(() => {
  const newestNum = chartList.analysisChartList[0].ParamName;
  return newestNum;
});
// 下拉刷新
const onRefresh = () => {
  refreshLoading.value = true;
  emit('getChartList', props.equipmentId, props.rangeCalendar);
  refreshLoading.value = false;
};
// 选择时间事件
const onClickChooseTime = () => {
  emit('openDatePicker', true);
};
// 切换数据事件
const onClickSwitchData = () => {
  emit('openSwitchData');
};
</script>

<style scoped lang="less">
.analyzeChartData {
  :deep(.analyzeChartData-pull-refresh) {
    .van-pull-refresh__track {
      min-height: calc(100vh - 105px);
      .graph-total {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 14px 16px;
        .total-left {
          font-size: 14px;
          color: #cccccc;
          span:last-child {
            margin-left: 5px;
            font-size: 12px;
          }
        }
        .total-center {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 9px;
          border-radius: 4px;
          border: 0.5px solid rgba(255, 255, 255, 0.4);
          .choose-time {
            margin-left: 5px;
            font-size: 14px;
            color: #ffffff;
          }
        }
        .total-right {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 9px;
          border-radius: 4px;
          background: #00cc90;
          .choose-data {
            margin-left: 5px;
            font-size: 14px;
            color: #ffffff;
          }
        }
      }
      .chart {
        margin: 0 16px;
        padding: 14px;
        min-height: 425px;
        border: 0.5px solid #333333;
        .head {
          font-size: 14px;
          color: #fff;
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
