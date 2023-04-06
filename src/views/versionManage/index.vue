<template>
  <div class="versionManage">
    <van-nav-bar
      title="版本更新记录"
      class="title"
      fixed
      :border="false"
      placeholder
      safe-area-inset-top
      @click-left="onClickLeft"
    >
      <template #left>
        <van-icon name="arrow-left" size="20" color="#FFFFFF" />
      </template>
    </van-nav-bar>
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="onRefresh"
      class="versionManage-pull-refresh"
    >
      <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
      <template #pulling="props">
        <div class="pulling" :style="{ height: props.distance }">
          <van-icon name="arrow-down" />
          <span>下拉即可刷新...</span>
        </div>
      </template>
      <!-- 释放提示 -->
      <template #loosing>
        <div class="loosing">
          <van-icon name="arrow-up" />
          <span>释放即可刷新...</span>
        </div>
      </template>
      <van-card class="versionManage-card" v-for="item in versionInfo.versionList" :key="item.Id">
        <template #title>
          <div class="title">
            <span>{{ item.Ctime }}</span>
            <span>版本:{{ item.VersionStr }}</span>
          </div>
        </template>
        <template #desc>
          <div class="desc">
            <span>更新内容</span>
            <span>{{ item.Description }}</span>
          </div>
        </template>
      </van-card>
    </van-pull-refresh>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue';
import type { Ref } from 'vue';
import { userStore } from '@/store/user';
import { showLoadingToast, closeToast } from 'vant';
import { getVersionList } from '@/api/user';
import { VersionItem } from './index';

const store = userStore();
const loading: Ref<boolean> = ref(false);
const refreshLoading: Ref<boolean> = ref(false);
const versionInfo = reactive<VersionItem>({
  versionList: [],
});

// 获取版本更新记录
const initData = () => {
  loading.value = true;
  showLoadingToast({
    message: 'loading...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0,
  });
  const payload = {
    Condition: 'IotCommon',
    Page: 1,
    PageSize: 100,
    Token: store.userInfo.Token,
  };
  getVersionList(payload).then((res) => {
    if ((res as any).IsSuccess) {
      const { Data } = res as any;
      versionInfo.versionList = Data;
      loading.value = false;
      closeToast();
    }
  });
};
// 下拉刷新
const onRefresh = () => {
  refreshLoading.value = true;
  initData();
  refreshLoading.value = false;
};
const onClickLeft = () => history.back();
onMounted(() => {
  initData();
});
</script>

<style scoped lang="less">
.versionManage {
  .title {
    :deep(.van-nav-bar--fixed) {
      background: #1f2228;

      .van-nav-bar__title {
        font-weight: normal;
        font-size: 18px;
        color: #ffffff;
      }
      .head-change {
        margin-left: 5px;
        font-size: 14px;
        color: #00cc90;
      }
    }
  }
  .versionManage-pull-refresh {
    :deep(.van-pull-refresh__track) {
      min-height: calc(100vh - 46px);
    }
    .versionManage-card {
      background: #1f2228;
      border-bottom: 0.5px solid rgba(255, 255, 255, 0.1);
      .title {
        display: flex;
        justify-content: space-between;
        span {
          font-size: 16px;
          color: #9e9e9e;
        }
      }
      .desc {
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        font-size: 14px;
        color: #9e9e9e;
        span {
          margin-top: 5px;
        }
      }
    }
  }
  .pulling,
  .loosing {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    font-size: 20px;

    span {
      margin-left: 10px;
    }
  }
}
</style>
