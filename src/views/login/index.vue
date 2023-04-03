<template>
  <div>
    <header class="header">
      <div class="title">首页</div>
      <div class="desc">
        <p>您好，欢迎使用</p>
        <p>{{ systemInfo.systemBaseInfo.SysName }}</p>
      </div>
    </header>
    <main class="main">
      <van-form @submit="onSubmit" class="form" label-align="top" :show-error-message="false">
        <van-cell-group :border="false" class="form-cell">
          <van-field v-model="loginForm.LoginName" name="LoginName" placeholder="请输入账号" class="form-input"
            autocomplete="off" :rules="[{ required: true, message: '请输入账号' }]">
            <template #label>
              <span class="lable-text">账号</span>
            </template>
          </van-field>
          <van-field v-model="loginForm.LoginPwd" type="password" name="LoginPwd" placeholder="请输入密码" class="form-input"
            autocomplete="off" :rules="[{ required: true, message: '请输入密码' }]">
            <template #label>
              <span class="lable-text">密码</span>
            </template>
          </van-field>
        </van-cell-group>
        <div class="login-submit">
          <van-button block type="primary" native-type="submit" :loading="loginLoding">
            登录
          </van-button>
        </div>
      </van-form>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { userStore } from '@/store/user';
import { useRouter } from "vue-router";
import { LoginItem , SystemItem } from './index'
import { login, getSystemInfo } from '@/api/login'
// import { SessionStorage } from '@/utils/utils'
// import { TOKEN_KEY, USER_INFO } from '@/config/base';
const loading = ref(false)
const store = userStore();
const router = useRouter();
const loginLoding = ref(false)
// 登录表单
const loginForm = reactive<LoginItem>({
  // LoginName: 'qh_admin',
  LoginName: 'kiwi_admin',
  // LoginName: 'kiwi_hy',
  LoginPwd: 'rt123456'
})
// 系统信息
const systemInfo = reactive<SystemItem>({
  systemBaseInfo:{}
}) 
const onSubmit = (values: any) => {
  loginLoding.value = true
  login(values).then(res => {
    if ((res as any).IsSuccess) {
      const { Data } = (res as any);
      store.upDateUserInfo(Data)
      // SessionStorage.setKey({
      //   [TOKEN_KEY]: Data.Token,
      //   [USER_INFO]: JSON.stringify(Data),
      // })
      router.push('/')
    }
  }).finally(() => {
    loginLoding.value = false;
  })
};
// 获取系统基本信息
const initData = () => {
  getSystemInfo({}).then(res => {
    loading.value = true
    if ((res as any).IsSuccess) {
      const { Data } = (res as any);
      systemInfo.systemBaseInfo=Data
      store.upDateSystemInfo(Data)
      loading.value = false;
    }
  })
}
onMounted(() => {
  initData()
});
</script>

<style scoped lang="less">
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;

  .title {
    padding-top: 10px;
    font-size: 18px;
  }

  .desc {
    margin-top: 93px;
    text-align: center;
    font-size: 16px;
    color: #FFFFFF;
    line-height: 0px;

    p:nth-child(2) {
      margin-top: 22px;
    }
  }
}

.main {
  margin: 46px 30px 0;

  .form {
    .form-cell {
      .van-cell {
        background: #1F2228;
        padding: 0;
        padding-bottom: 20px;

        .lable-text {
          font-size: 16px;
          color: #EEEEEE;
        }

        /deep/ .van-field__control {
          font-size: 14px;
          padding-left: 16px;
          color: #fff;
          height: 48px;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /deep/ .van-field__control::-webkit-input-placeholder {
          font-size: 14px;
          color: #999999;
        }
      }

      /* 去除单元格cell下边框 */
      .van-cell:after {
        border-bottom: none !important;
        border-bottom-style: none !important;
      }
    }
  }

  .login-submit {
    margin-top: 30px;

    button {
      height: 48px;
      border-radius: 4px;
      border: none;
      background: #00CC90;
    }
  }
}
</style>
