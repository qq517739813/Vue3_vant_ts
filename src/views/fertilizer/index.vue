<template>
  <div class="fertilizer">
    <van-nav-bar
      title="施肥机"
      class="title"
      fixed
      :border="false"
      placeholder
      safe-area-inset-top
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #left>
        <van-icon name="arrow-left" size="20" color="#FFFFFF" style="margin-left: 11px" />
      </template>
      <template #right>
        <van-icon name="sort" size="20" color="#00cc90" style="transform: rotate(90deg)" />
        <span class="head-change">切换</span>
      </template>
    </van-nav-bar>
    <pull-refresh @pull-method="getDevBaseInfo" :equipmentId="equipmentId">
      <device-state :devBaseInfo="devInfo.devBaseInfo" />
      <device-switch
        v-model:popup-visbile="showPopup"
        @handele-dev="handClickDev"
        :curentDevId="equipmentId"
      />
      <fertilizer-data :fertilizerData="fertilizer.fertilizerInfo.Param" />
      <!-- <fertilizer-list :fertilizerList="fertilizer.fertilizerInfo.CtrlParam" @getData="getDevBaseInfo" :equipmentId="equipmentId"/> -->
      <fertilizer-list
        :fertilizerList="fertilizer.fertilizerInfo.CtrlParam"
        :comparePwd="fertilizer.fertilizerInfo.ControlPwd"
      />
    </pull-refresh>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed, ref, reactive } from 'vue';
import type { Ref, ComputedRef } from 'vue';
import { useRoute } from 'vue-router';
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { userStore } from '@/store/user';
import { showLoadingToast, closeToast } from 'vant';
import { GetDevInfo } from '@/api/equipment';
import { GetFertilizerList } from '@/api/fertilizer';
import { getdevList } from '@/utils/base';
import { DevInfoItem, DevListBaseItem } from '@/components/index';
import { FertilizerInfoItem } from './index';
import pullRefresh from '@/components/pullRefresh.vue';
import DeviceState from '@/components/deviceState.vue';
import DeviceSwitch from '@/components/deviceSwitch.vue';
import FertilizerData from './fertilizerData.vue';
import FertilizerList from './fertilizerList.vue';

const route: RouteLocationNormalizedLoaded = useRoute();
const store = userStore();
// popup弹窗状态
const showPopup: Ref<boolean> = ref(false);
// 设备基本信息
const devInfo = reactive<DevInfoItem>({ devBaseInfo: { DevId: '', ControlPwd: '' } });
// 施肥机数据
const fertilizer = reactive<FertilizerInfoItem>({
  fertilizerInfo: {
    DevId: '',
    ControlPwd: '',
    Param: [],
    CtrlParam: [],
  },
});
// 切换设备id
const equipmentId: Ref<string> = ref('');
// 路由参数
const countFuncode: ComputedRef = computed(() => {
  return route.params.FunCode;
});
// 路由参数(设备id)
const countObjId: ComputedRef = computed(() => {
  return route.query.ObjId;
});
// 获取设备基本信息
const getDevBaseInfo = async (DevId: string) => {
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
  const res: any = await GetDevInfo(payload);
  devInfo.devBaseInfo = res.Data;
  // 获取施肥机状态数据
  const info: any = await GetFertilizerList({ Id: equipmentId.value });
  fertilizer.fertilizerInfo = info.Data;
  closeToast();
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
  // 获取设备列表
  await getdevList(countFuncode.value);
  equipmentId.value = countObjId.value || store.devList[0].DevId;
  await getDevBaseInfo(equipmentId.value);
});
</script>

<style scoped lang="less">
.fertilizer {
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
