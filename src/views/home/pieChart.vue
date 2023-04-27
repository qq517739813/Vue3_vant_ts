<template>
  <div class="pieChart">
    <div class="pieChart-title">
      共有<span>{{ props.chartData.DevSummary.AllNum }}</span
      >台设备
    </div>
    <div class="pieChart-main">
      <div id="main" style="width: 100%; height: 175px"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import * as echarts from 'echarts';
import { EchartsDataItem } from './index';

// 父传子数据
const props = defineProps({
  chartData: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
// chart实列
const myChart: any = ref(null);
// 绘制图表
const initChart = () => {
  const main = document.getElementById('main') as HTMLDivElement;
  myChart.value = echarts.init(main);
  const { DevSummary } = props.chartData;
  const list: EchartsDataItem = {
    OnlineNum: '在线',
    ReadyNum: '待机',
    FaultNum: '异常',
  };
  const arr = Object.keys(list);
  let data: EchartsDataItem = {
    value: 0,
    name: '',
  };
  const echartData = arr.map((item) => {
    for (const key in DevSummary) {
      if (key === item) {
        data = {
          value: (DevSummary as any)[key] === 0 ? null : (DevSummary as any)[key],
          name: key,
        };
      }
    }
    return data;
  });
  // if(myChart) echart.dispose()
  const options = {
    title: {
      text: '运行状态',
      left: '20%',
      top: 'center',
      textStyle: {
        fontSize: 14,
        color: '#CCCCCC',
      },
      show: true,
    },
    legend: {
      selectedMode: false,
      top: 'middle',
      right: '5%',
      orient: 'vertical',
      icon: 'circle',
      itemWidth: 10,
      temHeight: 10,
      itemGap: 20,
      textStyle: {
        fontSize: 20,
        rich: {
          oneone: {
            color: '#9E9E9E',
            fontSize: 14,
          },
          twotwo: {
            color: '#FFFFFF',
            fontSize: 14,
          },
        },
        padding: [0, 0, -2, 0],
      },
      formatter: (name: string) => {
        // formatter格式化函数动态呈现数据
        for (const key in DevSummary) {
          if (key === name) {
            return `{oneone|${(list as any)[name]}}  {twotwo|${(DevSummary as any)[key]}}`;
          }
        }
      },
    },
    color: ['#04A519', '#2E7FF9', '#F9892E'],
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '80%'],
        center: ['30%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'inside',
          color: '#FFFFFF',
          fontSize: 12,
          formatter(param: any) {
            // correct the percentage
            return `${param.percent}%`;
          },
        },
        labelLine: {
          show: false,
          length: 10,
          length2: 10,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 12,
            color: '#FFFFFF',
          },
        },
        data: echartData,
        legendHoverLink: false,
      },
    ],
  };
  myChart.value.setOption(options);
  window.onresize = function () {
    // 自适应大小
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
.pieChart {
  .pieChart-title {
    margin: 14px 0;
    font-size: 16px;
    color: #9e9e9e;

    span {
      color: #00cc90;
    }
  }
  .pieChart-main {
    color: #fff;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
}
</style>
