<template>
  <div class="takePictures">
    <img
      v-for="(img, index) in pestImgsList"
      v-lazy="img"
      :key="index"
      @click="handleClick(index)"
    />
    <van-image-preview
      v-model:show="imgPreviewShow"
      closeable
      :images="pestImgsList"
      :start-position="imgIndex"
      @change="onChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, inject } from 'vue';
import type { Ref } from 'vue';
import { ImglistItem } from './index';
// 接收数据
const { pestImgsList } = inject('pestImgsList') as ImglistItem;
const imgPreviewShow: Ref<boolean> = ref(false);
const imgIndex: Ref<number> = ref(0);
const handleClick = (index: number) => {
  imgIndex.value = index;
  imgPreviewShow.value = true;
};
const onChange = (newIndex: number) => {
  imgIndex.value = newIndex;
};
</script>

<style scoped lang="less">
.takePictures {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 14px;
  padding: 5px;
  min-height: 100px;
  border-radius: 4px;
  border: 0.5px solid #333333;
  color: #ffffff;
  img {
    width: 110px;
  }
}
</style>
