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
        <VanCol span="2 "> ----</VanCol>
        <VanCol span="11 ">
          <VanField readonly v-model="Etime" input-align="center" clickable class="timeinputclass"
            @click="EtimeShow = !EtimeShow" />
        </VanCol>
      </VanRow>
      <div style="margin: 10px 0;">
        <VanButton style="background: #1F2228;" plain block color="#ccc" @click="submitWeekData"> 提交 </VanButton>
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
    <br />
    <van-cell  title="邮箱" value="内容">
      <template #value>
        <!-- <div v-for="item in WarnAccount " :key="item.ID"> -->
          <!-- <span>123</span> -->
          <!-- <span>{{ item.Account }}</span> -->
        <!-- </div> -->
      </template>

    </van-cell>
    <!-- <span class="warnStyle-title">{{WarnAccount[0].ProId}}</span> -->
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue';
import type { Ref } from 'vue';
import { userStore } from '@/store/user';
import { showLoadingToast, closeToast, TimePickerColumnType } from 'vant';
import { GetWarnTime, GetWarnAccount, WarnTimeConfig } from '@/api/user';


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
const WarnAccount = reactive({list:[]});
// 时间展示开关
const BtimeShow = ref(false);
const EtimeShow = ref(false);
// 星期加工后数据
const rows = reactive([] as any)
const columnsType: TimePickerColumnType[] = ['hour', 'minute', 'second'];
const ProjId = ref(store.userInfo.ProjId);
const Token = ref(store.userInfo.Token);



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
      WarnAccount.list = Data
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
  console.log(newweekdays);

  WarnTimeConfig(newweekdays).then(() => {
    initData();

  })

  // console.log(WarnAccount.values[4]);

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
    margin-top: 24px;
    font-size: 16px;
    color: #cccccc;
  }

  .warnStyle-title {
    margin-top: 38px;
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
    border: 1px solid #ccc;

    :deep(.van-field__control) {
      color: #ccc
    }
  }
}
</style>
