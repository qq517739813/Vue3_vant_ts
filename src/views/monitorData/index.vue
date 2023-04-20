<template>
  <div class="monitorData">
    <van-nav-bar
      title="实时数据"
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
      <device-switch v-model:popup-visbile="showPopup" @handele-dev="handClickDev" />
      <device-state :devBaseInfo="devInfo.devBaseInfo" />
      <real-data :realList="realInfo.realList" :equipmentId="equipmentId" :realTime="timeStr" />
    </pull-refresh>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed, ref, reactive,onActivated, onDeactivated  } from 'vue';
import type { Ref, ComputedRef } from 'vue';
import { useRoute } from 'vue-router';
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { userStore } from '@/store/user';
import { showLoadingToast, closeToast } from 'vant';
import { GetDevInfo } from '@/api/equipment';
import { GetRealDataList } from '@/api/monitorData';
import { RealListItem } from './index';
import { DevInfoItem, DevListBaseItem } from '@/components/index';
import DeviceState from '@/components/deviceState.vue';
import pullRefresh from '@/components/pullRefresh.vue';
import DeviceSwitch from '@/components/deviceSwitch.vue';
import RealData from './realData.vue';
import { getdevList } from '@/utils/base';
import moment from 'moment';

const route: RouteLocationNormalizedLoaded = useRoute();
const store = userStore();
// popup弹窗状态
const showPopup: Ref<boolean> = ref(false);
// 设备基本信息
const devInfo = reactive<DevInfoItem>({ devBaseInfo: { DevId: '', ControlPwd: '' } });
// 实时数据
const realInfo = reactive<RealListItem>({ realList: [] });
// 切换设备id
const equipmentId: Ref<string> = ref('');
// 实时数据时间
const timeStr: Ref<string> = ref('');
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
    Token: store.userInfo.Token,
    ObjId: DevId,
  };
  const res: any = await GetDevInfo({ ...payload, Uid: store.userInfo.Uid });
  devInfo.devBaseInfo = res.Data;
  const info: any = await GetRealDataList(payload);
  realInfo.realList = info.Data;
  timeStr.value = moment().format('YYYY-MM-DD');
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
onActivated(() => {
  // 调用时机为首次挂载
  // 以及每次从缓存中被重新插入时
})

onDeactivated(() => {
  // 在从 DOM 上移除、进入缓存
  // 以及组件卸载时调用
})
</script>

<style scoped lang="less">
.monitorData {
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
