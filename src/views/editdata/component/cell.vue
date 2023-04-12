<template>
  <div>
    <van-cell :title="title" :value="getvalue" is-link label-width="20px" label-align="left">
      <template #right-icon>
        <span v-if="title != '头像'" @click="showHeaderDialog" class="email-link">{{ title ===
          "邮箱" ? "更改邮箱" : "修改" }}</span>
      </template>
      <template #value>
        <input :type="getType" :value="getvalue" :disabled="true" style="background: #1B1E23;border:0 ">
      </template>

    </van-cell>

    <van-dialog v-model:show="show" :closeOnClickOverlay="true" :showConfirmButton="false">
      <div class="dialogTitle">
        <p class="dialogTitleName">{{ title }}</p>
        <van-icon color="#fff" size="30px" name="cross" @click="handleCloseDialog" />
      </div>
      <div class="dialogContent">
        <van-form @submit="onSubmit">
          <van-field v-if="title != '密码'" :name="getFormName" v-model="getFormModle" :border="false" autocomplete="off"
            :placeholder="getplaceholder" required :rules="[{ required: true, message: getplaceholder }]" />

          <van-field v-if="title === '密码'" label="旧密码" label-width="70" name="OldPwd" v-model="OldPwd" :border="false"
            autocomplete="off" :placeholder="getplaceholder" required
            :rules="[{ required: true, message: getplaceholder }]" />
          <van-field v-if="title === '密码'" label="新密码" label-width="70" name="NewPwd" v-model="NewPwd" :border="false"
            autocomplete="off" :placeholder="getplaceholder" required
            :rules="[{ required: true, message: getplaceholder }]" />

          <van-button native-type="submit" type="success">保存</van-button>
        </van-form>
      </div>
    </van-dialog>
  </div>
</template>


<script lang="ts" setup>
import { computed, defineProps, ref, defineExpose } from "vue";

const props = defineProps({
  value: {
    type: Object,
    default: undefined,
  },
  title: {
    type: String,
    default: undefined,
  },
});


const emit = defineEmits(['handleUserInfo', 'closeshowHeaderDialog'])

const show = ref<boolean>(false);

// 昵称
const nickNameValue = ref<string>('');
// 密码
const pwd = ref<string>('');
// 手机
const phone = ref<string>('');
// 邮箱
const email = ref<string>('');

// 密码单独写
const OldPwd = ref<string>('');
const NewPwd = ref<string>('');


const onSubmit = (values: any) => {
  console.log(values);

  // eslint-disable-next-line no-param-reassign
  values.title = props.title

  emit('handleUserInfo', values)
  OldPwd.value = ''
  NewPwd.value = ''
}

const handleCloseDialog = () => {
  show.value = false;
};

const showHeaderDialog = () => {
  show.value = true;
};

const closeshowHeaderDialog = () => {
  show.value = false;
};

// 获取的值在显示
const getvalue = computed(() => {
  switch (props.title) {
    case '昵称':
      return props.value?.getcomputerName?.toString() || '';
    case '密码':
      return props.value?.getcomputerPwd?.toString() || '';
    case '手机':
      return props.value?.getcomputerPhone?.toString().replace(/(\d{3})\d{4}(\d{4})/, "$1****$2") || '';
    case '邮箱':
      return props.value?.getcomputerEmail?.toString() || '';
    default:
      return '';
  }
})
// 获取单元格显示类型
const getType = computed(() => {
  switch (props.title) {
    case '昵称':
      return "text";
    case '密码':
      return 'password';
    case '手机':
      return 'tel';
    case '邮箱':
      return 'text';
    default:
      return "text";
  }
});
// 获取弹出框输入框默认显示字符
const getplaceholder = computed(() => {
  switch (props.title) {
    case '昵称':
      return "请输入您的昵称";
    case '密码':
      return '请输入您的密码';
    case '手机':
      return '请输入您的手机';
    case '邮箱':
      return '请输入您的邮箱';
    default:
      return "text";
  }
})

// 获取表单项唯一名字标识

const getFormName = computed(() => {
  switch (props.title) {
    case '昵称':
      return "nickNameValue";
    case '密码':
      return 'pwd';
    case '手机':
      return 'phone';
    case '邮箱':
      return 'email';
    default:
      return "";
  }
})

// 获取表单项的绑定的值
const getFormModle = computed({
  // getter
  get() {
    switch (props.title) {
      case '昵称':
        return nickNameValue.value;
      case '密码':
        return pwd.value;
      case '手机':
        return phone.value;
      case '邮箱':
        return email.value;
      default:
        return " ";
    }
  },
  // setter
  set(newValue) {
    switch (props.title) {
      case '昵称':
        nickNameValue.value = newValue
        return;
      case '密码':
        pwd.value = newValue
        return
      case '手机':
        phone.value = newValue
        return
      case '邮箱':
        email.value = newValue
        return
      default:
        return " ";
    }
  }
})


defineExpose({
  closeshowHeaderDialog,
})



</script>


<style lang="less" scoped>
.edit-cell .van-cell:after {
  display: block;
  content: '';
  border-bottom: none;
}

.email-link {
  text-decoration: underline;
  color: #26A47F;
  width: 60px;
  text-align: right;
}

.dialogTitle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;

  .dialogTitleName {
    color: #cccc;
  }
}

.dialogContent {
  padding: 20px 0;
  display: flex;
  flex-direction: column;

  :deep(.van-field__label) {
    color: #ccc;
  }

  input {
    margin: 0 20px 30px;
    background: #0E0F11;
    font-size: 10px;
    height: 27px;
    border: 0.5px solid rgba(255, 255, 255, 0.3);
    color: #cccc;
  }

  :deep(.van-cell) {
    background: #1f2228;
  }

  :deep(.van-field__body) {
    background: #0e0f11;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  :deep(.van-field__control) {
    color: #ccc;
  }

  .van-form {
    display: flex;
    flex-direction: column;

    :deep(.van-button) {
      margin: 10px 92px;
    }
  }
}
</style>