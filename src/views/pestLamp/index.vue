<template>
  <div class="pestLamp">
    <van-nav-bar
      title="虫情测报"
      class="title"
      fixed
      :border="false"
      placeholder
      safe-area-inset-top
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #left>
        <van-icon name="arrow-left" size="20" color="#FFFFFF" style="margin-left: 11px"/>
      </template>
      <template #right>
        <van-icon name="sort" size="20" color="#00cc90" style="transform: rotate(90deg)" />
        <span class="head-change">切换</span>
      </template>
    </van-nav-bar>
    <pull-refresh @pull-method="getDevBaseInfo" :equipmentId="equipmentId">
      <device-state  :devBaseInfo="devInfo.devBaseInfo" />
      <device-switch v-model:popup-visbile="showPopup" @handele-dev="handClickDev" />
    </pull-refresh>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed, ref,reactive } from 'vue';
import type { Ref, ComputedRef } from 'vue';
import { useRoute } from 'vue-router';
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { userStore } from '@/store/user';
import { showLoadingToast, closeToast } from 'vant';
import { GetDevInfo } from '@/api/equipment';
import { getdevList } from '@/utils/base';
import { DevInfoItem, DevListBaseItem } from '@/components/index';
import pullRefresh from '@/components/pullRefresh.vue'
import DeviceState from '@/components/deviceState.vue'
import DeviceSwitch from '@/components/deviceSwitch.vue';

const route: RouteLocationNormalizedLoaded = useRoute();
const store = userStore();
// popup弹窗状态
const showPopup: Ref<boolean> = ref(false);
// 设备基本信息
const devInfo = reactive<DevInfoItem>({ devBaseInfo: {} });
// 切换设备id
const equipmentId: Ref<string> = ref('');
// 路由参数
const countFuncode: ComputedRef = computed(() => {
  return route.params.FunCode;
});
// 获取设备基本信息
const getDevBaseInfo = (DevId: string) => {
  showLoadingToast({
    message: 'loading...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0,
  });
  const payload = {
    Uid: store.userInfo.Uid,
    Token: store.userInfo.Token,
    ObjId: DevId,
  };
  GetDevInfo(payload).then((res) => {
    if ((res as any).IsSuccess) {
      const { Data } = res as any;
      devInfo.devBaseInfo = Data;
      closeToast();
    }
  });
};
// 导航栏左侧事件
const onClickLeft = () => history.back();
// 导航栏右侧事件
const onClickRight = () => {
  showPopup.value = true;
};
// 切换设备点击事件
const handClickDev = (item: DevListBaseItem) => {
  equipmentId.value = item.DevId;
  getDevBaseInfo(item.DevId);
  showPopup.value = false;
};
onMounted(async () => {
  await getdevList(countFuncode.value);
  equipmentId.value = store.devList[0].DevId;
  await getDevBaseInfo(equipmentId.value);
});
</script>

<style scoped lang="less">
.pestLamp {
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
}
</style>
