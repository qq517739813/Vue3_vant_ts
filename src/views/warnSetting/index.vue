<template>
  <div class="warnSetting">
    <VanNavBar title="报警设置" class="title" fixed :border="false" placeholder safe-area-inset-top @click-left="onClickLeft">
      <template #left>
        <VanIcon name="arrow-left" size="20" color="#FFFFFF" />
      </template>
    </VanNavBar>

    <div class="warnTime-title">报警时间</div>
    <br />
    <!-- 日期开关选择 -->
    <div class="weekList">

      <VanRow justify="space-between" v-for="(row, rowIndex) in rows" :key="rowIndex">
        <VanCol span="7" v-for="(cell, cellIndex) in row" :key="cellIndex">
          <div class="weekDays">
            <span>{{ cell.label }}</span>
            <VanSwitch active-color="#00CC90" v-model="cell.value" />
          </div>
        </VanCol>
      </VanRow>

      <!-- 开始时间和结束时间 -->
      <VanRow>
        <VanCol span="11 ">
          <VanField readonly v-model="Btime" input-align="center" clickable class="timeinputclass"
            @click="BtimeShow = !BtimeShow" />
        </VanCol>
        <VanCol span="2 " style="display: flex; align-items: center; justify-content: center;"> <span>----</span></VanCol>
        <VanCol span="11 ">
          <VanField readonly v-model="Etime" input-align="center" clickable class="timeinputclass"
            @click="EtimeShow = !EtimeShow" />
        </VanCol>
      </VanRow>
      <div class="submitWeekDataBtn" style="margin: 10px 0;">
        <VanButton plain block @click="submitWeekData"> 保存 </VanButton>
      </div>

      <VanPopup v-model:show="BtimeShow" :style="{ height: '30%' }" position="bottom">
        <VanTimePicker @cancel="BtimeShow = !BtimeShow" @confirm="OnBTimePickerconfirm" :columns-type="columnsType"
          v-model="BtimePopup" :formatter="formatter" />
      </VanPopup>

      <VanPopup v-model:show="EtimeShow" :style="{ height: '30%' }" position="bottom">
        <VanTimePicker @cancel="EtimeShow = !EtimeShow" @confirm="OnETimePickerconfirm" :columns-type="columnsType"
          v-model="EtimePopup" :formatter="formatter" />
      </VanPopup>
    </div>

    <div class="warnStyle-title">报警方式</div>
    <!-- 邮箱方式 -->
    <div class="warnStyle-title">邮箱</div>
    <van-cell value="内容">
      <template #value>
        <van-row v-for="item in WarnAccountListEmail.list " :key="item.ID">
          <van-col class="bottomCol" span="19">
            <van-field readonly v-model="item.Account" />
          </van-col>
          <van-col span="5">
            <van-button style="color: #ccc; border: 0.5px solid rgb(255 255 255 / 30%); background: #1f2228 ;"
              @click="deleteWarnAccount(item.Account)">删除</van-button>
          </van-col>
        </van-row>
      </template>
    </van-cell>
    <van-form @submit="onSubmit(1)" @failed="onFailed(1)">
      <van-cell value="内容">
        <template #value>
          <van-row>
            <van-col class="bottomCol" span="19">
              <van-field autocomplete="off" v-model="warnEmailValue" placeholder="请输入接收报警信息的邮箱" :rules="[
                { required: true },
                { pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/i }
              ]" />
            </van-col>
            <van-col span="5">
              <van-button style="color: #ccc; border: 0.5px solid rgb(255 255 255 / 30%); background: #1f2228 ;"
                native-type="submit">添加</van-button>
            </van-col>
          </van-row>
        </template>
      </van-cell>
    </van-form>
    <!-- 手机方式 -->
    <div class="warnStyle-title">手机</div>
    <van-cell value="内容">
      <template #value>
        <van-row v-for="item in WarnAccountListPhone.list " :key="item.ID">
          <van-col class="bottomCol" span="19">
            <van-field readonly v-model="item.Account" />
          </van-col>
          <van-col span="5">
            <van-button style="color: #ccc; border: 0.5px solid rgb(255 255 255 / 30%); background: #1f2228 ;"
              @click="deleteWarnAccount(item.Account)">删除</van-button>
          </van-col>
        </van-row>
      </template>
    </van-cell>
    <van-form @submit="onSubmit" @failed="onFailed">
      <van-cell value="内容">
        <template #value>
          <van-row>
            <van-col class="bottomCol" span="19">
              <van-field autocomplete="off" v-model="warnPhoneValue" placeholder="请输入接收报警信息的手机号" :rules="[
                { required: true },
                { pattern: /^1[3456789]\d{9}$/ }
              ]" />
            </van-col>
            <van-col span="5">
              <van-button native-type="submit"
                style="color: #ccc; border: 0.5px solid rgb(255 255 255 / 30%); background: #1f2228 ;">添加</van-button>
            </van-col>
          </van-row>
        </template>
      </van-cell>
    </van-form>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue';
