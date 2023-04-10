<template>
  <div class="editData">
    <van-nav-bar
      title="编辑资料"
      class="title"
      fixed
      :border="false"
      placeholder
      safe-area-inset-top
      @click-left="onClickLeft"
    >
      <template #left>
        <van-icon name="arrow-left" size="20" color="#FFFFFF" />
      </template>
    </van-nav-bar>
    <!-- 单元格 -->
    <van-cell-group :border="false" class="edit-cell">
      <van-cell @click="showHeaderDialog" title="头像" is-link />
      <van-cell title="昵称" is-link />
      <van-cell title="密码" is-link />
      <van-cell title="手机" is-link />
      <van-cell title="邮箱" is-link />
    </van-cell-group>
    <!-- 弹出框 -->
    <van-popup
      v-model:show="show"
      closeable
      position="bottom"
      :style="{ height: '30%' }"
      close-on-click-overlay
      >内容</van-popup
    >
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const countFuncode = computed(() => {
  return route.params.FunCode;
});
const onClickLeft = () => history.back();
console.log('countFuncode', countFuncode);

const show = ref(false);

const showHeaderDialog = () => {
  show.value = true;
};
</script>

<style scoped lang="less">
.editData {
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
  .edit-cell {
    :deep(.van-cell--clickable) {
      background: #1f2228;
      padding: 20px 17px;
      color: #cccc;
    }
    :deep(.van-cell:after) {
      border-bottom: 0.5px solid rgba(255, 255, 255, 0.1);
    }
    & .van-cell:last-child::after {
      display: block;
      content: '';
      border-bottom: 0.5px solid rgba(255, 255, 255, 0.1);
    }
  }
}
</style>
