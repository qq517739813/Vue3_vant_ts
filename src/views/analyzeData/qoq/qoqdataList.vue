<template>
  <div class="qoqdataList" v-for="(item, index) in analysisQoqList.MonitorList" :key="index">
    <div class="head">
      <div>{{ analysisQoqList.ParamName }}</div>
      <div>{{ moment(item.Ctime).format('YYYY-MM') }}</div>
    </div>
    <div class="content">
      <div class="content-item">
        <span>设备名称:</span>
        <span>{{ analysisQoqList.DevName }}</span>
      </div>
      <div class="content-item">
        <span>设备ID号:</span>
        <span>{{ analysisQoqList.DevId }}</span>
      </div>
      <div class="content-item">
        <span>平均值:</span>
        <span>{{ item.ParamVal }}{{ analysisQoqList.ParamUnit }}</span>
      </div>
      <div class="content-item">
        <span>最高值:</span>
        <span>{{ item.MaxVal }}{{ analysisQoqList.ParamUnit }}</span>
      </div>
      <div class="content-item">
        <span>最低值:</span>
        <span>{{ item.MinVal }}{{ analysisQoqList.ParamUnit }}</span>
      </div>
      <div class="content-item">
        <span>正常范围值:</span>
        <span
          >{{ analysisQoqList.NorMinVal }}~{{ analysisQoqList.NorMaxVal
          }}{{ analysisQoqList.ParamUnit }}</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue';
import { QoqDataItem } from '../index';
import moment from 'moment';

// 接收数据
const { analysisQoqList } = inject('analysisQoqList') as QoqDataItem;
</script>

<style scoped lang="less">
.qoqdataList {
  margin: 14px 16px;
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
