<template>
  <router-view v-slot="{ Component }">
    <!-- <transition name="fade-transform" mode="out-in">
        <component :is="Component" />
    </transition> -->
    <keep-alive>
      <component :is="Component" :key="route.name" v-if="route.meta.keepAlive" />
    </keep-alive>
    <component :is="Component" :key="route.name" v-if="!route.meta.keepAlive" />
  </router-view>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onBeforeMount } from 'vue';
import { getSystemAgent, isAlipayOrWechat } from '@/utils';

const route = useRoute();

function handleDocumentInit() {
  getSystemAgent();
  isAlipayOrWechat();
}

onBeforeMount(() => handleDocumentInit());
</script>

<style lang="less">
@font-face {
  font-family: DIN Medium;
  font-style: normal;
  src: url('https://assets.uphicoo.com/fonts/DIN-Medium.ttf') format('truetype');
}

@font-face {
  font-family: Source Han Sans CN;
  src: url('https://mat.uphicoo.com/packages/fonts/SourceHanSansCNRegular.woff') format('woff'),
    url('https://mat.uphicoo.com/packages/fonts/SourceHanSansCNRegular.ttf') format('truetype');
}

#root {
  min-height: 100vh;
  background: #1f2228;
  font-family: Avenir, Helvetica, Arial, sans-serif, PingFang SC;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
// fade-transform
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
