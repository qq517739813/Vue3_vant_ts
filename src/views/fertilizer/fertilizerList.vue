<template>
  <div class="fertilizerList">
    <div class="fertilizerList-title">智能施肥机控制</div>
    <div class="fertilizerList-item" v-for="item in props.fertilizerList" :key="item.CtrlId">
      <div class="fertilizerList-text">
        <img :src="item.ParamIcon" alt="" />
        <span>{{ item.ParamName }}</span>
      </div>
      <div class="fertilizerList-btn">
        <van-button @click="handleShowDialog(item, 'on')">开</van-button>
        <van-button @click="handleShowDialog(item, 'off')">关</van-button>
      </div>
    </div>
    <van-dialog
      v-model:show="dialogShow"
      width="343"
      class="fertilizer-dialog"
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
import { showSuccessToast, showFailToast } from 'vant';
import type { FormInstance } from 'vant';
import { FertilizerControlItem, FertilizerControlInfoItem } from './index';
import { SendFertilizerCommand } from '@/api/fertilizer';

interface Props {
  fertilizerList: FertilizerControlItem[];
  comparePwd: string;
  //   equipmentId: string;
}
// 父传子数据
const props = withDefaults(defineProps<Props>(), {
  fertilizerList: () => [],
  comparePwd: '',
  //   equipmentId:'',
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
const fertilizerControlInfo: FertilizerControlInfoItem = reactive({
  controlInfo: {
    CtrlId: '',
    ParamAddr: '',
    ParamIcon: '',
    ParamName: '',
    Val: '',
  },
});
// 表单实列
const formRef = ref<FormInstance>();
// 打开弹窗
const handleShowDialog = (item: FertilizerControlItem, text: string) => {
  // 每一项数据赋值
  fertilizerControlInfo.controlInfo = item;
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
  fertilizerControlInfo.controlInfo = {
    CtrlId: '',
    ParamAddr: '',
    ParamIcon: '',
    ParamName: '',
    Val: '',
  };
  // 清空输入框开还是关状态
  controlStatus.value = '';
  // 调用父组件方法刷新信息
  //   emit('getData', props.equipmentId);
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
  const { controlInfo } = fertilizerControlInfo;
  if (values.ControlPwd !== props.comparePwd) {
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
    ObjId: controlInfo.CtrlId, // 设备id
    Uid: store.userInfo.Uid,
    // Command: 1, // 1为开，2为关
    Token: store.userInfo.Token,
  };
  const list = { ...payload, Command: controlStatus.value === 'on' ? 1 : 2 };
  SendFertilizerCommand(list).then((res) => {
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
.fertilizerList {
  .fertilizerList-title {
    margin-top: 20px;
    font-size: 16px;
    color: #cccccc;
  }
  .fertilizerList-item {
    box-sizing: border-box;
    margin: 14px 0;
    padding: 11px 0 0 11px;
    height: 109px;
    border-radius: 4px;
    border: 0.5px solid #333333;
    font-size: 14px;
    color: #ffffff;
    .fertilizerList-text {
      display: flex;
      align-items: flex-end;
      img {
        margin-right: 10px;
        width: 20px;
        height: 20px;
      }
    }
    .fertilizerList-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      button {
        margin: 25px 12px 0 0;
        width: 108px;
        height: 33px;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.1);
        box-sizing: border-box;
        border: 0.5px solid rgba(255, 255, 255, 0.2);
        font-size: 12px;
        color: #ffffff;
      }
      button:nth-child(2) {
        color: #00cc90;
      }
    }
  }
  :deep(.fertilizer-dialog) {
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
