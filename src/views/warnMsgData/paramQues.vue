<template>
  <div class="paramQues">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      offset="50"
      :immediate-check="false"
    >
      <div class="paramQues-item" v-for="item in props.paramData.DataList" :key="item.Id">
        <div class="item-head">
          <span>参数异常</span>
          <span>{{ item.Ctime }}</span>
        </div>
        <div class="item-main">
          <div class="item-msgTitle">{{ item.MsgTitle }}</div>
          <div class="item-msgContent">{{ item.MsgContent }}</div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Ref } from 'vue';
import { WarnMsgBaseItem } from './index';

interface Props {
  paramData: WarnMsgBaseItem;
}
// 父传子数据
const props = withDefaults(defineProps<Props>(), {
  paramData: () => {
    return {
      Condition: '',
      DataList: [],
      Page: 1,
      PageSize: 10,
      TotalPage: 1,
      TotalRecord: 10,
    };
  },
});
// 父子传方法
const emit = defineEmits<{
  (e: 'editRequestPage', value: number): void;
}>();
const loading: Ref<boolean> = ref(false);
const finished: Ref<boolean> = ref(false);

const onLoad = () => {
  const { DataList, TotalRecord, Page } = props.paramData;
  setTimeout(() => {
    loading.value = true;
    emit('editRequestPage', Page + 1);
    loading.value = false;
    if (DataList.length >= TotalRecord) {
      finished.value = true;
    }
  }, 1000);
};
</script>

<style scoped lang="less">
.paramQues {
  // height: calc(100vh - 90px);
  // overflow: auto;
  // margin-top: 14px;
  padding: 0 16px;
  .paramQues-item {
    margin: 14px 0;
    box-sizing: border-box;
    min-height: 133px;
    border-radius: 4px;
    border: 0.5px solid rgba(255, 255, 255, 0.1);
    .item-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 13px 5px 8px;
      border: 0.5px solid rgba(255, 255, 255, 0.1);
      span {
        font-size: 12px;
        color: #ffffff;
        &:first-child {
          width: 72px;
          height: 28px;
          text-align: center;
          line-height: 28px;
          border: 0.5px solid #ff8935;
          font-size: 14px;
          color: #ff8935;
        }
      }
    }
    .item-main {
      padding: 8px 12px;
      font-size: 14px;
      line-height: 21px;
      color: #ffffff;
    }
  }
}
</style>
