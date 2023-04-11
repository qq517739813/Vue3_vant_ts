<template>
  <div class="autoIrrigate">
    <van-nav-bar
      title="智能灌溉"
      class="title"
      fixed
      :border="false"
      placeholder
      safe-area-inset-top
      @click-left="onClickLeft"
    >
      <template #left>
        <van-icon name="arrow-left" size="20" color="#FFFFFF" style="margin-left: 11px" />
      </template>
    </van-nav-bar>
    <pull-refresh @pull-method="getDevBaseInfo" :equipmentId="equipmentId">
      <!-- <auto-irrigate-list :irrigateData="List.IrrigateList"  @getData="getDevBaseInfo"/> -->
      <auto-irrigate-list :irrigateData="List.IrrigateList" />
    </pull-refresh>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue';
import type { Ref } from 'vue';
import { userStore } from '@/store/user';
import { showLoadingToast, closeToast } from 'vant';
import { GetIrrigateList } from '@/api/autoIrrigate';
import pullRefresh from '@/components/pullRefresh.vue';
import AutoIrrigateList from './autoIrrigateList.vue';
import { IrrigateListItem } from './index';

const store = userStore();
// 设备基本信息
const List = reactive<IrrigateListItem>({ IrrigateList: [] });
// 切换设备id
const equipmentId: Ref<string> = ref('');

// 获取设备基本信息
const getDevBaseInfo = (DevId: string) => {
  showLoadingToast({
    message: 'loading...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0,
  });
  const payload = {
    Id: DevId,
  };
  GetIrrigateList(payload).then((res) => {
    if ((res as any).IsSuccess) {
      const { Data } = res as any;
      List.IrrigateList = Data;
      closeToast();
    }
  });
};
// 导航栏左侧事件
const onClickLeft = () => history.back();

onMounted(async () => {
  equipmentId.value = store.userInfo.Uid;
  await getDevBaseInfo(equipmentId.value);
});
//
</script>

<style scoped lang="less">
.autoIrrigate {
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
