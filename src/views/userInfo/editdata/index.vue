<template>
  <div class="editData">
    <van-nav-bar title="编辑资料" class="title" fixed :border="false" placeholder safe-area-inset-top
      @click-left="onClickLeft">
      <template #left>
        <van-icon name="arrow-left" size="20" color="#FFFFFF" />
      </template>
    </van-nav-bar>
    <!-- 单元格 -->
    <div class="edit-cell">
      <van-cell title="头像" :border="false">
        <template #value>
          <img src="@/assets/userheader.svg" alt="" />
        </template>
      </van-cell>
      <van-cell title="昵称" :border="false">
        <template #value>
          <span>{{ store.userInfo.user.name }}</span>
        </template>
      </van-cell>
      <br />
      <br />
      <van-cell title="姓名" is-link :border="false">
        <template #value>
          <span>{{ store.userInfo.user.name }}</span>
        </template>
      </van-cell>
      <van-cell @click="handleclick('修改电话')" title="电话" is-link :border="false">
        <template #value>
          <span>{{ store.userInfo.user.phone }}</span>
        </template>
      </van-cell>
      <van-cell @click="handleclick('修改邮箱')" title="邮箱" is-link :border="false">
        <template #value>
          <span>{{ store.userInfo.user.email }}</span>
        </template>
      </van-cell>
    </div>
    <userdialog :type="title" @handle-Save="sava" @handle-Close="handleclose" :isShow="show" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { userStore } from '@/store/user';
import userdialog from '../components/userdialog.vue';
import { ResetPhone, Resetemail } from "@/api/user"
import { showLoadingToast, closeToast, showToast } from 'vant';

const store = userStore();
const onClickLeft = () => history.back();
const title = ref<string>('')
const show = ref<boolean>(false);
const sava = (item: any) => {
  console.log('sava', item);
  console.log(store.userInfo.user.uid, '123', 'item', item);
  const info = {
    val: item[0] as string,
    id: store.userInfo.user.uid
  }
  showLoadingToast({
    message: 'loading...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0,
  });
  switch (item[1]) {
    case '修改电话':
      ResetPhone(info).then(() => {
        closeToast()
        showToast('修改成功');
        show.value = false;
      }).catch(() => {
        showToast('修改失败');
        show.value = false;
      });
      break;
    case '修改邮箱':
      Resetemail(info).then(() => {
        closeToast()
        showToast('修改成功');
        show.value = false;
      }).catch(() => {
        showToast('修改失败');
        show.value = false;
      });
      break;
    default:
      break;
  }

}
const handleclick = (item: string) => {
  show.value = true;
  title.value = item
}
const handleclose = () => {
  show.value = false
}


</script>

<style scoped lang="less" >
.editData {

  //title
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

  :deep(.van-cell-group) {
    // border-bottom: 0.5px solid rgba(255, 255, 255, 0.3);
    // background: none;
  }



  .edit-cell {
    padding: 10px;

    :deep(.van-cell) {
      background: #1B1E23;
      padding: 20px 17px;
      color: #cccc;
      border-bottom: 0.5px solid rgba(255, 255, 255, 0.3);

      .van-cell__value {
        padding: 0 10px;
      }
    }
  }

  // :deep(.van-dialog) {
  //   background: #1f2228;
  //   border-radius: 10px;
  //   border: 0.5px solid rgba(255, 255, 255, 0.3);
  // }

  // :deep(.van-cell__value) {
  //   min-width: 65%;
  // }
}
</style>
