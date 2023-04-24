<template>
  <div class="barChart">
    <div id="barChartMain" style="width: 100%; height: 230px"></div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import { barGraphBaseItem } from './index';

interface Props {
  barGraphList: barGraphBaseItem[];
}
// 父传子数据
const props = withDefaults(defineProps<Props>(), {
  barGraphList: () => [],
});
// 绘制图表
const initChart = () => {
  const main = document.getElementById('barChartMain') as HTMLDivElement;
  const myChart = echarts.init(main);
  const { barGraphList } = props;
  const XValList = barGraphList.map((item) => item.ParamName);
  const seriesList = barGraphList.map((item) => item.AllNum);
  const options = {
    grid: {
      top: '10%',
      right: '2%',
      bottom: '0%',
      left: '2%',
      containLabel: true,
    },
    dataZoom: [
      // 用于区域缩放
      {
        type: 'inside',
        zoomLock: true,
        // minValueSpan:1 ,
        maxValueSpan: 3,
        moveOnMouseMove: true,
        preventDefaultMouseMove: true,
      },
    ],
    xAxis: {
      data: XValList,
      type: 'category',
      boundaryGap: true, // 坐标轴两边留白策略
      axisTick: {
        // 坐标轴刻度相关设置。
        show: false, // 是否显示坐标轴刻度
        alignWithLabel: true, // 保证刻度线和标签对齐
      },
      axisLine: {
        // 坐标轴轴线相关设置
        show: true, // 显示坐标轴轴线
        lineStyle: {
          color: '#484849',
          width: 1,
          type: 'solid',
        },
      },
      axisLabel: {
        // 坐标轴刻度标签的相关设置
        align: 'center',
        margin: 12,
        color: 'rgba(255, 255, 255, 0.5)',
      },
    },
    yAxis: {
      type: 'value',
      //    splitNumber: 5, // 坐标轴的分割段数
      splitLine: {
        //   坐标轴在 grid 区域中的分隔线
        show: true,
        lineStyle: {
          color: '#484849',
          width: 1,
          type: 'dashed',
        },
      },
      axisLabel: {
        // 坐标轴刻度标签的相关设置
        color: 'rgba(255, 255, 255, 0.5)',
      },
    },
    series: [
      {
        data: seriesList,
        type: 'bar',
        label: {
          // 图形上的文本标签相关设置
          show: true, // 是否显示标签。
          align: 'center', // 文字水平对齐方式
          position: 'top', // 标签的位置。
          color: '#00CC90',
        },
        itemStyle: {
          // 图形样式。
          color: '#00CC90',
        },
        barWidth: 60 // 柱条的宽度
      },
    ],
  };
  myChart.setOption(options);
  window.onresize = function () {
    // 自适应大小s
    myChart.resize();
  };
};
onMounted(() => {
  initChart();
});
onUnmounted(() => {});
</script>

<style scoped lang="less">
.barChart {
  color: #ffffff;
  min-height: 230px;
  padding-bottom: 10px;
  border-radius: 4px;
  border: 0.5px solid #333333;
}
</style>
