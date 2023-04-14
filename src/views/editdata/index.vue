<template>
  <div class="editData">
    <van-nav-bar title="编辑资料" class="title" fixed :border="false" placeholder safe-area-inset-top
      @click-left="onClickLeft">
      <template #left>
        <van-icon name="arrow-left" size="20" color="#FFFFFF" />
      </template>
    </van-nav-bar>
    <!-- 单元格 -->
    <van-cell-group :border="false" class="edit-cell" :inset="true">
      <!-- <van-cell title="头像" is-link /> -->
      <CellComponent title="头像" />
      <CellComponent title="昵称" v-bind:value="{ getcomputerName }" @handle-UserInfo="handleUserInfo" ref="nickNameRef" />
      <CellComponent title="密码" v-bind:value="{ getcomputerPwd }" @handle-UserInfo="handleUserInfo" ref="pwdRef" />
      <CellComponent title="手机" v-bind:value="{ getcomputerPhone }" @handle-UserInfo="handleUserInfo" ref="phoneRef" />
      <CellComponent title="邮箱" v-bind:value="{ getcomputerEmail }" @handle-UserInfo="handleUserInfo" ref="emailRef" />
    </van-cell-group>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { userStore } from '@/store/user';
import { showLoadingToast, closeToast } from 'vant';
import { ResetName, ResetPhone, ResetEmail, ResetPwd } from '@/api/user';
import CellComponent from './component/cell.vue';

const store = userStore();
const onClickLeft = () => history.back();
const nickNameRef = ref()
const pwdRef = ref()
const phoneRef = ref()
const emailRef = ref()
// 获取昵称给子组件
const getcomputerName = computed(() => {
  return store.userInfo.UserName
})

// 获取密码给子组件
const getcomputerPwd = computed(() => {
  return 123456
})

// 获取手机给子组件
const getcomputerPhone = computed(() => {
  return store.userInfo.Phone
})

// 获取邮箱给子组件
const getcomputerEmail = computed(() => {
  return store.userInfo.Email
})


// 发送编辑人员信息请求

const sendEditUserInfo = (value: any, storeType: any, sendFuc: Function) => {
  const editUserInfo = {
    UserId: null,
    Token: null,
    Data: null,
  }
  editUserInfo.UserId = store.userInfo.Uid;
  editUserInfo.Token = store.userInfo.Token;
  editUserInfo.Data = value;
  showLoadingToast({
    message: 'loading...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0,
  });
  sendFuc(editUserInfo).then(() => {
    store.userInfo[storeType] = value
    closeToast();
    nickNameRef.value.closeshowHeaderDialog()
    pwdRef.value.closeshowHeaderDialog()
    phoneRef.value.closeshowHeaderDialog()
    emailRef.value.closeshowHeaderDialog()
  });

}


// sava昵称
const handleUserInfo = (data: any) => {
  if (data) {
    console.log(data);
    switch (data.title) {
      case "昵称":
        sendEditUserInfo(data.nickNameValue, 'UserName', ResetName,)
        return;
      case "手机":
        sendEditUserInfo(data.phone, 'Phone', ResetPhone,)
        return;
      case "邮箱":
        sendEditUserInfo(data.email, 'Email', ResetEmail,)
        return;
      case "密码":
        // eslint-disable-next-line no-case-declarations
        const editUserInfo = {
          UserId: null,
          Token: null,
          OldPwd: null,
          NewPwd: null,
        }
        editUserInfo.UserId = store.userInfo.Uid;
        editUserInfo.Token = store.userInfo.Token;
        editUserInfo.OldPwd = data.OldPwd;
        editUserInfo.NewPwd = data.NewPwd;
        showLoadingToast({
          message: 'loading...',
          forbidClick: true,
          loadingType: 'spinner',
          duration: 0,
        });
        ResetPwd(editUserInfo).then(() => {
          closeToast();
          nickNameRef.value.closeshowHeaderDialog()
          pwdRef.value.closeshowHeaderDialog()
          phoneRef.value.closeshowHeaderDialog()
          emailRef.value.closeshowHeaderDialog()
        });
        return;
      default:
        return '';
    }
  }
};




</script>

<style scoped lang="less" >
.editData {
  :deep(.van-cell-group) {
    border: 0.5px solid rgba(255, 255, 255, 0.3);
    background: none;
  }

  .title {
    :deep(.van-nav-bar--fixed) {
      background: #1f2228;

      .van-nav-bar__title {
        font-weight: normal;
        font-size: 18px;
        color: #ffffff;
      }

      .head-change {
        margin-left: 5px;
        font-size: 14px;
        color: #00cc90;
      }
    }
  }

  .edit-cell {
    :deep(.van-cell--clickable) {
      background: #1B1E23;
      padding: 20px 17px;
      color: #cccc;
    }
  }

  :deep(.van-dialog) {
    background: #1f2228;
    border-radius: 10px;
    border: 0.5px solid rgba(255, 255, 255, 0.3);
  }

  :deep(.van-cell__value) {
    min-width: 65%;
  }
}
</style>
