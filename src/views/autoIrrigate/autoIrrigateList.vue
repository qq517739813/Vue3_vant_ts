<template>
  <div class="autoIrrigate-list">
    <div class="autoIrrigate-item" v-for="item in props.irrigateData" :key="item.DevId">
      <div class="item-content">
        <div class="content-img">
          <img :src="`${item.IconPath}${item.Icon}`" alt="" />
        </div>
        <div class="content-text">
          <div class="content-main">
            <span>{{ item.DevName }}</span>
            <span class="item-status">{{ item.Online }}</span>
          </div>
          <div class="item-devId">
            <span>设备ID号:</span>
            <span>{{ item.DevId }}</span>
          </div>
        </div>
      </div>
      <div class="item-opt">
        <van-button @click="handleShowDialog(item, 'on')">开</van-button>
        <van-button @click="handleShowDialog(item, 'off')">关</van-button>
      </div>
    </div>
    <van-dialog
      v-model:show="dialogShow"
      width="343"
      class="autoIrrigate-dialog"
      closeOnClickOverlay
      @closeDialog="handleCloseDialog"
      @touchmove.stop.prevent="moveHandle"
    >
      <template #title>
        <van-nav-bar left-text="密码验证" class="dialog-title" @click-right="onClickRight">
          <template #right>
            <van-icon name="cross" size="20" color="#ffffff" />
          </template>
        </van-nav-bar>
      </template>
      <template #footer>
        <van-form class="form" @submit="onSubmit" ref="formRef" :show-error-message="false">
          <van-field
            type="password"
            class="form-input"
            v-model.trim="ControlPwd"
            name="ControlPwd"
            placeholder="输入密码进行操作验证"
            autocomplete="off"
            :rules="[{ required: true, message: '请输入密码进行操作验证' }]"
          />
          <div class="edit-pwd">
            <van-button native-type="submit">确定</van-button>
          </div>
        </van-form>
      </template>
    </van-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import type { Ref } from 'vue';
import { userStore } from '@/store/user';
import type { FormInstance } from 'vant';
import { Item, IrrigateInfoItem } from './index';
import { showSuccessToast, showFailToast } from 'vant';
import { SendControlCommand } from '@/api/autoIrrigate';

interface Props {
  irrigateData: Item[];
}
// 父传子数据
const props = withDefaults(defineProps<Props>(), {
  irrigateData: () => [],
});
// 父子传方法
// const emit = defineEmits(['getData']);
const store = userStore();
// 控制dialog显示与隐藏
const dialogShow: Ref<boolean> = ref(false);
// 判断输入框开还是关
const controlStatus: Ref<string> = ref('');
// 密码输入框
const ControlPwd: Ref<string> = ref('');
// 每一项得数据
const irrigateInfo: IrrigateInfoItem = reactive({ IrrigateInfo: { ControlPwd: '', DevId: '' } });
// 表单实列
const formRef = ref<FormInstance>();
// 打开弹窗
const handleShowDialog = (item: Item, text: string) => {
  // 每一项数据赋值
  irrigateInfo.IrrigateInfo = item;
  // 输入框开还是关赋值
  controlStatus.value = text;
  // 打开弹窗
  dialogShow.value = true;
};
// 关闭弹窗
const handleCloseDialog = () => {
  // 清空表单验证
  formRef.value?.resetValidation();
  // 清空密码输入框
  ControlPwd.value = '';
  // 清空每一项的数据
  irrigateInfo.IrrigateInfo = { ControlPwd: '', DevId: '' };
  // 清空输入框开还是关状态
  controlStatus.value = '';
  // 调用父组件方法刷新信息
  // emit('getData', store.userInfo.Uid);
  // 关闭弹窗
  dialogShow.value = false;
};
// 导航栏右侧事件
const onClickRight = () => {
  handleCloseDialog();
};
// 阻止dialog页面滑动
const moveHandle = () => {};
// 表单事件
const onSubmit = (values: any) => {
  const { IrrigateInfo } = irrigateInfo;
  if (values.ControlPwd !== IrrigateInfo.ControlPwd) {
    showFailToast({
      message: '密码不正确,请重新输入',
      forbidClick: true,
      position: 'bottom',
      duration: 500,
      onClose: () => {
        ControlPwd.value = '';
      },
    });
    return;
  }
  const payload = {
    ObjId: IrrigateInfo.DevId, // 设备id
    Uid: store.userInfo.Uid,
    // Command: 1, // 1为开或正向，0为关或停止，2反向
    Token: store.userInfo.Token,
  };
  const list = { ...payload, Command: controlStatus.value === 'on' ? 1 : 0 };
  SendControlCommand(list).then((res) => {
    if ((res as any).IsSuccess) {
      showSuccessToast({
        message: '发送命令成功',
        forbidClick: true,
        position: 'bottom',
        duration: 500,
      });
      handleCloseDialog();
    }
  });
};
</script>

<style scoped lang="less">
.autoIrrigate-list {
  color: #ffffff;
  .autoIrrigate-item {
    box-sizing: border-box;
    padding: 12px 21px 17px 10px;
    margin-bottom: 14px;
    height: 150px;
    border-radius: 4px;
    border: 0.5px solid #333333;
    .item-content {
      display: flex;
      padding-bottom: 12px;
      margin-bottom: 17px;
      border-bottom: 0.5px solid rgba(255, 255, 255, 0.1);

      .content-img {
        margin-right: 10px;
        img {
          width: 50px;
          height: 50px;
        }
      }
      .content-text {
        .content-main {
          margin-bottom: 15px;
          font-size: 16px;
          .item-status {
            margin-left: 15px;
            font-size: 14px;
            color: #00cc90;
          }
        }
        .item-devId {
          font-size: 12px;
          color: #9e9e9e;
          span:nth-child(1) {
            margin-right: 15px;
          }
        }
      }
    }
    .item-opt {
      display: flex;
      align-items: center;
      justify-content: space-between;
      button {
        width: 130px;
        height: 33px;
        font-size: 12px;
        color: #9e9e9e;
        background: rgba(255, 255, 255, 0.1);
        border: 0.5px solid rgba(255, 255, 255, 0.2);
        border-radius: 4px;
      }
      button:nth-child(2) {
        color: #00cc90;
      }
    }
  }
  :deep(.autoIrrigate-dialog) {
    background: #1f2228;
    .van-dialog__header--isolated {
      padding: 0;
      .dialog-title {
        background: #1f2228;
        .van-nav-bar__text {
          font-weight: normal;
          font-size: 16px;
          color: #ffffff;
        }
        &::after {
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
      }
    }
    .form {
      padding-left: 16px;
      .form-input {
        margin-top: 22px;
        background: #1f2228;
        .van-field__control {
          font-size: 14px;
          padding-left: 16px;
          color: #fff;
          height: 36px;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        &::after {
          border-bottom: none;
        }
      }
      .edit-pwd {
        margin: 6px 0 32px;
        display: flex;
        justify-content: center;
        button {
          width: 150px;
          height: 33px;
          font-size: 14px;
          color: #ffffff;
          background: #00cc90;
          border: 0.5px solid rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
      }
    }
  }
}
:deep(.van-toast) {
  z-index: 3333;
}
</style>
