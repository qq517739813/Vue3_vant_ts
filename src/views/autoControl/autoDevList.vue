<template>
  <div class="autoDevList">
    <div class="autoDevList-title">智能设备列表</div>
    <div class="autoDevList-content">
      <div class="autoDevList-item" v-for="item in props.autoControlList" :key="item.CtrlId">
        <div class="item-head">
          <span :style="item.IsOnline ? 'color: #00cc90' : 'color: #FF8935'">{{
            item.IsOnline ? '在线' : '待机'
          }}</span>
          <van-button class="setting" @click="handleShowDialog(item, 'setting')">
            <template #icon>
              <img src="@/assets/autoControlSetting.svg" alt="" />
            </template>
          </van-button>
        </div>
        <div class="item-center">
          <img :src="item.IsOnline ? item.Icon : item.OffIcon" alt="" />
          <span>{{ item.CtrlName }}</span>
        </div>
        <div class="item-footer-isTurn" v-if="item.IsTurn">
          <van-button @click="handleShowDialog(item, 'on')">正转</van-button>
          <van-button @click="handleShowDialog(item, 'turn')">反转</van-button>
          <van-button @click="handleShowDialog(item, 'off')">停止</van-button>
        </div>
        <div class="item-footer" v-else>
          <van-button @click="handleShowDialog(item, 'on')">开</van-button>
          <van-button @click="handleShowDialog(item, 'off')">关</van-button>
        </div>
      </div>
    </div>
    <van-dialog
      v-model:show="dialogShow"
      width="343"
      class="autoDevList-dialog"
      closeOnClickOverlay
      @closed="handleCloseDialog"
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
import { ChannelItem, ChannelInfoItem } from './index';
import { showSuccessToast, showFailToast } from 'vant';
import type { FormInstance } from 'vant';
import { SendControlCommand } from '@/api/autoIrrigate';

interface Props {
  autoControlList: ChannelItem[];
}
// 父传子数据
const props = withDefaults(defineProps<Props>(), {
  autoControlList: () => [],
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
const channelItem: ChannelInfoItem = reactive({ channelInfo: { CtrlId: '', CtrlPwd: '' } });
// 表单实列
const formRef = ref<FormInstance>();
// 打开弹窗
const handleShowDialog = (item: ChannelItem, text: string) => {
  // 每一项数据赋值
  channelItem.channelInfo = item;
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
  channelItem.channelInfo = { CtrlId: '', CtrlPwd: '' };
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
  const { channelInfo } = channelItem;
  if (values.ControlPwd !== channelInfo.CtrlPwd) {
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
    ObjId: channelInfo.CtrlId, // 设备id
    Uid: store.userInfo.Uid,
    Command: 0, // 1为开或正向，0为关或停止，2反向
    Token: store.userInfo.Token,
  };
  switch (controlStatus.value) {
    // case 'setting':
    //   { ...payload, Command: 1 };
    //   return ;
    case 'on':
      payload.Command = 1;
      break;
    case 'turn':
      payload.Command = 0;
      break;
    case 'off':
      payload.Command = 2;
      break;
    default:
      break;
  }
  SendControlCommand(payload).then((res) => {
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
.autoDevList {
  .autoDevList-title {
    margin: 24px 0 11px;
    font-size: 16px;
    color: #cccccc;
  }
  .autoDevList-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .autoDevList-item {
      box-sizing: border-box;
      margin-bottom: 14px;
      padding: 13px 12px 18px 8px;
      width: 164px;
      min-height: 180px;
      border-radius: 4px;
      border: 0.5px solid #333333;
      .item-head {
        display: flex;
        justify-content: space-between;
        margin-bottom: 17px;
        font-size: 14px;
        .setting {
          padding: 0;
          border: none;
          background: none;
          height: 20px;
          width: 20px;
          img {
            vertical-align: middle;
          }
        }
      }
      .item-center {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        font-size: 12px;
        color: #9e9e9e;
        img {
          width: 45px;
          height: 45px;
          margin-bottom: 5px;
        }
      }
      .item-footer-isTurn,
      .item-footer {
        display: flex;
        button {
          width: 40px;
          height: 25px;
          padding: 0;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.1);
          box-sizing: border-box;
          border: 0.5px solid rgba(255, 255, 255, 0.2);
          font-size: 12px;
          color: #ffffff;
          &:last-child {
            color: #00cc90;
          }
        }
      }
      .item-footer-isTurn {
        justify-content: space-between;
      }
      .item-footer {
        justify-content: center;
        button:first-child {
          margin-right: 12px;
        }
      }
    }
  }
  :deep(.autoDevList-dialog) {
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
</style>
