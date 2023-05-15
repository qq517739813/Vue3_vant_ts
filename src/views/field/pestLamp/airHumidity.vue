<template>
  <div class="airHumidity">
   <div class="head">
      <div class="head-left">
        <img src="@/assets/atmosphereHumidity.svg" alt="" />
        <span>空气湿度</span>
      </div>
      <div class="head-right">
        <span>最新:</span>
        <span>{{countNewestHumidity}}％</span>
      </div>
    </div>
    <div id="airHumidityMain" style="width: 100%; height: 180px"></div>
  </div>
</template>
<script lang="ts" setup>
import { inject, onMounted, onUnmounted, ref, computed } from 'vue';
import type { ComputedRef } from 'vue';
import * as echarts from 'echarts';
import { LineChartItem } from '../index';
import moment from 'moment';
// 接收数据
const electricList = inject('pestLampList') as LineChartItem;
// 计算最新环境湿度
const countNewestHumidity: ComputedRef = computed(() => {
  const newestNum = electricList.pestList.slice(-1)[0].Ah;
  return newestNum.toFixed(1);
});
// chart实列
const myChart: any = ref(null);
// 绘制图表
const initChart = () => {
  const main = document.getElementById('airHumidityMain') as HTMLDivElement;
  myChart.value = echarts.init(main);
  const { pestList } = electricList;
  const ParamValList = pestList.map((item) => item.Ah);
  const XValList = pestList.map((item) => item.Ctime);
  const options = {
    legend: {
      data: ['空气湿度'],
      show: false,
    },
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      top: '8%',
      right: '4%',
      bottom: '0%',
      left: '2%',
      containLabel: true,
      tooltip: {
        show: true,
      },
    },
    xAxis: {
      data: XValList,
      type: 'category',
      boundaryGap: false, // 坐标轴两边留白策略
      // max: 5, // 坐标轴刻度最大值。
      splitNumber: 5, // 坐标轴的分割段数
      axisTick: {
        show: false, // 是否显示坐标轴刻度
        alignWithLabel: true, // 保证刻度线和标签对齐
      },
      axisLine: {
        // 坐标轴轴线相关设置
        show: true, // 显示坐标轴轴线
        lineStyle: {
          color: '#484849',
          width: 1,
        },
      },
      axisPointer: {
        // 坐标轴指示器配置项。
        show: true,
        snap: true,
        type: 'line',
        label: {
          show: true,
          padding: [5, 5, 45, 5],
          color: '#ffffff',
          lineHeight: 18,
          backgroundColor: '#00cc90',
          borderColor: '#ffffff',
          borderWidth: 1,
          formatter(params: any) {
            const paramStr = pestList.filter((item) => item.Ctime === params.value)[0].Ah;
            return `空气湿度\n${paramStr}％\n${params.value}`;
          },
        },
        lineStyle: {
          color: '#FFC35D',
          width: 0.5,
          type: 'solid',
        },
      },
      axisLabel: {
        // 坐标轴刻度标签的相关设置
        // showMaxLabel: false, // 是否显示最大 tick 的 label
        align: 'center',
        margin: 12,
        formatter(value: any) {
          const timeStr = moment(value).format('DD日HH时');
          return timeStr;
        },
        color: '#ffffff',
      },
    },
    yAxis: {
      type: 'value',
      boundaryGap: false, // 坐标轴两边留白策略
      // max: 1, // 坐标轴刻度最大值
      min: 0, // 坐标轴刻度最小值
      splitNumber: 5, // 坐标轴的分割段数
      // 坐标轴在 grid 区域中的分隔线
      splitLine: {
        show: true,
        lineStyle: {
          color: '#484849',
          type: 'dashed',
        },
      },
      axisLine: {
        // 坐标轴轴线相关设置。
        show: true, // 显示坐标轴轴线
        lineStyle: {
          color: '#484849',
          width: 1,
        },
      },
      axisPointer: {
        // 坐标轴指示器配置项。
        show: false,
        snap: true,
        type: 'line',
        label: {
          show: false,
          // formatter(params: any) {
          //   console.log('params :>> ', params);
          // },
        },
        lineStyle: {
          color: '#FFC35D',
          width: 0.5,
          type: 'solid',
        },
      },
      axisLabel: {
        // 坐标轴刻度标签的相关设置
        color: '#ffffff',
      },
    },
    series: [
      {
        data: ParamValList,
        name: '空气湿度',
        type: 'line',
        smooth: true, // 平滑曲线
        symbolSize: 1,
        connectNulls: true,
        itemStyle: {
          color: '#00cc90',
        },
        lineStyle: {
          width: 1,
        },
        // animation:false // 是否开启动画
        areaStyle: {
          // 区域填充样式。
          color: 'rgba(0, 204, 144, 0.1)',
        },
      },
    ],
  };
  myChart.value.setOption(options);
  window.onresize = function () {
    // 自适应大小s
    myChart.value.resize();
  };
};
onMounted(() => {
  initChart();
});
onUnmounted(() => {
  myChart.value.dispose();
});
</script>

<style scoped lang="less">
.airHumidity {
  padding: 16px 0px;
  margin-bottom: 14px;
  min-height: 180px;
  box-sizing: border-box;
  border: 0.5px solid #333333;
  .head {
    display: flex;
    align-items: center;
    margin-left: 10px;
    font-size: 14px;
    line-height: 20px;
    color: #ffffff;
    .head-left {
      display: flex;
      margin-right: 16px;
      img {
        margin-right: 5px;
        height: 16px;
      }
    }
    .head-right {
      span:last-child {
        color: #648eff;
      }
    }
  }
}
</style>
