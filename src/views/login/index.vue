<template>
  <van-tabbar route fixed placeholder v-model="active" active-color="#D52929" inactive-color="#999">
    <van-tabbar-item to="/online-courses">
      <span>在线学习</span>
      <template #icon="props">
        <img :src="props.active ? bookIcon.active : bookIcon.inactive" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item icon="search" to="/train">
      <span>培训管理</span>
      <template #icon="props">
        <img :src="props.active ? setIcon.active : setIcon.inactive" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item icon="friends-o" to="/subject-info">
      <span> 开班信息 </span>
      <template #icon="props">
        <img :src="props.active ? infoIcon.active : infoIcon.inactive" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item icon="setting-o" to="/user">
      <span>个人信息</span>
      <template #icon="props">
        <img :src="props.active ? userIcon.active : userIcon.inactive" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const active = ref(0);
const bookIcon = {
  active: '@/assets/book_selected.svg',
  inactive: '@/assets/book.svg',
};
const setIcon = {
  active: '@/assets/set_selected.svg',
  inactive: '@/assets/set.svg',
};
const infoIcon = {
  active: '@/assets/info_selected.svg',
  inactive: '@/assets/info.svg',
};
const userIcon = {
  active: '@/assets/user_selected.svg',
  inactive: '@/assets/user.svg',
};
onMounted(() => {
  console.log('我是my页面,我做了缓存');
});
</script>

<style scoped lang="scss"></style>
