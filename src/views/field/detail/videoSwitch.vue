<template>
  <div class="videoSwitch">
    <van-popup
      v-model:show="show"
      round
      position="bottom"
      :style="{ height: '70%' }"
      @close="handleClosePopup"
    >
      <van-nav-bar title="摄像机选择" :border="false" class="title" @click-right="handleClosePopup">
        <template #right>
          <van-icon name="cross" size="20" color="#FFFFFF" />
        </template>
      </van-nav-bar>
      <van-cell-group class="cell-list" :border="false">
        <van-cell
          class="cell-item"
          :class="{ curent: item.DevId === props.curentDevId }"
          v-for="item in videoList"
          :key="item.DevName"
          :title="item.DevName"
          @click="handleCellClick(item)"
        />
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { DevListBaseItem } from '../index';

interface Props {
  popupVisbile: boolean;
  curentDevId: string;
  videoList: DevListBaseItem[];
}
const props = withDefaults(defineProps<Props>(), {
  popupVisbile: false,
  curentDevId: '',
  videoList: () => [],
});
// 父子传方法
const emit = defineEmits(['update:popupVisbile', 'handeleDev']);
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
const handleCellClick = (item: DevListBaseItem) => {
  emit('handeleDev', item);
};
</script>

<style scoped lang="less">
.videoSwitch {
  :deep(.van-popup) {
    background: #1f2228;
    .title {
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
