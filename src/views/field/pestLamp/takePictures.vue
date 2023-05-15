<template>
  <div class="takePictures">
    <van-grid
      :column-num="3"
      class="img-list"
      v-if="pestImgsList?.length"
      :gutter="10"
      center
      :border="false"
    >
      <van-grid-item
        class="img-item"
        v-for="(img, index) in pestImgsList"
        :key="index"
        @click="handleClick(index)"
      >
        <van-image lazy-load :src="img" :key="index" show-error show-loading height="80" />
        <van-image-preview
          v-model:show="imgPreviewShow"
          closeable
          :images="pestImgsList"
          :start-position="imgIndex"
          @change="onChange"
          teleport="body"
        />
      </van-grid-item>
    </van-grid>
    <empty v-else />
  </div>
</template>

<script lang="ts" setup>
import { ref, inject } from 'vue';
import type { Ref } from 'vue';
import { ImglistItem } from '../index';
import empty from '@/components/empty.vue';

// 接收数据
const { pestImgsList } = inject('pestImgsList') as ImglistItem;
// 图片预览状态
const imgPreviewShow: Ref<boolean> = ref(false);
// 图片预览第几张
const imgIndex: Ref<number> = ref(0);
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
.takePictures {
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
