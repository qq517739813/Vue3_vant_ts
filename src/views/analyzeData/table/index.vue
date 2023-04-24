<template>
  <div class="analyzeTable">
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="onRefresh"
      class="analyzeTable-pull-refresh"
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
        <div class="month-left">
          <span>月平均值分析</span>
          <span>{{ computedTitle }}</span>
        </div>
        <div class="month-right" @click="onClickChooseTime">
          <van-icon name="underway-o" size="16" color="#FFFFFF" />
          <span class="choose-time">选择时间</span>
        </div>
      </div>
      <div class="average-month-content" v-if="props.tableList?.length">
        <div class="month-item" v-for="item in props.tableList" :key="item.ParamId">
          <div class="head">{{ item.ParamName }}</div>
          <div class="item">
            <div class="value">
              <div class="left">
                <span>最高值:</span>
                <span>{{ item.MaxVal.toFixed(1) }}{{ item.ParamUnit }}</span>
              </div>
              <div class="right">
                <span>最低值:</span>
                <span>{{ item.MinVal.toFixed(1) }}{{ item.ParamUnit }}</span>
              </div>
            </div>
            <div class="value">
              <div class="left">
                <span>平均值:</span>
                <span>{{ item.AvgVal }}{{ item.ParamUnit }}</span>
              </div>
              <div class="right">
                <span>正常范围:</span>
                <span
                  >{{ item.NorMinVal.toFixed(1) }}~{{ item.NorMaxVal.toFixed(1)
                  }}{{ item.ParamUnit }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <empty v-else />
      <div class="avarage-day">
        <span class="month-left">日平均值分析</span>
      </div>
      <div class="average-day-content" v-if="computedMonitorList?.length">
        <div class="month-item" v-for="(item, index) in computedMonitorList" :key="index">
          <div class="head">
            <span>{{ item.Ctime }}</span>
            <span>{{ item.ParamName }}</span>
          </div>
          <div class="item">
            <div class="value">
              <div class="left">
                <span>最高值:</span>
                <span>{{ item.MaxVal.toFixed(1) }}{{ item.ParamUnit }}</span>
              </div>
              <div class="right">
                <span>最低值:</span>
                <span>{{ item.MinVal.toFixed(1) }}{{ item.ParamUnit }}</span>
              </div>
            </div>
            <div class="value">
              <div class="left">
                <span>平均值:</span>
                <span>{{ item.AvgVal }}{{ item.ParamUnit }}</span>
              </div>
              <div class="right">
                <span>正常范围:</span>
                <span
                  >{{ item.NorMinVal.toFixed(1) }}~{{ item.NorMaxVal.toFixed(1)
                  }}{{ item.ParamUnit }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <empty v-else />
    </van-pull-refresh>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import type { Ref, ComputedRef } from 'vue';
import moment from 'moment';
import { DateItem } from '@/components/index';
import { CommonItem } from '../index';
import empty from '@/components/empty.vue';

interface Props {
  rangeCalendar: DateItem;
  tableList: CommonItem[];
  equipmentId: string;
}
// 父传子数据
const props = withDefaults(defineProps<Props>(), {
  rangeCalendar: () => {
    return { calendar: { Bdate: '', Edate: '' } };
  },
  tableList: () => [],
  equipmentId: '',
});
// 父子传方法
const emit = defineEmits<{
  (e: 'openDatePicker', value: boolean): void;
  (e: 'getTableList', ObjId: string, item: DateItem): void;
}>();

// 刷新状态
const refreshLoading: Ref<boolean> = ref(false);
// 计算时间标题
const computedTitle: ComputedRef = computed(() => {
  const timeStr = moment(props.rangeCalendar.calendar.Bdate).format('YYYY-MM');
  return timeStr;
});
// 计算日平均值分析数据
const computedMonitorList: ComputedRef<CommonItem[]> = computed(() => {
  return props.tableList.map((item) => item.MonitorList).flat();
});

// 下拉刷新
const onRefresh = () => {
  refreshLoading.value = true;
  emit('getTableList', props.equipmentId, props.rangeCalendar);
  refreshLoading.value = false;
};
// 选择时间事件
const onClickChooseTime = () => {
  emit('openDatePicker', true);
};
</script>

<style scoped lang="less">
.analyzeTable {
  height: calc(100vh - 105px);
  overflow: auto;
  :deep(.analyzeTable-pull-refresh) {
    .van-pull-refresh__track {
      min-height: calc(100vh - 105px);
      .average-month,
      .avarage-day {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 14px 16px;
        .month-left {
          font-size: 16px;
          color: #cccccc;
          span:last-child {
            margin-left: 10px;
            font-size: 14px;
          }
        }
        .month-right {
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
      .average-month-content,
      .average-day-content {
        margin: 14px 16px;
        box-sizing: border-box;
        .month-item {
          margin-bottom: 14px;
          border-radius: 4px;
          border: 0.5px solid rgba(255, 255, 255, 0.1);
          .head {
            padding: 10px 12px;
            border-bottom: 0.5px solid rgba(255, 255, 255, 0.1);
            font-size: 14px;
            color: #ffffff;
            span:first-child {
              margin-right: 10px;
            }
          }
          .item {
            padding: 0px 12px 10px;
            font-size: 12px;
            color: #ffffff;
            .value {
              display: flex;
              align-items: center;
              line-height: 21px;
              margin-top: 10px;
              .left,
              .right {
                width: 50%;
                span:first-child {
                  margin-right: 5px;
                  color: #9e9e9e;
                }
              }
            }
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
