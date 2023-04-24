<template>
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <div
      class="warnTableData"
      v-for="(item, index) in props.tableDataList.tableDataList"
      :key="index"
    >
      <div class="head">
        <div>{{ item.ParamName }}</div>
        <div>{{ item.Ctime }}</div>
      </div>
      <div class="content">
        <div class="content-item">
          <span>设备名称:</span>
          <span>{{ item.DevName }}</span>
        </div>
        <div class="content-item">
          <span>参数名称:</span>
          <span>{{ item.ParamName }}</span>
        </div>
        <div class="content-item">
          <span>异常数据:</span>
          <span>{{ item.ParamVal }}{{ item.ParamUnit }}</span>
        </div>
        <div class="content-item">
          <span>参考范围:</span>
          <span>{{ item.MinVal }}~{{ item.MaxVal }}{{ item.ParamUnit }}</span>
        </div>
      </div>
    </div>
  </van-list>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import type { Ref } from 'vue';
import { TableListItem } from './index';
import { DateItem } from '@/components/index';

interface Props {
  tableDataList: TableListItem;
  paramIds: string;
  rangeCalendar: DateItem;
}
// 父传子数据
const props = withDefaults(defineProps<Props>(), {
  tableDataList: () => {
    return { Page: 1, PageSize: 10, RecordNum: 0, tableDataList: [] };
  },
  paramIds: '',
  rangeCalendar: () => {
    return { calendar: { Bdate: '', Edate: '' } };
  },
});
// 父子传方法
const emit = defineEmits<{
  (e: 'editRequestPage', value: number): void;
}>();

const loading: Ref<boolean> = ref(false);
const finished: Ref<boolean> = ref(false);
const onLoad = () => {
  const { tableDataList, RecordNum, Page } = props.tableDataList;
  setTimeout(() => {
    loading.value = true;
    emit('editRequestPage', Page + 1);
    loading.value = false;
    if (tableDataList.length >= RecordNum) {
      finished.value = true;
    }
  }, 1000);
};

onMounted(() => {});
onUnmounted(() => {});
</script>

<style scoped lang="less">
.warnTableData {
  margin: 14px 0;
  box-sizing: border-box;
  color: #ffffff;
  border-radius: 4px;
  border: 0.5px solid rgba(255, 255, 255, 0.1);
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px;
    border-bottom: 0.5px solid rgba(255, 255, 255, 0.1);
    font-size: 14px;
    color: #ffffff;
  }
  .content {
    padding: 10px 12px;
    font-size: 14px;
    .content-item {
      line-height: 21px;
      color: #9e9e9e;
      span:last-child {
        margin-left: 5px;
        color: #ffffff;
      }
    }
  }
}
</style>
