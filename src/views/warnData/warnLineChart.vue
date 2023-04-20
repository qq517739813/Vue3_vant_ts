<template>
  <div class="warnLineData">
    <div id="warnLineDataMain" style="width: 100%; height: 230px"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import * as echarts from 'echarts';
import { lineBaseItem } from './index';
import moment from 'moment';

interface Props {
  lineChartList: lineBaseItem[];
}
// 父传子数据
const props = withDefaults(defineProps<Props>(), {
  lineChartList: () => [],
});
// chart实列
const myChart: any = ref(null);
// 绘制图表
const initChart = () => {
  const main = document.getElementById('warnLineDataMain') as HTMLDivElement;
  myChart.value = echarts.init(main);
  const { lineChartList } = props;
  const legendData = lineChartList.map((item) => item.ParamName);
  const xAxisData: any = [];
  lineChartList.forEach((item) => {
    item.Datas.forEach((ele) => {
      xAxisData.push(ele.Ctime);
    });
  });
  const seriesData: any = [];
  lineChartList.forEach((ele: lineBaseItem) => {
    seriesData.push({
      data: ele.Datas.map((item) => item.Num),
      name: ele.ParamName,
      type: 'line',
      symbolSize: 1, // 标记的大小
      connectNulls: true, // 是否连接空数据
      // itemStyle: {
      //   //  折线拐点标志的样式。
      //   color: 'yellow',
      // },
      lineStyle: {
        // 线宽
        width: 1,
      },
      endLabel: {
        // 折线端点的标签。
        show: false,
        offset: [-50, -10],
        formatter: '{a}',
        color: '#ff3c58',
      },
      // animation:false // 是否开启动画
    });
  });
  const options = {
    legend: {
      data: legendData,
      show: true,
      left: '10%',
      itemWidth: 15,
      itemHeight: 1,
       selectedMode: false,
      textStyle: {
        // 图例的公用文本样式
        color: '#FFFFFF',
      },
    },
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      top: legendData.length>4?'25%':'15%',
      right: '2%',
      bottom: '0%',
      left: '2%',
      containLabel: true,
      tooltip: {
        show: true,
      },
    },
    xAxis: {
      data: [...new Set(xAxisData)],
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
          show: false,
          padding: [5, 5, 120, 5],
          color: '#ffffff',
          height: 200,
          lineHeight: 18,
          backgroundColor: '#00cc90',
          borderColor: '#ffffff',
          borderWidth: 1,
          formatter(params: any) {
            const paramStrlist: any = [];
            lineChartList.forEach((item) => {
              item.Datas.forEach((ele) => {
                if (ele.Ctime === params.value) {
                  paramStrlist.push(`${item.ParamName}\xa0\xa0${ele.Num}${item.ParamUnit}`);
                }
              });
            });
            const paramStr: string = paramStrlist.join().replace(/,/g, '\r\n');
            const timeStr = moment(params.value).format('DD日');
            return `${timeStr}\n${paramStr}`;
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
    series: seriesData,
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
.warnLineData {
  min-height: 230px;
  color: #ffffff;
}
</style>
