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
      offset-top="46"
      swipeable
      v-model:active="tabtId"
      background="#1f2228"
      color="#00CC90"
      :line-width="tabtId === 1 ? 60 : 86"
      line-height="2"
      title-inactive-color="#ffffff99"
      title-active-color="#00CC90"
      @change="handleClickTab"
      class="tabs-content"
    >
      <van-tab :name="1">
        <template #title>
          <span>参数异常</span>
        </template>
        <template #default>
          <param-ques
            :paramData="warnMsg.warnMsgInfo"
            @edit-requestPage="editRequestPage"
            v-if="!loading && tabtId === 1 && warnMsg.warnMsgInfo.DataList?.length"
          />
          <empty v-else-if="tabtId === 1" />
        </template>
      </van-tab>
      <van-tab :name="2">
        <template #title>
          <span>虫情监测异常</span>
        </template>
        <template #default>
          <pest-ques
            :pestData="warnMsg.warnMsgInfo.DataList"
            v-if="!loading && tabtId === 2 && warnMsg.warnMsgInfo.DataList?.length"
          />
          <empty v-else-if="tabtId === 2" />
        </template>
      </van-tab>
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
import ParamQues from './paramQues.vue';
import PestQues from './pestQues.vue';
import empty from '@/components/empty.vue';

const store = userStore();
// 切换Tab标签页id
const tabtId: Ref<number> = ref(1);
// 控制显示
const loading: Ref<boolean> = ref(false);
// 页码尺寸
const requestPage: Ref<number> = ref(1);
// 预警通知基本信息
const warnMsg = reactive<WarnMsgItem>({
  warnMsgInfo: {
    Condition: '',
    DataList: [],
    Page: 1,
    PageSize: 10,
    TotalPage: 1,
    TotalRecord: 10,
  },
});
// 获取预警通知基本信息
const getWarnMsgInfo = async (Type: number) => {
  showLoadingToast({
    message: 'loading...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0,
  });
  loading.value = true;
  const payload = {
    ProId: store.userInfo.ProjId, // 项目id
    Type, // 1参数异常(环境参数) 2虫情异常
    Token: store.userInfo.Token,
    Page: requestPage.value,
    PageSize: 10,
  };
  const res: any = await GetWarnMsgList(payload);
  warnMsg.warnMsgInfo = res.Data;
  loading.value = false;
  closeToast();
};
// 导航栏左侧事件
const onClickLeft = () => history.back();
// tab标签点击事件
const handleClickTab = (name: number) => {
  tabtId.value = name;
  getWarnMsgInfo(tabtId.value);
};
// 修改表格页码尺寸大小
const editRequestPage = async (pageSize: number) => {
  if (requestPage.value === pageSize) {
    return;
  }
  requestPage.value = pageSize;
  const payload = {
    ProId: store.userInfo.ProjId, // 项目id
    Type: tabtId.value, // 1参数异常(环境参数) 2虫情异常
    Token: store.userInfo.Token,
    Page: requestPage.value,
    PageSize: 10,
  };
  const res: any = await GetWarnMsgList(payload);
  warnMsg.warnMsgInfo.Page = res.Data.Page;
  warnMsg.warnMsgInfo.DataList = [...warnMsg.warnMsgInfo.DataList, ...res.Data.DataList];
};
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
  :deep(.tabs-content) {
    .van-tabs__content {
      .van-tab__panel {
        min-height: calc(100vh - 90px);
      }
    }
  }
}
</style>
