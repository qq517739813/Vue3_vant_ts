<template>
  <div class="weatherMonitor">
    <div class="weatherMonitor-title">
      <span>实时数据</span>
      <span>({{ computedTitle }})</span>
    </div>
    <div v-if="weatherList.length" class="weatherMonitor-content">
      <div
        class="weatherMonitor-items"
        v-for="item in props.weatherList"
        :key="item.ParamId"
        @click="handeleItemClick(item)"
      >
        <div class="item-title">
          <div class="title-left">
            <img :src="item.ParamIcon" alt="" />
            <span>{{ item.ParamName }}</span>
          </div>
          <div class="title-right">
            <span>图表</span>
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="item-text">
          <span>{{ item.ParamVal }}</span>
          <span>{{ item.ParamUnit }}</span>
        </div>
      </div>
    </div>
    <empty v-else />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { ComputedRef } from 'vue';
import { useRouter } from 'vue-router';
import type { Router } from 'vue-router';
import { WeatherBaseItem } from '../index';
import Empty from '@/components/empty.vue';
import emitter from '@/utils/emitter';
import moment from 'moment';

interface Props {
  weatherList: WeatherBaseItem[];
  weatherId: string;
}
// 父子传数据
const props = withDefaults(defineProps<Props>(), {
  weatherList: () => [],
  weatherId: '',
});
const router: Router = useRouter();
// 计算时间标题
const computedTitle: ComputedRef = computed(() => {
  const text = moment().format('YYYY-MM-DD');
  return text;
});
// 农场地块点击事件
const handeleItemClick = (item: WeatherBaseItem) => {
  // console.log('item', item)
  emitter.emit('sendHistory', item);
  router.push({
    name: 'HistoryLineData',
    query: {
      ObjId: props.weatherId,
      paramId: item.ParamId,
      ParamVal: item.ParamVal,
    },
  });
};
</script>

<style scoped lang="less">
.weatherMonitor {
  padding-top: 14px;
  height: calc(100vh - 510px);
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .weatherMonitor-title {
    font-size: 14px;
    color: #cccccc;
  }
  .weatherMonitor-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .weatherMonitor-items {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px 8px 9px 8px;
      margin-top: 14px;
      width: 164px;
      min-height: 70px;
      border-radius: 4px;
      border: 0.5px solid #333333;
      .item-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title-left {
          display: flex;
          align-items: center;
          img {
            margin-right: 5px;
            width: 16px;
            height: 16px;
          }
          span {
            font-size: 14px;
            color: #cccccc;
          }
        }
        .title-right {
          font-size: 12px;
          color: #9e9e9e;
        }
      }
      .item-text {
        span:first-child {
          font-size: 18px;
          color: #00cc90;
        }
        span {
          font-size: 12px;
          color: #06aa7b;
        }
      }
    }
  }
}
</style>
