<template>
  <div class="pestQues">
    <div class="pestQues-item" v-for="item in props.pestData" :key="item.Id">
      <div class="item-head">
        <span>参数异常</span>
        <span>{{ item.Ctime }}</span>
      </div>
      <div class="item-main">
        <div class="item-msgTitle">{{ item.MsgTitle }}</div>
        <div class="item-msgContent">{{ item.MsgContent }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CommonItem } from './index';

interface Props {
  pestData: CommonItem[];
}
// 父传子数据
const props = withDefaults(defineProps<Props>(), {
  pestData: () => [],
});
</script>

<style scoped lang="less">
.pestQues {
  // margin-top: 14px;
  padding: 0 16px;
  .pestQues-item {
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
    .item-main{
      padding: 8px 12px;
      font-size: 14px;
      line-height: 21px;
      color: #ffffff;
    }
  }
}
</style>
