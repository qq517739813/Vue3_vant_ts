<template>
  <div class="pieDiagram">
    <div id="pieDiagramMain" style="width: 100%; height: 175px"></div>
    <div class="total">
      <span>采集总量</span>
      <span class="total-val">{{ countTotal }}</span>
    </div>
    <div class="range">
      <span>正常范围</span>
      <span class="range-val">{{ countRangge }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, inject, computed } from 'vue';
import type { ComputedRef } from 'vue';
import * as echarts from 'echarts';
import { ChartItem, ChartBaseItem } from '../index';

// 接收数据
const chartList = inject('parmaChart') as ChartItem;
// 计算饼图标题
const countPieitle: ComputedRef = computed(() => {
  const newestNum = chartList.analysisChartList[0].ParamName;
  return newestNum;
});
// 计算采集总量
const countTotal: ComputedRef = computed(() => {
  const newestTotal = chartList.analysisChartList[0].AllNum;
  return newestTotal;
});
// 计算正常范围
const countRangge: ComputedRef = computed(() => {
  const newestRange = chartList.analysisChartList[0];
  const { NorMinVal, NorMaxVal, ParamUnit } = newestRange;
  return `${NorMinVal.toFixed(1)}~${NorMaxVal.toFixed(1)}${ParamUnit}`;
});
// chart实列
const myChart: any = ref(null);
// 绘制图表
const initChart = () => {
  const main = document.getElementById('pieDiagramMain') as HTMLDivElement;
  myChart.value = echarts.init(main);
  const pieChart: ChartBaseItem = chartList.analysisChartList[0];
  const list = {
    NorNum: '正常值',
    UpNum: '偏高值',
    LowNum: '偏低值',
  };
  const arr = Object.keys(list);
  let data = {
    value: 0,
    name: '',
  };
  const echartData = arr.map((item) => {
    for (const key in pieChart) {
      if (key === item) {
        data = {
          value: (pieChart as any)[key] === 0 ? null : (pieChart as any)[key],
          name: key,
        };
      }
    }
    return data;
  });
  const options = {
    title: {
      text: countPieitle.value,
      left: '20%',
      top: 'middle',
      textStyle: {
        fontSize: 12,
        color: '#CCCCCC',
      },
      show: true,
    },
    legend: {
      selectedMode: false,
      top: 'middle',
      right: '0%',
      orient: 'vertical',
      icon: 'rect',
      itemWidth: 6,
      itemHeight: 6,
      itemGap: 20,
      textStyle: {
        rich: {
          oneone: {
            fontSize: 12,
          },
          twotwo: {
            fontSize: 12,
          },
        },
      },
      formatter: (name: string) => {
        // formatter格式化函数动态呈现数据
        for (const key in pieChart) {
          if (key === name) {
            return `{oneone|${(list as any)[name]}}  {twotwo|${(pieChart as any)[key]}}`;
          }
        }
      },
      data: [
        {
          name: 'NorNum',
          icon: 'rect',
          textStyle: {
            fontSize: 12,
            color: '#00cc90',
          },
        },
        {
          name: 'UpNum',
          icon: 'rect',
          textStyle: {
            fontSize: 12,
            color: '#fd3a51',
          },
        },
        {
          name: 'LowNum',
          icon: 'rect',
          textStyle: {
            fontSize: 12,
            color: '#5591f4',
          },
        },
      ],
    },
    color: ['#00cc90', '#fd3a51', '#5591f4'],
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['45%', '90%'],
        center: ['30%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'inside',
          color: '#FFFFFF',
          fontSize: 12,
          formatter(param: any) {
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
  // myChart.value.dispose();
});
</script>

<style scoped lang="less">
.pieDiagram {
  .total,
  .range {
    margin-top: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      font-size: 14px;
      color: #cccccc;
    }
    .total-val {
      font-size: 16px;
      color: #00cc90;
      font-weight: 500;
    }
    .range-val {
      font-size: 16px;
      color: #fff;
      font-weight: 500;
    }
  }
}
</style>
