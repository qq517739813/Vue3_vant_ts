<template>
  <div class="warnSetting">
    <van-nav-bar
      title="报警设置"
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
      class="warnSetting-pull-refresh"
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
      <div class="warnTime-title">报警时间</div>
      <van-row justify="space-between">
        <van-col span="6">span: 6</van-col>
        <van-col span="6">span: 6</van-col>
        <van-col span="6">span: 6</van-col>
      </van-row>
      <van-form @submit="onSubmit">
        <van-field name="switch" label="开关">
          <template #input>
            <van-switch v-model="checked" size="20" />
          </template>
        </van-field>

        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit"> 提交 </van-button>
        </div>
      </van-form>
      <div class="warnStyle-title">报警方式</div>
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
const checked: Ref<boolean>  = ref(false);
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
// 后退
const onClickLeft = () => history.back();
// 报警设置保存事件
const onSubmit = (values:any) => {
      console.log('submit', values);
    };
onMounted(() => {
  initData();
});
</script>

<style scoped lang="less">
.warnSetting {
  padding: 0 16px;
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
  .warnSetting-pull-refresh {
    :deep(.van-pull-refresh__track) {
      min-height: calc(100vh - 46px);
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
  .warnTime-title,
  .warnStyle-title {
    margin-top: 24px;
    font-size: 16px;
    color: #cccccc;
  }
  .warnStyle-title {
    margin-top: 38px;
  }
}
</style>
