<template>
  <div>
    <header class="header">
      <div class="title">认养系统</div>
      <div class="desc">
        <p>欢迎登录</p>
      </div>
    </header>
    <main class="main">
      <van-form @submit="onSubmit" class="form" label-align="top" :show-error-message="false">
        <van-cell-group :border="false" class="form-cell">
          <van-field v-model="loginForm.name" name="name" placeholder="请输入账号" class="form-input" autocomplete="off"
            :rules="[{ required: true, message: '请输入账号' }]">
            <template #label>
              <span class="lable-text">账号</span>
            </template>
          </van-field>
          <van-field v-model="loginForm.password" type="password" name="password" placeholder="请输入密码" class="form-input"
            autocomplete="off" :rules="[{ required: true, message: '请输入密码' }]">
            <template #label>
              <span class="lable-text">密码</span>
            </template>
          </van-field>
        </van-cell-group>
        <div class="login-submit">
          <van-button block type="primary" native-type="submit" :loading="loginLoding" loading-type="spinner">
            登录
          </van-button>
        </div>
      </van-form>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { showToast } from 'vant';
import { userStore } from '@/store/user';
import { useRouter } from 'vue-router';
import type { Router } from 'vue-router';
import { LoginItem } from './index';
import { login } from '@/api/login';
import { getUserInfo } from '@/api/user';

const store = userStore();
const router: Router = useRouter();
const loginLoding = ref(false);
// 登录表单
const loginForm = reactive<LoginItem>({
  // name: 'laixiandong', //客户
  // name: 'chenli',  // 工作人员
  name: 'wangqingshan', // 管理员
  password: 'rt123456',
});
const onSubmit = async (values: any) => {
  try {
    loginLoding.value = true;
    const { data: loginRes } = await login(values);
    store.upDateUserInfo(loginRes);
    router.push('/');
    const { data: userRes } = await getUserInfo({ id: loginRes.user.uid });
    store.upDateUserCompleteInfo(userRes);
    showToast({
      message: '登录成功',
      position: 'bottom',
    });
  } catch (error) {
    showToast({
      message: '登录失败，请重试',
      position: 'bottom',
      type: 'fail',
    });
  } finally {
    loginLoding.value = false;
  }
};

onMounted(() => { });
</script>

<style scoped lang="less">
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;

  .title {
    padding-top: 10px;
    font-size: 18px;
  }

  .desc {
    margin-top: 93px;
    text-align: center;
    font-size: 16px;
    color: #ffffff;
    line-height: 0px;
  }
}

.main {
  margin: 46px 30px 0;

  .form {
    .form-cell {
      .van-cell {
        background: #1f2228;
        padding: 0;
        padding-bottom: 20px;

        .lable-text {
          font-size: 16px;
          color: #eeeeee;
        }

        :deep(.van-field__control) {
          font-size: 14px;
          padding-left: 16px;
          color: #fff;
          height: 48px;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        :deep(.van-field__control::-webkit-input-placeholder) {
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
      background: #00cc90;
    }
  }
}
</style>
