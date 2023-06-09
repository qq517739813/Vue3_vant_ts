<template>
  <div id="main" style="width: 100%; height: 250px"></div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import * as echarts from 'echarts';
import { HistoryItem } from './index';
import moment from 'moment';

interface Props {
  chartData: HistoryItem;
}
// 父传子数据
const props = withDefaults(defineProps<Props>(), {
  // chartData: () => [],
  chartData: () => {
    return {
      ParamId: '',
      ParamCode: '',
      ParamName: '',
      ParamUnit: '',
      MaxVal: 0,
      MinVal: 0,
      ParamIcon: '',
      MonitorList: [],
    };
  },
});
// chart实列
const myChart: any = ref(null);
// 绘制图表
const initChart = () => {
  const main = document.getElementById('main') as HTMLDivElement;
  myChart.value = echarts.init(main);
  const { MonitorList, ParamName, ParamUnit, MaxVal,MinVal } = props.chartData;
  const MaxValList = MonitorList.map((item) => item.MaxVal);
  const MinValList = MonitorList.map((item) => item.MinVal);
  const ParamValList = MonitorList.map((item) => item.ParamVal);
  const MaxFlag = ParamValList.some((item) => item > MaxVal);
  const XValList = MonitorList.map((item) => item.Ctime);
  const options = {
    legend: {
      data: ['最大值', '最小值', '在线'],
      show: false,
    },
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      top: '7%',
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
            const paramStr = MonitorList.filter((item) => item.Ctime === params.value)[0].ParamVal
            const toTime = moment(params.value).format('YYYY-MM-DD HH');
            return `${ParamName}\n${paramStr}${ParamUnit}\n${toTime}`;
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
        data: MaxFlag ? MaxValList : [],
        name: '最大值',
        type: 'line',
        symbolSize: 0, // 标记的大小
        connectNulls: true, // 是否连接空数据
        itemStyle: {
          //  折线拐点标志的样式。
          color: '#ff3c58',
        },
        lineStyle: {
          // 线宽
          width: 2,
        },
        endLabel: {
          // 折线端点的标签。
          show: true,
          offset: [-50, -10],
          formatter: '{a}',
          color: '#ff3c58',
        },
        // areaStyle: {
        //   // 区域填充样式。
        //   color: 'rgba(241, 37, 37, 1)',
        // },
        // animation:false // 是否开启动画
      },
      {
        data: MinVal>0?MinValList:[],
        name: '最小值',
        type: 'line',
        symbolSize: 0,
        connectNulls: true,
        itemStyle: {
          color: '#5591f4',
        },
        lineStyle: {
          width: 2,
        },
        endLabel: {
          show: true,
          offset: [-50, -10],
          formatter: '{a}',
          color: '#5591f4',
        },
        // animation:false // 是否开启动画
      },
      {
        data: ParamValList,
        name: '在线',
        type: 'line',
        symbolSize: 1,
        connectNulls: true,
        itemStyle: {
          color: '#00cc90',
        },
        lineStyle: {
          width: 1,
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
