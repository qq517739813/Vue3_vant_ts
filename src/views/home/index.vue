<template>
  <div class="home" v-if="!loading">
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
      <PieChart :chartData="devInfo" />
      <div class="head">农场地块</div>
      <main class="allFarm">
        <div class="allFarm_item" v-for="item in devInfo.DevSummary.DevType" :key="item.TypeId">
          <img :src="item.Icon" alt="">
          <span class="item-title">{{ item.TypeName }}</span>
          <div class="item-text">运行<span>{{ item.OnlineNum }}</span>/总{{ item.AllNum }}</div>
        </div>
      </main>
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


  .allFarm {
    display: flex;
    flex-wrap: wrap;

    .allFarm_item {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 14px;
      width: 104px;
      height: 108px;
      border-radius: 4px;
      border: 1px solid #333333;

      img {
        margin-top: 12px;
        width: 40px;
        height: 40px;
      }

      .item-title {
        margin: 5px 0 2px;
        font-size: 14px;
        color: #CCCCCC;
      }

      .item-text {
        font-size: 12px;
        color: #d2d3d4;
      }

      span {
        color: #00CC90;
      }
    }

    .allFarm_item:nth-child(3n-1) {
      margin: 0 14px;
    }
  }
}
</style>
