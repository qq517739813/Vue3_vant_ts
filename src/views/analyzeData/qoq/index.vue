<template>
  <div class="analyzeQoqData">
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="onRefresh"
      class="analyzeQoqData-pull-refresh"
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
      <div class="average-month">
        <span class="month-left">月平均值分析</span>
        <span class="month-right">添加对比</span>
      </div>
      <div class="chart">
        <div class="head">{{ countBarTitle }}环比分析</div>
        <bar-diagram v-if="qoqList.analysisQoqList.MonitorList?.length" />
        <empty v-else />
      </div>
      <qoqdata-list v-if="qoqList.analysisQoqList.MonitorList?.length" />
      <empty v-else />
    </van-pull-refresh>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, inject } from 'vue';
import type { Ref, ComputedRef } from 'vue';
import { DateItem } from '@/components/index';
import { QoqDataItem } from '../index';
import empty from '@/components/empty.vue';
import BarDiagram from './barDiagram.vue';
import QoqdataList from './qoqdataList.vue';

// 接收数据
const qoqList = inject('analysisQoqList') as QoqDataItem;
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
  (e: 'getQoqList', ParamId: string, item: DateItem): void;
}>();
// 刷新状态
const refreshLoading: Ref<boolean> = ref(false);
// 计算柱状图标题
const countBarTitle: ComputedRef = computed(() => {
  const newestBarTitle = qoqList.analysisQoqList.ParamName;
  return newestBarTitle;
});
// 下拉刷新
const onRefresh = () => {
  refreshLoading.value = true;
  emit('getQoqList', props.equipmentId, props.rangeCalendar);
  refreshLoading.value = false;
};
</script>

<style scoped lang="less">
.analyzeQoqData {
  color: #fff;
  height: calc(100vh - 90px);
  overflow: auto;
  :deep(.analyzeQoqData-pull-refresh) {
    .van-pull-refresh__track {
      min-height: calc(100vh - 105px);
      .average-month {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 14px 16px;
        color: #cccccc;
        .month-left {
          font-size: 16px;
        }
        .month-right {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 9px;
          border-radius: 4px;
          border: 0.5px solid rgba(255, 255, 255, 0.4);
          font-size: 12px;
        }
      }
      .chart {
        margin: 0 16px;
        padding: 14px;
        min-height: 200px;
        border: 0.5px solid #333333;
        .head {
          font-size: 16px;
          color: #fff;
          line-height: 24px;
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
