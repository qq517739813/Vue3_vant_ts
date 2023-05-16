<template>
  <div class="historyImg">
    <div class="head">
      <div class="title">
        <span>共计</span>
        <span>{{ props.imgList.length }}张</span>
      </div>
      <div class="date">
        <div class="text">{{ countDate }}</div>
        <div class="choose-time" @click="onClickChooseTime">
          <van-icon name="underway-o" size="16" color="#FFFFFF" />
          <span>选择时间</span>
        </div>
      </div>
    </div>
    <van-grid
      :column-num="3"
      class="img-list"
      v-if="props.imgList?.length"
      :gutter="10"
      center
      :border="false"
    >
      <van-grid-item
        class="img-item"
        v-for="(img, index) in props.imgList"
        :key="index"
        @click="handleClick(index)"
      >
        <van-image lazy-load :src="img" :key="index" show-loading show-error height="80" />
        <van-image-preview
          v-model:show="imgPreviewShow"
          closeable
          :images="props.imgList"
          :start-position="imgIndex"
          @change="onChange"
          teleport="body"
        />
      </van-grid-item>
    </van-grid>
    <empty v-else />
    <!-- 选择时间 -->
    <common-calendar v-model:show-calendar="calendarVisible" @calendar-confirm="onConfirm" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import type { Ref, ComputedRef } from 'vue';
import CommonCalendar from '@/components/commonCalendar.vue';
import empty from '@/components/empty.vue';
import { DateItem } from '../index';

interface Props {
  imgList: string[];
  objId: string;
  historyDate: DateItem;
}
// 父传子数据
const props = withDefaults(defineProps<Props>(), {
  imgList: () => [],
  objId: '',
  historyDate: () => {
    return {
      calendar: { Bdate: '', Edate: '' },
    };
  },
});
// 父子传方法
const emit = defineEmits<{
  (e: 'getVideoHistortList', ObjId: string, Item: DateItem): void;
}>();
// 控制日期选择器状态
const calendarVisible: Ref<boolean> = ref(false);
// 图片预览状态
const imgPreviewShow: Ref<boolean> = ref(false);
// 图片预览第几张
const imgIndex: Ref<number> = ref(0);
// 拍摄图片时间
const countDate: ComputedRef = computed(() => {
  const list = [...new Set(Object.values(props.historyDate.calendar))];
  return list.join('—');
});
// 点击图片开启预览
const handleClick = (index: number) => {
  imgIndex.value = index;
  imgPreviewShow.value = true;
};
// 图片切换
const onChange = (newIndex: number) => {
  imgIndex.value = newIndex;
};
// 选择时间事件
const onClickChooseTime = () => {
  calendarVisible.value = true;
};
// 日期确定事件
const onConfirm = (values: DateItem) => {
  calendarVisible.value = false;
  emit('getVideoHistortList', props.objId, values);
};
</script>

<style scoped lang="less">
.historyImg {
  padding-top: 14px;
  height: calc(100vh - 510px);
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
  .head {
    margin-bottom: 14px;
    .title {
      font-size: 14px;
      color: #cccccc;
    }
    .date {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 5px;
      .text {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.4);
      }
      .choose-time {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6px 9px;
        border-radius: 4px;
        border: 0.5px solid rgba(255, 255, 255, 0.4);
        span {
          margin-left: 5px;
          font-size: 12px;
          color: #ffffff;
        }
      }
    }
  }
  .img-list {
    &::-webkit-scrollbar {
      display: none;
    }
    .img-item {
      :deep(.van-grid-item__content) {
        padding: 0;
      }
    }
  }
}
</style>
