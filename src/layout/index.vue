<template>
  <div>
    <router-view />
    <van-tabbar route fixed placeholder v-model="active" active-color="#ffffff" inactive-color="#999999" :border="false">
      <van-tabbar-item v-for="(item) in tabbarList" :key="item.path" :icon="item.inactive" :to="item.path"
        class="tabbar_footer">
        <span class="title">{{ item.title }}</span>
        <template #icon="props">
          <img class="svg" :src="props.active ? item.active : item.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue'
import { TabbarItem } from './index'
import HomeActive from '@/assets/home_active.svg'
import HomeInactive from '@/assets/home_inactive.svg'
import FarmActive from '@/assets/farm_active.svg';
import FarmInActive from '@/assets/farm_inactive.svg';
import UserInfoActive from '@/assets/userInfo_active.svg'
import UserInfoInactive from '@/assets/userInfo_inactive.svg'


const active: Ref<number> = ref(0);
const tabbarList: TabbarItem[] = [
  {
    title: '首页',
    path: '/home',
    active: HomeActive,
    inactive: HomeInactive,
  },
  {
    title: '农事活动',
    path: '/farm',
    active: FarmActive,
    inactive: FarmInActive,
  },
  {
    title: '我的',
    path: '/userInfo',
    active: UserInfoActive,
    inactive: UserInfoInactive,
  },
]
onMounted(() => {
});
</script>

<style scoped lang="less">
.van-tabbar--fixed {
  margin-top: 6px;

  .tabbar_footer {
    background: #1F2228;
    border-top: 1px solid #ffffff1a;

    .title {
      font-size: 10px;
    }

    .svg {
      width: 24px;
      height: 24px;
    }
  }

}
</style>
