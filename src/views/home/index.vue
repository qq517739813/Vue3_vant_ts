<template>
  <div class="home">
    <div class="title">首页</div>
    <van-pull-refresh v-model="refreshLoading" @refresh="onRefresh">
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
      <div class="head">共有<span>{{ devInfo.DevSummary.AllNum }}</span>台设备</div>
      <!-- 饼图 -->
      <pie-chart :chartData="devInfo" />
      <div class="head">农场地块</div>
      <!-- 农场地块 -->
      <farm-plot :plotData="devInfo.DevSummary.DevType" />
    </van-pull-refresh>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { userStore } from '@/store/user';
// import { showLoadingToast } from 'vant';
import { devSummary } from '@/api/home'
import { DevSummaryItem } from './index'
import PieChart from './pieChart.vue'
import FarmPlot from './farmPlot.vue'

const store = userStore();
const devInfo = reactive<DevSummaryItem>({
  DevSummary: {}
})
const loading = ref<boolean>(false)
const refreshLoading = ref<boolean>(false)

// 获取设备汇总数据
const initData = () => {
  // showLoadingToast({
  //   message: 'loading...',
  //   forbidClick: true,
  //   loadingType: 'spinner',
  //   duration:200,
  // });
  loading.value = true
  const payload = {
    Uid: store.userInfo.Uid,
    Token: store.userInfo.Token,
  }
  devSummary(payload).then(res => {
    if ((res as any).IsSuccess) {
      const { Data } = (res as any);
      devInfo.DevSummary = Data
      loading.value = false;
    }
  })
}
// 下拉刷新
const onRefresh = () => {
  refreshLoading.value = true;
  initData()
  refreshLoading.value = false;
};
onMounted(() => {
  initData()
});
</script>

<style scoped lang="less">
.home {
  padding: 0 16px;

  .title {
    text-align: center;
    padding-top: 10px;
    font-size: 18px;
    color: #FFFFFF;
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

  .head {
    padding: 24px 0 12px;
    font-size: 16px;
    color: #9E9E9E;

    span {
      color: #00CC90;
    }
  }
}
</style>
