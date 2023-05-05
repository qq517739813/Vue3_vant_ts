<template>
  <div class="userInfo">
    <van-nav-bar fixed :border="false" placeholder safe-area-inset-top class="title" title="我的" />
    <van-cell-group :border="false" class="content">
      <van-cell class="content-cell" is-link center @click="handeleCellClick('EditData')">
        <template #icon>
          <div class="userIcon">
            <img src="@/assets/user.svg" alt="" />
          </div>
        </template>
        <template #title>
          <span class="content-cell-userOne">{{ store.userInfo.UserName }}</span>
        </template>
        <template #label>
          <!-- <span class="content-cell-userTwo">{{ store.userInfo.UserName }}</span> -->
          <span class="content-cell-userTwo">管理员</span>
        </template>
      </van-cell>
      <van-cell class="content-cell" is-link center @click="handeleCellClick('WarnSetting')">
        <template #title>
          <img src="@/assets/warnSetting.svg" alt="" />
          <span class="content-cell-title">报警设置</span>
        </template>
      </van-cell>
      <van-cell class="content-cell" is-link center @click="handeleCellClick('VersionManage')">
        <template #title>
          <img src="@/assets/versionUpdate.svg" alt="" />
          <span class="content-cell-title">版本更新日志</span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-button class="loginOut" @click="logOut" type="success">退出账号</van-button>
  </div>
</template>

<script lang="ts" setup>
import { userStore } from '@/store/user';
import { useRouter } from 'vue-router';
import type { Router } from 'vue-router';
import { redirectLogin } from '@/utils/utils';

const store = userStore();
const router: Router = useRouter();

// 点击每个单元格
const handeleCellClick = (item: string) => {
  router.push({
    name: item,
  });
};
// 点击退出
const logOut = () => {
  redirectLogin()
};
</script>

<style scoped lang="less">
.userInfo {
  padding: 0 16px;
  background: #1f2228;

  .title {
    :deep(.van-nav-bar--fixed) {
      background: #1f2228;

      .van-nav-bar__title {
        font-weight: normal;
        font-size: 18px;
        color: #ffffff;
      }
    }
  }

  .content {
    .content-cell {
      display: flex;
      align-items: flex-end;
      background: #1f2228;
      padding: 0;

      .userIcon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 60px;
        border-radius: 8px;
        background: rgba(0, 204, 144, 0.4);
        border: 1px solid rgba(0, 204, 144, 0.4);

        img {
          width: 40px;
          height: 40px;
        }
      }

      .content-cell-userOne {
        margin-bottom: 3px;
        margin-left: 16px;
        font-size: 16px;
        color: #cccccc;
      }

      .content-cell-userTwo {
        margin-left: 16px;
        font-size: 14px;
        color: #9e9e9e;
      }

      img {
        vertical-align: sub;
      }

      .content-cell-title {
        margin-left: 11px;
        font-size: 16px;
        color: #cccccc;
      }

      :deep(.van-cell__right-icon) {
        font-size: 20px;
      }
    }

    .content-cell:after {
      border-bottom: none;
    }

    .content-cell:nth-child(1) {
      display: flex;
      align-items: center;
    }

    .content-cell:nth-child(2) {
      padding-top: 64px;
      padding-bottom: 28px;
      border-bottom: 0.5px solid rgba(255, 255, 255, 0.1);
    }

    .content-cell:nth-child(3) {
      padding-top: 38px;
    }
  }

  .loginOut {
    margin-top: 134px;
    width: 100%;
    height: 50px;
    border-radius: 4px;
    background: #00cc90;
    font-size: 14px;
    color: #ffffff;
  }
}
</style>
