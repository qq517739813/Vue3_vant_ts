<template>
  <div class="home">
    <van-nav-bar fixed :border="false" placeholder safe-area-inset-top class="title" title="首页" />
    <pull-refresh @pull-method="initData" :equipmentId="store.userInfo.Uid">
      <!-- 饼图 -->
      <pie-chart :chartData="devInfo" v-if="!loading" />
      <!-- 农场地块 -->
      <farm-plot :plotData="devInfo.DevSummary.DevType" v-if="!loading" />
    </pull-refresh>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import type { Ref } from 'vue';
import { userStore } from '@/store/user';
import { showLoadingToast, closeToast } from 'vant';
import { devSummary } from '@/api/equipment';
import { DevSummaryItem } from './index';
import pullRefresh from '@/components/pullRefresh.vue';
import PieChart from './pieChart.vue';
import FarmPlot from './farmPlot.vue';

const store = userStore();
const devInfo = reactive<DevSummaryItem>({
  DevSummary: {},
});
const loading: Ref<boolean> = ref(false);

// 获取设备汇总数据
const initData = async (Uid: string) => {
  loading.value = true;
  showLoadingToast({
    message: 'loading...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0,
  });
  const payload = {
    Uid,
    Token: store.userInfo.Token,
  };
  const res: any = await devSummary(payload);
  devInfo.DevSummary = res.Data;
  loading.value = false;
  closeToast();
};
onMounted(() => {
  initData(store.userInfo.Uid);
});
</script>

<style scoped lang="less">
.home {
  padding: 0 16px;

  .title {
    :deep(.van-nav-bar--fixed) {
      background: #1f2228;

      .van-nav-bar__title {
        font-weight: normal;
        font-size: 18px;
        color: #ffffff;
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
