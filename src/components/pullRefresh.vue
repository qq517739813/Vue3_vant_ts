<template>
  <div class="global-pull">
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="onRefresh"
      :class="countFuncode==='WarnMsgData'?'warnMsg-pull-refresh':'common-pull-refresh'"
    >
      <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
      <template #pulling="props">
        <div class="pulling" :style="{ height: props.distance }">
          <van-icon name="arrow-down" />
          <span>下拉即可刷新...</span>
        </div>
      </template>
      <!-- 释放提示 -->
      <template #loosing>
        <div class="loosing">
          <van-icon name="arrow-up" />
          <span>释放即可刷新...</span>
        </div>
      </template>
      <slot></slot>
    </van-pull-refresh>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import type { Ref, ComputedRef } from 'vue';
import { useRoute } from 'vue-router';
import type { RouteLocationNormalizedLoaded } from 'vue-router';

interface Props {
  equipmentId: string | number;
}
const props = withDefaults(defineProps<Props>(), {
  equipmentId: '',
});
const route: RouteLocationNormalizedLoaded = useRoute();
// 父子传方法
const emit = defineEmits(['pullMethod']);
// 路由参数
const countFuncode: ComputedRef = computed(() => {
  return route.params.FunCode;
});
// 下拉刷新状态
const refreshLoading: Ref<boolean> = ref(false);
// 下拉刷新
const onRefresh = () => {
  refreshLoading.value = true;
  emit('pullMethod', props.equipmentId);
  refreshLoading.value = false;
};
</script>

<style scoped lang="less">
.global-pull {
  .common-pull-refresh {
    :deep(.van-pull-refresh__track) {
      min-height: calc(100vh - 110px);
    }
  }
  .warnMsg-pull-refresh {
    :deep(.van-pull-refresh__track) {
      min-height: calc(100vh - 140px);
    }
  }
  .pulling,
  .loosing {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    font-size: 20px;

    span {
      margin-left: 10px;
    }
  }
}
</style>
