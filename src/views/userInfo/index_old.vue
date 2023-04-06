<template>
  <div class="userInfo">
    <!-- <div class="title">我的</div> -->
    <van-nav-bar fixed :border="false" placeholder safe-area-inset-top class="title" title="我的" />

    <!-- 头像栏 -->
    <div class="userName" @click="userInfoHandleClick">
      <!-- 头像 -->
      <div class="usericon">
        <div class="userIconImg">
          <img src="@/assets/user.svg" />
        </div>
        <!-- 用户名 -->
        <div class="userNameInfo">
          <div class="userNameInfo1">{{ store.userInfo.UserName }}</div>
          <div class="userNameInfo2">{{ store.userInfo.UserName }}</div>
        </div>
      </div>
      <!-- 右箭头 -->
      <van-icon name="arrow" />
    </div>
    <!-- 报警设置 -->
    <div class="warnSetting">
      <div class="duiqi">
        <img src="@/assets/warnSetting.svg" class="warning-o" />
        <span>报警设置</span>
      </div>
      <van-icon name="arrow" />
    </div>
    <hr class="hengxian" />
    <!-- 版本更新 -->
    <div class="warnSetting">
      <div class="duiqi">
        <img src="@/assets/versionUpdate.svg" class="warning-o" />
        <span>版本更新日志</span>
      </div>
      <van-icon name="arrow" />
    </div>
    <div class="loginOut">
      <span>退出账号</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { userStore } from '@/store/user';
import { useRouter } from 'vue-router';

const store = userStore();
const router = useRouter();

const userInfoHandleClick = () => {
  router.push({
    name: 'EditData',
  });
};
onMounted(() => {});
</script>
    
<style scoped lang="less">
.duiqi {
  display: flex;
  align-items: flex-end;
}
.warning-o {
  font-size: 20px;
  margin-right: 11px;
}
.userInfo {
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
  .userName {
    display: flex;
    margin: 28px 18px 0px 18px;
    height: 60px;
    color: #ffffff;
    align-items: center;
    justify-content: space-between;
    // 头像
    .usericon {
      display: flex;
      .userIconImg {
        width: 60px;
        height: 60px;
        background: rgba(0, 204, 144, 0.4);
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      // 用户名
      .userNameInfo {
        margin-left: 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .userNameInfo1 {
          font-size: 18px;
          color: #cccccc;
        }
        .userNameInfo2 {
          font-size: 14px;
          color: #9e9e9e;
        }
      }
    }
  }
  // 报警设置
  .warnSetting {
    margin: 70px 18px 0px 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    height: 60px;
    color: #ccc;
    text-align: center;
  }
  .hengxian {
    margin: 28px 18px 0px 18px;
    border: 0.5px solid rgba(255, 255, 255, 0.1);
  }
  // 退出账号
  .loginOut {
    height: 50px;
    margin: 70px 18px 0px 18px;
    border-radius: 4px;
    background: #00cc90;
    display: flex;
    align-items: center;
    justify-content: center;
    & span {
      font-size: 14px;
      font-weight: normal;
      letter-spacing: 0px;
      color: #ffffff;
    }
  }
}
</style>
