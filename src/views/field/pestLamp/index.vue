<template>
  <div class="pestLamp">
    <div class="head">
      <div class="title">温/湿度走势图</div>
      <div class="date">
        <div class="text">{{ computedTitle }}</div>
        <div class="choose-time">
          <van-icon name="underway-o" size="16" color="#FFFFFF" />
          <span>选择时间</span>
        </div>
      </div>
    </div>
    <div class="line" v-if="lampList.pestList?.length">
      <!-- 空气温度 -->
      <air-temperature />
      <!-- 环境湿度 -->
      <air-humidity />
    </div>
  </div>
</template>

<script setup lang="ts">
import {inject, onMounted, computed, reactive } from 'vue';
import type { ComputedRef } from 'vue';
import moment from 'moment';
import { DateItem,LineChartItem } from '../index';
import AirTemperature from './airTemperature.vue';
import AirHumidity from './airHumidity.vue';

// 接收数据
const lampList = inject('pestLampList') as LineChartItem;

// 日期范围
const rangeCalendar = reactive<DateItem>({
  calendar: { Bdate: '', Edate: '' },
});
// 计算时间标题
const computedTitle: ComputedRef = computed(() => {
  const text = `${rangeCalendar.calendar.Bdate}—${rangeCalendar.calendar.Edate}`;
  return text;
});
onMounted(async () => {
  rangeCalendar.calendar = {
    Bdate: moment().subtract(3, 'day').format('YYYY-MM-DD'),
    Edate: moment().format('YYYY-MM-DD'),
  };
});
</script>

<style scoped lang="less">
.pestLamp {
  color: #fff;
  padding-top: 14px;
  height: calc(100vh - 510px);
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .head {
    .title {
      font-size: 14px;
      color: #cccccc;
    }
    .date {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 5px;
      .text {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.4);
      }
      .choose-time {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6px 9px;
        border-radius: 4px;
        border: 0.5px solid rgba(255, 255, 255, 0.4);
        span {
          margin-left: 5px;
          font-size: 12px;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
