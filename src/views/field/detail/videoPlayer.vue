<template>
  <div :style="videoWrapStyles">
    <video
      v-if="props.src"
      id="videoMain"
      ref="videoRef"
      class="video-main video-js vjs-default-skin vjs-big-play-centered"
    >
      <source :src="props.src" type="application/x-mpegURL" />
    </video>
  </div>
</template>

<script lang="ts" setup>
import { watch, onUnmounted, CSSProperties, computed, onMounted, ref, toRef, nextTick } from 'vue';
import type { Ref } from 'vue';
import videojs from 'video.js';
// import 'videojs-contrib-hls'
import 'video.js/dist/video-js.min.css';

interface Props {
  src: string;
  width?: string;
  height?: string;
}
// 父子传数据
const props = withDefaults(defineProps<Props>(), {
  src: '',
  width: '',
  height: '',
});
// video标签
const videoRef: Ref = ref<HTMLElement | null>(null);
// scr地址
const srcPath: Ref = ref<string>('');
const player: Ref = ref();

const videoWrapStyles = computed<CSSProperties>(() => {
  return {
    width: props.width || '100%',
    height: props.height || '195px',
  };
});
const myPropRef = toRef(props, 'src');
watch(myPropRef, (newVal, oldVal) => {
  console.log('newVal', newVal);
  console.log('oldVal', oldVal);
  if (srcPath.value !== newVal) {
    srcPath.value = newVal;
    initVideo();
  }
});
// 初始化videojs
const initVideo = () => {
  nextTick(() => {
  const options = {
    // language: 'zh-CN', // 设置语言
    autoplay: true, // 设置自动播放
    controls: false, // 是否显示底部控制栏
    techOrder: ['html5',],
    preload: 'auto', // 预加载
    fluid: false, // 自适应宽高
    muted: true, // 设置了它为true，才可实现自动播放,同时视频也被静音
    // src// 要嵌入的视频源的源 URL
  };
  if (videoRef.value) {
    // 创建 video 实例
    player.value = videojs(videoRef.value, options);
  }
  });
};

onMounted(() => {
//   setTimeout(() => {
    initVideo();
//   }, 500);
});
onUnmounted(() => {
  if (player.value) {
    player.value.dispose();
  }
});
</script>

<style lang="less" scoped>
.video-main {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}
</style>
