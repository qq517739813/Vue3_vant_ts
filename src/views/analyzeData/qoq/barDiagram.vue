<template>
  <div class="barDiagram">
    <div id="barDiagramMain" style="width: 100%; height: 200px"></div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, inject } from 'vue';
import * as echarts from 'echarts';
import { QoqDataItem } from '../index';
import moment from 'moment';

// 接收数据
const qoqList = inject('analysisQoqList') as QoqDataItem;

// 绘制图表
const initChart = () => {
  const main = document.getElementById('barDiagramMain') as HTMLDivElement;
  const myChart = echarts.init(main);
  const { MonitorList } = qoqList.analysisQoqList;
  const XValList = MonitorList.map((item) => item.Ctime);
  // 正常值
  const paramValList = MonitorList.map((item) => item.ParamVal);
  // 偏高值
  const maxValList = MonitorList.map((item) => item.MaxVal);
  // 偏低值
  const minValList = MonitorList.map((item) => item.MinVal);
  const options = {
    legend: {
      show: true,
      selectedMode: false,
      top: 'top',
      right: '0%',
      orient: 'horizontal',
      icon: 'rect',
      itemWidth: 6,
      itemHeight: 6,
      itemGap: 10,
      data: [
        {
          name: '平均值',
          icon: 'rect',
          textStyle: {
            fontSize: 12,
            color: '#00cc90',
          },
        },
        {
          name: '最大值',
          icon: 'rect',
          textStyle: {
            fontSize: 12,
            color: '#fd3a51',
          },
        },
        {
          name: '最小值',
          icon: 'rect',
          textStyle: {
            fontSize: 12,
            color: '#5591f4',
          },
        },
      ],
    },
    grid: {
      top: '15%',
      right: '0%',
      bottom: '0%',
      left: '0%',
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
        formatter(value: any) {
          const timeStr = moment(value).format('YYYY-MM');
          return timeStr;
        },
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
        data: paramValList,
        name: '平均值',
        type: 'bar',
        label: {
          // 图形上的文本标签相关设置
          show: false, // 是否显示标签。
          align: 'center', // 文字水平对齐方式
          position: 'top', // 标签的位置。
          color: '#00CC90',
          formatter(params: any) {
            if (params.value > 0) {
              return params.value;
            } else {
              return '';
            }
          },
        },
        itemStyle: {
          // 图形样式。
          color: '#00CC90',
        },
        barWidth: 35, // 柱条的宽度
        barGap: '0%', // 不同系列的柱间距离
      },
      {
        data: maxValList,
        name: '最大值',
        type: 'bar',
        label: {
          // 图形上的文本标签相关设置
          show: false, // 是否显示标签。
          align: 'center', // 文字水平对齐方式
          position: 'top', // 标签的位置。
          color: '#fd3a51',
          formatter(params: any) {
            if (params.value > 0) {
              return params.value;
            } else {
              return '';
            }
          },
        },
        itemStyle: {
          // 图形样式。
          color: '#fd3a51',
        },
        barWidth: 35, // 柱条的宽度
        barGap: '0%', // 不同系列的柱间距离
      },
      {
        data: minValList,
        name: '最小值',
        type: 'bar',
        label: {
          // 图形上的文本标签相关设置
          show: false, // 是否显示标签。
          align: 'center', // 文字水平对齐方式
          position: 'top', // 标签的位置。
          color: '#5591f4',
          formatter(params: any) {
            if (params.value > 0) {
              return params.value;
            } else {
              return '';
            }
          },
        },
        itemStyle: {
          // 图形样式。
          color: '#5591f4',
        },
        barWidth: 35, // 柱条的宽度
        barGap: '0%', // 不同系列的柱间距离
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

<style scoped lang="less"></style>
