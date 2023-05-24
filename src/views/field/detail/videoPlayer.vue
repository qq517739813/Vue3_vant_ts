<template>
  <div :style="videoWrapStyles" id="videoWrap">
    <!-- <video
      v-if="props.src"
      id="videoMain"
      ref="videoRef"
      class="video-main video-js vjs-default-skin vjs-big-play-centered"
      data-setup="{}"
    >
      <source :src="props.src" type="application/x-mpegURL" />
    </video> -->
  </div>
</template>

<script lang="ts" setup>
import { watch, onUnmounted, CSSProperties, computed, onMounted, ref, nextTick } from 'vue';
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
// const videoRef: Ref = ref<HTMLElement | null>(null);
// scr地址
const srcPath: Ref = ref<string>('');
const myPlayer: Ref = ref();

const videoWrapStyles = computed<CSSProperties>(() => {
  return {
    width: props.width || '100%',
    height: props.height || '195px',
  };
});
watch(
  () => props.src,
  (newVal) => {
    if (srcPath.value !== newVal) {
      srcPath.value = newVal;
      nextTick(() => {
        initVideo();
      });
    }
  },
);
// 初始化videojs
const initVideo = () => {
  if (myPlayer.value) {
    myPlayer.value.dispose();
  }
  if (props.src) {
    // 获取视频的父容器
    const videoWrap = document.getElementById('videoWrap') as any;
    // 创建video元素
    const video = document.createElement('video');
    video.setAttribute('id', 'videoMain');
    video.setAttribute('class', 'video-main video-js vjs-default-skin vjs-big-play-centered');
    video.setAttribute('data-setup', '{}');
    video.style.width = props.width || '100%';
    video.style.height = props.height || '195px';
    videoWrap.appendChild(video);
    // 创建source元素
    const source = document.createElement('source');
    source.setAttribute('src', props.src);
    source.setAttribute('type', 'application/x-mpegURL');
    video.appendChild(source);
  }
  const videoEle = document.getElementById('videoMain') as any;
  nextTick(() => {
    const options = {
      // language: 'zh-CN', // 设置语言
      autoplay: true, // 设置自动播放
      controls: false, // 是否显示底部控制栏
      techOrder: ['html5'],
      preload: 'auto', // 预加载
      fluid: false, // 自适应宽高
      muted: true, // 设置了它为true，才可实现自动播放,同时视频也被静音
      //   src// 要嵌入的视频源的源 URL
      // suppressNotSupportedError:true,
      //   loadingSpinner: false,
      sources: [
        {
          src: props.src,
          type: 'application/x-mpegURL',
        },
        // {
        //   src: srcPath.value,
        //   type: 'application/x-mpegURL',
        // },
      ],
    };
    if (videoEle) {
      // 创建 video 实例
      myPlayer.value = videojs(videoEle, videojs.obj.merge(options));
      myPlayer.value.on('error', (err: any) => {
        console.log('err', err);
        myPlayer.value.error({ code: 4, message: '视频文件未找到' }); // 显示自定义错误消息
        myPlayer.value.hide();
      });
    }
  });
};

onMounted(() => {
  initVideo();
});
onUnmounted(() => {
  if (myPlayer.value) {
    myPlayer.value.dispose();
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