import type { Ref } from 'vue';
import { userStore } from '@/store/user';
import { showLoadingToast, closeToast, TimePickerColumnType, showToast } from 'vant';
import { GetWarnTime, GetWarnAccount, WarnTimeConfig, WarnAccount, DelWarnAccount } from '@/api/user';

const store = userStore();
const loading: Ref<boolean> = ref(false);
// 展开开始时间
const Btime = ref<string>('开始时间');
// 展开结束时间
const Etime = ref('结束时间');
// 开始时间数据
const BtimePopup = ref([]);
const EtimePopup = ref([]);
// 报警方式
// const WarnAccountList = reactive({ list: [] as any[] });
const WarnAccountListEmail = reactive({ list: [] as any[] });
const WarnAccountListPhone = reactive({ list: [] as any[] });
// 时间展示开关
const BtimeShow = ref(false);
const EtimeShow = ref(false);
// 星期加工后数据
const rows = reactive([] as any)
const columnsType: TimePickerColumnType[] = ['hour', 'minute', 'second'];
const ProjId = ref(store.userInfo.ProjId);
const Token = ref(store.userInfo.Token);
// 报警接收邮箱输入框内容
const warnEmailValue = ref<string>('')
// 报警接收邮箱输入框内容
const warnPhoneValue = ref<string>('')



const formatter = (type: any, option: any) => {
  const newOption = { ...option }
  if (type === 'hour') {
    newOption.text += '时';
  }
  if (type === 'minute') {
    newOption.text += '分';
  }
  if (type === 'second') {
    newOption.text += '秒';
  }
  return newOption;
};

// 定义星期接口
interface Weekday {
  name: string;
  label: string;
  value: boolean;
}
// 定义星期数据
const weekdays: Weekday[] = reactive(
  [
    { name: 'Monday', label: '星期一', value: false },
    { name: 'Tuesday', label: '星期二', value: false },
    { name: 'Wednesday', label: '星期三', value: false },
    { name: 'Thursday', label: '星期四', value: false },
    { name: 'Friday', label: '星期五', value: false },
    { name: 'Saturday', label: '星期六', value: false },
    { name: 'Sunday', label: '星期日', value: false },
  ]
)
for (let i = 0; i < weekdays.length; i += 3) {
  const row = weekdays.slice(i, i + 3)
  rows.push(row)
}



// 获取警告时间和方式
const initData = async () => {
  loading.value = true;
  showLoadingToast({
    message: 'loading...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0,
  });
  const payload = {
    ProjId: ProjId.value,
    Token: Token.value,
  };
  await GetWarnTime(payload).then((res) => {
    if ((res as any).IsSuccess) {
      const { Data } = res as any;
      Btime.value = Data.Btime;
      Etime.value = Data.Etime;
      for (const day of weekdays) {
        if (day.name in Data && typeof Data[day.name] === "boolean") {
          day.value = Data[day.name];
        }
      }
      loading.value = false;
      closeToast();
    }
  });
  await GetWarnAccount(payload).then((res) => {
    if ((res as any).IsSuccess) {
      const { Data } = res as any;
      // console.log(Data);
      WarnAccountListEmail.list = []
      WarnAccountListPhone.list = []
      for (const key of Data) {
        if (key.AccountType === 1) {
          WarnAccountListEmail.list.push(key)
        } else if (key.AccountType === 2) {
          WarnAccountListPhone.list.push(key)
        }
      }
      loading.value = false;

      closeToast();
    }

  });
};

