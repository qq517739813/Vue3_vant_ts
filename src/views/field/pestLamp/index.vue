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
    <div class="line" v-if="pestList?.length">
      <!-- 空气温度 -->
      <air-temperature />
      <!-- 环境湿度 -->
      <air-humidity />
    </div>
    <div class="head">
      <div class="title">
        <span>温/湿度走势图</span>
        <span>(共计{{ pestImgsList.length }}张)</span>
      </div>
      <div class="date">
        <div class="text">{{ computedTitle }}</div>
      </div>
    </div>
    <!-- 拍摄图片 -->
    <take-pictures v-if="pestImgsList?.length" />
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, computed, reactive } from 'vue';
import type { ComputedRef } from 'vue';
import moment from 'moment';
import { DateItem, LineChartItem, ImglistItem } from '../index';
import AirTemperature from './airTemperature.vue';
import AirHumidity from './airHumidity.vue';
import TakePictures from './takePictures.vue';

// 接收数据
const { pestList } = inject('pestLampList') as LineChartItem;
const { pestImgsList } = inject('pestImgsList') as ImglistItem;
// 日期范围
const rangeCalendar = reactive<DateItem>({
  calendar: { Bdate: '', Edate: '' },
});
// 计算时间标题
const computedTitle: ComputedRef = computed(() => {
  const list = [...new Set(Object.values(rangeCalendar.calendar))];
  return list.join('—');
});
onMounted(async () => {
  rangeCalendar.calendar = {
    // Bdate: moment().subtract(3, 'day').format('YYYY-MM-DD'),
    Bdate: moment().format('YYYY-MM-DD'),
    Edate: moment().format('YYYY-MM-DD'),
  };
});
</script>

<style scoped lang="less">
.pestLamp {
  padding-top: 14px;
  height: calc(100vh - 510px);
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .head {
    margin-bottom: 14px;
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
