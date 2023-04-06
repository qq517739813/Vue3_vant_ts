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
      @click-right="onClickRight"
    >
      <template #left>
        <van-icon name="arrow-left" size="20" color="#FFFFFF" />
      </template>
      <template #right>
        <van-icon name="sort" size="20" color="#00cc90" style="transform: rotate(90deg)" />
        <span class="head-change">切换</span>
      </template>
    </van-nav-bar>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { useRoute } from 'vue-router';

const route = useRoute();

const countFuncode = computed(() => {
  return route.params.FunCode;
});
const onClickLeft = () => history.back();
const onClickRight = () => {
  console.log('右边')
}
console.log('countFuncode', countFuncode);
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
      .head-change {
        margin-left: 5px;
        font-size: 14px;
        color: #00cc90;
      }
    }
  }
}
</style>
