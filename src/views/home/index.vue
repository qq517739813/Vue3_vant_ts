<template>
  <div class="home">
    <van-nav-bar fixed :border="false" placeholder safe-area-inset-top class="title" title="首页" />
    <!-- 认养信息 -->
    <adoption-info v-if="!loading" :adoptInfo="adopt.adoptInfo" />
    <div class="line" v-if="!loading"></div>
    <!-- 地块信息 -->
    <field-info v-if="!loading" :fieldInfo="field.fieldInfo" />
    <div class="line" v-if="!loading"></div>
    <!-- 农事记录 -->
    <farm-record v-if="!loading" :farmRecord="farm.farmInfo"/>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import type { Ref } from 'vue';
import { showLoadingToast, closeToast } from 'vant';
import { getUserSummaryData, getFieldList, getActList } from '@/api/home';
import { AdoptionInfoItem, FieldInfoItem, FarmRecordItem } from './index';
import AdoptionInfo from './adoptionInfo.vue';
import FieldInfo from './fieldInfo.vue';
import FarmRecord from './farmRecord.vue';

// 控制显示状态
const loading: Ref<boolean> = ref(false);
// 认养信息
const adopt = reactive<AdoptionInfoItem>({ adoptInfo: {} });
// 地块信息
const field = reactive<FieldInfoItem>({ fieldInfo: {} });
// 农事记录
const farm = reactive<FarmRecordItem>({ farmInfo: {} });
// 获取地块信息
const getFieldData = async (isAll: boolean) => {
  const payload = {
    page: 1,
    pageSize: 2,
    isAll,
  };
  const { data: fieldRes } = await getFieldList(payload);
  field.fieldInfo = fieldRes;
};
// 获取农事记录
const getFarmRecord = async (isAll: boolean) => {
  const payload = {
    page: 1,
    pageSize: 10,
    isAll,
  };
  const { data: farmRes } = await getActList(payload);
  farm.farmInfo = farmRes;
};
// 获取数据
const initData = async () => {
  loading.value = true;
  showLoadingToast({
    message: 'loading...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0,
  });
  const { data: plotRes } = await getUserSummaryData({});
  getFieldData(false);
  adopt.adoptInfo = plotRes;
  getFarmRecord(false);
  loading.value = false;
  closeToast();
};
onMounted(() => {
  initData();
});
</script>

<style scoped lang="less">
.home {
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
  .line {
    margin-top: 16px;
    height: 5px;
    background: rgba(255, 255, 255, 0.02);
  }
}
</style>
