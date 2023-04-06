<template>
  <div class="userInfo">
    <div class="title">我的</div>
    <!-- 头像栏 -->
    <div class="userName">
      <!-- 头像 -->
      <div class="usericon">
        <div class="userIconImg">
          <img src="@/assets/user.svg" />
        </div>
      </div>
      <!-- 用户名 -->
      <div class="userNameInfo">
        <div class="userNameInfo1">{{ store.userInfo.UserName }}</div>
        <div class="userNameInfo2">{{ store.userInfo.UserName }}</div>
      </div>
      <!-- 右箭头 -->
      <div class="userNameRigth">
        <van-icon name="arrow" />
      </div>
    </div>
    <!-- 报警设置 -->
    <div class="warnSetting">
      <van-icon name="warning-o" class="warning-o" />
      <span>报警设置</span>
      <div class="warnSettingRigth">
        <van-icon name="arrow" />
      </div>
    </div>
    <hr class="hengxian" />
    <!-- 版本更新 -->
    <div class="versionUpdate">
      <van-icon name="records" class="records" />
      <span>版本更新日志</span>
      <div class="versionUpdateRigth">
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="loginOut">
      <span>退出账号</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { userStore } from '@/store/user';

const store = userStore();
onMounted(() => {});
</script>
    
<style scoped lang="less">
.userInfo {
  .title {
    text-align: center;
    padding-top: 10px;
    font-size: 18px;
    color: #ffffff;
  }
  .userName {
    display: flex;
    position: relative;
    left: 18px;
    top: 28px;
    width: 333px;
    height: 60px;
    opacity: 1;
    color: #ffffff;
    // 头像
    .usericon {
      width: 60px;
      height: 60px;
      background: rgba(0, 204, 144, 0.4);
      border-radius: 8px;
      position: relative;
      & img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    // 用户名
    .userNameInfo {
      margin-left: 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .userNameInfo1 {
        font-size: 18px;
        font-weight: normal;
        letter-spacing: 0em;
        color: #cccccc;
      }
      .userNameInfo2 {
        font-family: PingFang SC;
        font-size: 14px;
        font-weight: normal;
        letter-spacing: 0em;
        color: #9e9e9e;
      }
    }
    // 右箭头
    .userNameRigth {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(50%, -50%);
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2px;
    }
  }
  // 报警设置
  .warnSetting {
    margin-top: 67px;
    display: flex;
    position: relative;
    align-items: center;
    font-size: 16px;
    left: 18px;
    top: 26px;
    width: 333px;
    height: 60px;
    color: #ccc;
    text-align: center;
    .warning-o {
      font-size: 20px;
      margin-right: 11px;
    }
    & .warnSettingRigth {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(50%, -50%);
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .hengxian {
    position: absolute;
    left: 16px;
    top: 283px;
    width: 343px;
    height: 0px;
    opacity: 1;
    border: 0.5px solid rgba(255, 255, 255, 0.1);
  }
  // 版本更新
  .versionUpdate {
    margin-top: 67px;
    display: flex;
    position: relative;
    align-items: center;
    font-size: 16px;
    left: 18px;
    top: 26px;
    width: 333px;
    height: 60px;
    color: #ccc;
    text-align: center;
    .records {
      font-size: 20px;
      margin-right: 11px;
    }
    & .versionUpdateRigth {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(50%, -50%);
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  // 退出账号
  .loginOut {
    position: absolute;
    left: 18px;
    top: 478px;
    width: 343px;
    height: 50px;
    border-radius: 4px;
    opacity: 1;
    background: #00cc90;
    text-align: center;
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
