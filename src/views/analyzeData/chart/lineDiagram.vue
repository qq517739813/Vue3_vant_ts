<template>
  <div class="lineDiagram">
    <div id="lineDiagramMain" style="width: 100%; height: 200px"></div>
  </div>
</template>
<script lang="ts" setup>
import { inject, onMounted, onUnmounted, ref, computed } from 'vue';
import type { ComputedRef } from 'vue';
import * as echarts from 'echarts';
import { ChartItem } from '../index';
import moment from 'moment';

// 接收数据
const chartList = inject('parmaChart') as ChartItem;
// 计算折线图标题
const countLineTitle: ComputedRef = computed(() => {
  const newestNum = chartList.analysisChartList[0].ParamName;
  return newestNum;
});
// chart实列
const myChart: any = ref(null);
// 绘制图表
const initChart = () => {
  const main = document.getElementById('lineDiagramMain') as HTMLDivElement;
  myChart.value = echarts.init(main);
  const { MonitorList } = chartList.analysisChartList[0];
  const ParamValList = MonitorList.map((item) => item.ParamVal);
  const XValList = MonitorList.map((item) => item.Ctime);
  const options = {
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      top: '12%',
      right: '5%',
      bottom: '0%',
      left: '0%',
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
            const paramStr = MonitorList.filter((item) => item.Ctime === params.value)[0].ParamVal;
            const timeStr = moment(params.value).format('YYYY-MM-DD');
            const paramUnitStr = chartList.analysisChartList[0].ParamUnit;
            return `${countLineTitle.value}\n${paramStr}${paramUnitStr}\n${timeStr}`;
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
          const timeStr = moment(value).format('DD日');
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
        name: '在线',
        type: 'line',
        symbolSize: 1, // 标记的大小
        connectNulls: true, // 是否连接空数据
        itemStyle: {
          //  折线拐点标志的样式。
          color: '#00cc90',
        },
        lineStyle: {
          // 线宽
          width: 1,
        },
        areaStyle: {
          // 区域填充样式。
          color: 'rgba(0, 204, 144, 0.1)',
        },
        // animation:false // 是否开启动画
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

<style scoped lang="less"></style>
