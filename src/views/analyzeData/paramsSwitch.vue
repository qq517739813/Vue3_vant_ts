<template>
  <div class="paramsSwitch">
    <van-popup
      v-model:show="show"
      round
      position="bottom"
      :style="{ height: '70%' }"
      @close="handleClosePopup"
    >
      <van-nav-bar title="参数选择" :border="false" class="title" @click-right="handleClosePopup">
        <template #right>
          <van-icon name="cross" size="20" color="#FFFFFF" />
        </template>
      </van-nav-bar>
      <van-cell-group class="cell-list" :border="false">
        <van-cell
          class="cell-item"
          :class="{ curent: item.ParamId === props.curentParamId }"
          v-for="item in paramsList.paramsList"
          :key="item.ParamId"
          :title="item.ParamName"
          @click="handleCellClick(item)"
        />
      </van-cell-group>
    </van-popup>
  </div>
</template>
<script lang="ts" setup>
import { computed, inject } from 'vue';
import { ParmItem, DevParamBaseItem } from './index';

interface Props {
  popupVisbile: boolean;
  curentParamId: string;
}
// 爷孙传数据
const paramsList = inject('paramsList') as ParmItem;
// 父子传数字
const props = withDefaults(defineProps<Props>(), {
  popupVisbile: false,
  curentParamId: '',
});
// 父子传方法
const emit = defineEmits<{
  (e: 'update:popupVisbile', value: boolean): void;
  (e: 'handeleDev', Item: DevParamBaseItem): void;
}>();
// popup弹窗显示状态
const show = computed({
  get() {
    return props.popupVisbile;
  },
  set(value) {
    emit('update:popupVisbile', value);
  },
});
// popup关闭事件
const handleClosePopup = () => {
  emit('update:popupVisbile', false);
};
// 单元格点击事件
const handleCellClick = (item: DevParamBaseItem) => {
  emit('handeleDev', item);
};
</script>

<style scoped lang="less">
.paramsSwitch {
  :deep(.van-popup) {
    background: #1f2228;
    .title {
      position: sticky;
      top: 0;
      background: #1f2228;
      .van-nav-bar__title {
        font-weight: normal;
        font-size: 18px;
        color: #ffffff;
      }
    }
    .cell-list {
      .cell-item {
        background: #1f2228;
        font-size: 14px;
        color: #ffffff;
      }
      .curent {
        color: #00cc90;
      }
      .cell-item::after {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
    }
  }
}
</style>
