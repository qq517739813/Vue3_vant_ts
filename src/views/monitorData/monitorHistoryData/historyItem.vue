<template>
  <div class="historyItem">
    <div class="historyItem-title">
      <span>采集数据</span>
      <span>{{ computedTitle }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { HistoryItem } from './index';

interface Props {
  dateTitle: {
    Bdate: string;
    Edate: string;
  };
  lineChartData: HistoryItem[];
}
// 父传子数据
const props = withDefaults(defineProps<Props>(), {
  dateTitle: () => {
    return { Bdate: '', Edate: '' };
  },
  lineChartData: () => [],
});

// 时间标题
const computedTitle = computed(() => {
  const list = [...new Set(Object.values(props.dateTitle))];
  return list.join('~');
});
</script>

<style scoped lang="less">
.historyItem {
  .historyItem-title {
    margin: 14px 0;
    span:first-child {
      margin-right: 10px;
      font-size: 16px;
      color: #cccccc;
    }
    font-size: 14px;
    color: #999999;
  }
}
</style>
