<template>
  <div class="liveVideo">
    <div class="content">
      <div class="title">
        <div class="left">
          <span>{{ videoData.videoBaseInfo?.DevName }}</span>
          <span>{{ countTime }}</span>
        </div>
        <div class="right">
          <span>当前状态:</span>
          <span>{{ videoData.videoBaseInfo?.Online }}</span>
        </div>
      </div>
      <div class="video">
        <!-- <video :src="videoData.videoBaseInfo?.AppletAddr"></video> -->
      </div>
      <div class="control">
        <div class="move">
          <img class="circle" src="@/assets//video-move.svg" alt="" />
          <img class="up" src="@/assets/move-up.svg" alt="" @click="onMovePhoto('up')" />
          <img class="down" src="@/assets/move-down.svg" @click="onMovePhoto('down')" alt="" />
          <img class="left" src="@/assets/move-left.svg" @click="onMovePhoto('left')" alt="" />
          <img class="right" src="@/assets/move-right.svg" @click="onMovePhoto('right')" alt="" />
          <img class="center" src="@/assets/take-photo.svg" @click="onMovePhoto('center')" alt="" />
        </div>
        <div class="zoom">
          <div class="item zoomIn" @click="onMovePhoto('zoomIn')">
            <img src="@/assets/zoomIn.svg" alt="" />
          </div>
          <div class="item fullScreen" @click="onMovePhoto('fullScreen')">
            <img src="@/assets/fullScreen.svg" alt="" />
          </div>
          <div class="item zoomOut" @click="onMovePhoto('zoomOut')">
            <img src="@/assets/zoomOut.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, computed } from 'vue';
import type { ComputedRef } from 'vue';
import { VideoInfoItem } from './index';
import { optVideoMove } from '@/api/videoData';
import { userStore } from '@/store/user';
import moment from 'moment';
import { showToast, showLoadingToast,closeToast } from 'vant';

const store = userStore();
// 接收数据
const videoData = inject('videoInfo') as VideoInfoItem;
const loading = ref(false);
// 视频直播当前时间
const countTime: ComputedRef = computed(() => {
  return moment().format('YYYY-MM-DD HH:mm');
});
const onMovePhoto = async (Val: string) => {
  if (Val === 'center') {
    showToast({
      message: '拍照失败',
      duration: 1000,
    });
    return;
  }
  showLoadingToast({
    message: 'loading...',
    duration: 0,
  });
  loading.value = true;
  const payload = {
    Val,
    DevId: videoData.videoBaseInfo?.DevId,
    Token: store.userInfo.Token,
  };
  const res = (await optVideoMove(payload)) as any;
  console.log('res', res);
  loading.value = false;
  closeToast();
};
</script>

<style scoped lang="less">
.liveVideo {
  color: #fff;
  margin-top: 14px;
  padding: 0 16px;
  .content {
    height: 448px;
    border-radius: 4px;
    box-sizing: border-box;
    border: 0.5px solid rgba(255, 255, 255, 0.1);
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 14px;
      .left {
        display: flex;
        flex-direction: column;
        font-size: 16px;
        color: #ffffff;
        span:last-child {
          font-size: 14px;
          line-height: 21px;
          color: rgba(255, 255, 255, 0.4);
        }
      }
      .right {
        font-size: 14px;
        span:last-child {
          color: #00cc90;
        }
      }
    }
    .video {
      height: 194px;
      background: rgba(255, 255, 255, 0.1);
    }
    .control {
      display: flex;
      height: 188px;
      .move {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 50%;
        border-right: 0.5px solid rgba(255, 255, 255, 0.1);
        .circle {
          width: 140px;
          height: 140px;
        }
        .up {
          position: absolute;
          top: 42px;
        }
        .down {
          position: absolute;
          bottom: 42px;
        }
        .left {
          position: absolute;
          left: 35px;
        }
        .right {
          position: absolute;
          right: 35px;
        }
        .center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .zoom {
        display: flex;
        flex-wrap: wrap;
        width: 50%;
        .item {
          width: 49.5%;
          height: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .zoomIn {
          border-bottom: 0.5px solid rgba(255, 255, 255, 0.1);
          border-right: 0.5px solid rgba(255, 255, 255, 0.1);
        }
        .fullScreen {
          border-bottom: 0.5px solid rgba(255, 255, 255, 0.1);
        }
        .zoomOut {
          border-right: 0.5px solid rgba(255, 255, 255, 0.1);
        }
      }
    }
  }
}
</style>
