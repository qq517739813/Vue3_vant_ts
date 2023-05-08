<template>
  <div class="userInfo">
    <van-nav-bar fixed :border="false" placeholder safe-area-inset-top class="title" title="我的" />
    <van-cell-group :border="false" class="content">
      <van-cell class="content-cell" center>
        <template #icon>
          <div class="userIcon">
            <img src="@/assets/user.svg" alt="" />
          </div>
        </template>
        <template #title>
          <span class="content-cell-userOne">{{ store.userInfo.user.name }}</span>
        </template>

      </van-cell>
      <van-cell class="content-cell" is-link center @click="handeleCellClick('EditData')">
        <template #title>
          <img src="@/assets/edit.svg" alt="" />
          <span class="content-cell-title">编辑信息</span>
        </template>
      </van-cell>
      <van-cell class="content-cell" is-link center @click="handeleCellClick('ResetPwd')">
        <template #title>
          <img src="@/assets/pwd.svg" alt="" />
          <span class="content-cell-title">修改密码</span>
        </template>
      </van-cell>
      <van-cell class="content-cell" is-link center>
        <template #title>
          <img src="@/assets/system.svg" alt="" />
          <span class="content-cell-title">系统升级</span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-button class="loginOut" @click="logOut" type="success">退出账号</van-button>
    <userdialog type="修改密码" @handle-Save="sava" @handle-Close="handleclose" :isShow="show" />
  </div>
</template>

<script lang="ts" setup>
import { userStore } from '@/store/user';
import { useRouter } from 'vue-router';
import type { Router } from 'vue-router';
import { redirectLogin } from '@/utils/utils';
import { ref } from 'vue';
import { showLoadingToast, closeToast, showToast, showConfirmDialog } from 'vant';
import { ResetPwd } from "@/api/user"
import userdialog from "./components/userdialog.vue";

const store = userStore();
const router: Router = useRouter();
const show = ref<boolean>(false);
const val = ref<string>('')
// 点击每个单元格
const handeleCellClick = (item: string) => {
  console.log('item', item)
  if (item === 'ResetPwd') {
    show.value = !show.value;
  } else if (item === 'EditData') {
    console.log(item);

    router.push({ name: item })
  }
};
// 点击退出
const logOut = () => {
  showConfirmDialog({
    title: '提示',
    message:
      '确定要退出登录吗？',
  })
    .then(() => {
      redirectLogin()
    })
};
// 点击保存
const sava = (item: String) => {
  console.log(store.userInfo.user.uid, '123', val.value, 'item', item);
  const userpwd = {
    val: item[0] as string,
    id: store.userInfo.user.uid
  }
  showLoadingToast({
    message: 'loading...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0,
  });
  ResetPwd(userpwd).then(() => {
    closeToast()
    showToast('修改成功');
    show.value = false;
  }).catch(() => {
    showToast('修改失败');
    show.value = false;
  });
}
const handleclose = () => {
  show.value = false
}
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
      padding-bottom: 28px;
      border-bottom: 0.5px solid rgba(255, 255, 255, 0.1);
    }

    .content-cell:nth-child(4) {
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
