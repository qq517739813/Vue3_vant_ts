<template>
  <div class="videoImg">
    <div class="title">
      <div class="left">
        <span>拍摄图片</span>
        <span>{{ countDate }}</span>
      </div>
      <div class="right">
        <span>共计</span>
        <span class="green">{{ props.imgList.length }}</span>
        <span>张</span>
      </div>
    </div>
    <div class="img-list" v-if="props.imgList?.length">
      <img
        v-for="(img, index) in props.imgList"
        v-lazy="img"
        :key="index"
        @click="handleClick(index)"
      />
      <van-image-preview
        v-model:show="imgPreviewShow"
        closeable
        :images="props.imgList"
        :start-position="imgIndex"
        @change="onChange"
      />
    </div>
    <empty v-else />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import type { Ref, ComputedRef } from 'vue';
import moment from 'moment';
import empty from '@/components/empty.vue';

interface Props {
  imgList: string[];
}
// 父传子数据
const props = withDefaults(defineProps<Props>(), {
  imgList: () => [],
});
// 图片预览状态
const imgPreviewShow: Ref<boolean> = ref(false);
// 图片预览第几张
const imgIndex: Ref<number> = ref(0);
// 拍摄图片时间
const countDate: ComputedRef = computed(() => {
  return moment().format('YYYY-MM-DD');
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
</script>

<style scoped lang="less">
.videoImg {
  margin: 24px 0 14px;
  padding: 0 16px;
  color: #fff;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
    .left {
      span:first-child {
        margin-right: 10px;
        font-size: 16px;
        color: #cccccc;
      }
      font-size: 12px;
      color: #999999;
    }
    .right {
      span {
        font-size: 16px;
        color: #797a7e;
      }
      .green {
        color: #00cc90;
      }
    }
  }
  .img-list {
    display: flex;
    align-items: center;
    padding-right: 7px;
    height: 140px;
    border-radius: 4px;
    box-sizing: border-box;
    border: 0.5px solid rgba(255, 255, 255, 0.1);
    overflow: auto;
    overflow-y: hidden;
    //  -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar{
      display: none;
    }
    img {
      margin-left: 7px;
      width: 160px;
      height: 126px;
    }
  }
}
</style>