// 监听确认时间按钮
const OnBTimePickerconfirm = (value: any) => {
  // console.log(value.selectedValues,'value');
  BtimeShow.value = false;
  Btime.value = value.selectedValues.join(":")
}
const OnETimePickerconfirm = (value: any) => {
  // console.log(value.selectedValues,'value');
  EtimeShow.value = false;
  Etime.value = value.selectedValues.join(":")
}


// 提交时间信息
const submitWeekData = () => {
  const newweekdays: any = {
    ProId: ProjId.value,
    Token: Token.value
  }
  weekdays.forEach(item => {
    newweekdays[item.name] = item.value

  });
  newweekdays.Btime = Btime.value
  newweekdays.Etime = Etime.value
  // console.log(newweekdays);

  WarnTimeConfig(newweekdays).then(() => {
    initData();

  })

  // console.log(WarnAccount.values[4]);

}

// 添加报警方式
const addWarnAccount = (types: number) => {
  const warnAccount = {
    Account: types === 1 ? warnEmailValue.value : warnPhoneValue.value,
    AccountType: types === 1 ? 1 : 2,
    ProId: store.userInfo.ProjId,
    Token: store.userInfo.Token,
  };
  WarnAccount(warnAccount).then(res => {
    if ((res as any).IsSuccess) {
      // console.log(res);
      initData()
      warnEmailValue.value = ''
      warnPhoneValue.value = ''
    }
  })

}

// 删除报警方式

const deleteWarnAccount = (Account: string) => {
  const warnAccount = {
    Account,
    AccountType: 1,
    ProId: store.userInfo.ProjId,
    Token: store.userInfo.Token,
  };
  DelWarnAccount(warnAccount).then(res => {
    if ((res as any).IsSuccess) {
      initData()

    }
  })
}

const onSubmit = (value: any) => {
  addWarnAccount(value)

}
const onFailed = (type: Number) => {
  if (type === 1) {
    showToast('请填写正确邮箱！')

  } else {
    showToast('请填写正确手机号！')
  }

}

// 后退
const onClickLeft = () => history.back();

onMounted(() => {
  initData();
});








</script>

<style scoped lang="less">
.warnSetting {
  padding: 0 16px;

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

  .warnSetting-pull-refresh {
    :deep(.van-pull-refresh__track) {
      min-height: calc(100vh - 46px);
    }
  }

  .pulling,
  .loosing {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    font-size: 20px;

    span {
      margin-left: 10px;
    }
  }

  .warnTime-title,
  .warnStyle-title {
    margin-top: 20px;
    font-size: 16px;
    color: #cccccc;
  }

  .van-cell {
    background: #1f2228;

  }

  .van-cell:after {
    display: none;
  }

  .submitWeekDataBtn {
    .van-button {
      border: 0.5px solid rgba(255, 255, 255, 0.3);
      background: #1f2228;
      color: #ccc;
    }
  }
}

// 星期样式
.weekList {
  font-size: 10px;
  color: #ccc !important;

  .weekDays {
    display: flex;
    align-items: center;
    margin: 10px 0;

    span {
      padding-right: 5px;
    }
  }

  .timeinputclass {
    background: #1F2228;
    border: 0.5px solid rgba(255, 255, 255, 0.3);

    :deep(.van-field__control) {
      color: #ccc
    }
  }
}

.bottomCol {
  border: 0.5px solid rgba(255, 255, 255, 0.3);
  color: #ccc;

  :deep(.van-field__control) {
    color: #ccc;
  }
}
</style>
