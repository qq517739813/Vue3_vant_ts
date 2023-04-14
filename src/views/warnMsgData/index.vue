<template>
  <div class="warnMsgData">
    <van-nav-bar
      title="预警通知"
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
    <van-tabs
      sticky
      v-model:active="tabtId"
      background="#1f2228"
      color="#FFFFFF"
      :line-width="tabtId === 1 ? 60 : 86"
      line-height="2"
      title-inactive-color="#ffffff99"
      title-active-color="#FFFFFF"
      @change="handleClickTab"
    >
      <pull-refresh @pull-method="getWarnMsgInfo" :equipmentId="tabtId">
        <van-tab :name="1">
          <template #title>
            <span>参数异常</span>
          </template>
          <template #default>
            <param-ques :paramData="warnMsg.warnMsgInfo.DataList" />
          </template>
        </van-tab>
        <van-tab :name="2">
          <template #title>
            <span>虫情监测异常</span>
          </template>
          <template #default>
            <pest-ques :pestData="warnMsg.warnMsgInfo.DataList" />
          </template>
        </van-tab>
      </pull-refresh>
    </van-tabs>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue';
import type { Ref } from 'vue';
import { userStore } from '@/store/user';
import { showLoadingToast, closeToast } from 'vant';
import { GetWarnMsgList } from '@/api/warnMsgData';
import { WarnMsgItem } from './index';
import PullRefresh from '@/components/pullRefresh.vue';
import ParamQues from './paramQues.vue';
import PestQues from './pestQues.vue';

const store = userStore();
// 切换Tab标签页id
const tabtId: Ref<number> = ref(1);
// 预警通知基本信息
const warnMsg = reactive<WarnMsgItem>({ warnMsgInfo: {} });
// 获取预警通知基本信息
const getWarnMsgInfo = async (Type: number) => {
  showLoadingToast({
    message: 'loading...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0,
  });
  const payload = {
    ProId: store.userInfo.ProjId, // 项目id
    Type, // 1参数异常(环境参数) 2虫情异常
    Token: store.userInfo.Token,
    Page: 1,
    PageSize: 100,
  };
  const res: any = await GetWarnMsgList(payload);
  warnMsg.warnMsgInfo = res.Data;
  closeToast();
};
// 导航栏左侧事件
const onClickLeft = () => history.back();
// tab标签点击事件
const handleClickTab = (name: number) => {
  tabtId.value = name;
  getWarnMsgInfo(tabtId.value);
};
// this.selectComponent('#tabs').resize();
onMounted(async () => {
  await getWarnMsgInfo(tabtId.value);
});
</script>

<style scoped lang="less">
.warnMsgData {
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
  // :deep(.van-tabs__wrap) {
  //   touch-action: manipulation;
  // }
}
</style>
