<template>
  <div class="deviceState">
    <div class="device-state-title">设备状态提醒</div>
    <div class="device-state-content">
      <van-row gutter="20">
        <van-col span="24">
          <span>设备ID号:</span>
          <span>{{ props.devBaseInfo.DevId }}</span>
        </van-col>
        <van-col span="24">
          <span>设备名称:</span>
          <span>{{ props.devBaseInfo.DevName }}</span>
        </van-col>
        <van-col span="12">
          <span>在线状态:</span>
          <span>{{ props.devBaseInfo.Online }}</span>
        </van-col>
        <van-col span="12" v-if="countFuncode !== 'Fertilizer'">
          <span>通信方式:</span>
          <span>{{ props.devBaseInfo.NetMode }}</span>
        </van-col>
        <van-col span="12" v-if="countFuncode !== 'Fertilizer'">
          <span>信号强度:</span>
          <span>{{ props.devBaseInfo.Signal }}</span>
        </van-col>
        <van-col span="12" v-if="countFuncode !== 'Fertilizer'">
          <span>供电方式:</span>
          <span>{{ props.devBaseInfo.Power }}</span>
        </van-col>
        <van-col span="24">
          <span>心跳时间:</span>
          <span>{{ props.devBaseInfo.HeartBeat }}</span>
        </van-col>
      </van-row>
    </div>
    <!-- <van-skeleton :animate="false" class="device-state-content">
        <template #template>
          <div :style="{ display: 'flex', width: '100%' }">
            <div :style="{ flex: 1}">
              <van-skeleton-paragraph>
                <div>设备ID号:</div>
              </van-skeleton-paragraph>
              <van-skeleton-paragraph>设备名称:</van-skeleton-paragraph>
              <van-skeleton-paragraph>在线状态:</van-skeleton-paragraph>
              <van-skeleton-paragraph>供电方式:</van-skeleton-paragraph>
              <van-skeleton-paragraph>心跳时间:</van-skeleton-paragraph>
            </div>
          </div>
        </template>
      </van-skeleton> -->
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { ComputedRef } from 'vue';
import { DevInfoBaseItem } from './index';
import { useRoute } from 'vue-router';
import type { RouteLocationNormalizedLoaded } from 'vue-router';

const route: RouteLocationNormalizedLoaded = useRoute();

interface Props {
  devBaseInfo: DevInfoBaseItem;
}
const props = withDefaults(defineProps<Props>(), {
  devBaseInfo: () => {
    return {};
  },
});
// 路由参数
const countFuncode: ComputedRef = computed(() => {
  return route.params.FunCode;
});
</script>

<style scoped lang="less">
.deviceState {
  .device-state-title {
    font-size: 16px;
    color: #cccccc;
    margin: 14px 0;
  }
  .device-state-content {
    padding: 7px 0 10px 11px;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 14px;
    color: #ffffff;
    .van-col {
      line-height: 21px;
      span:nth-child(1) {
        margin-right: 5px;
        color: #999999;
      }
    }
  }
}
</style>
