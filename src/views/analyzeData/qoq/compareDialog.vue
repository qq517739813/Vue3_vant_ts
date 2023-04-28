<template>
  <van-dialog
    v-model:show="show"
    width="343"
    class="compare-dialog"
    closeOnClickOverlay
    @closed="handleCloseDialog"
    :show-confirm-button="false"
    teleport="body"
  >
    <template #default>
      <div class="dialog-title">
        <span>添加对比</span>
        <van-icon name="cross" size="20" color="#ffffff99" @click="handleCloseDialog" />
      </div>
      <van-tabs
        v-model:active="activeId"
        background="#1f2228"
        color="#00CC90"
        :line-width="60"
        line-height="2"
        title-inactive-color="#ffffff99"
        title-active-color="#00CC90"
        animated
        class="tabs-content"
      >
        <van-tab title="同比分析">
          <van-form class="common-form" @submit="onSubmit" ref="commonFormRef">
            <van-field
              label-width="65"
              label-align="right"
              v-model="commondevItem.ParamName"
              class="form-select"
              name="commonParamId"
              placeholder="点击选择参数"
              label="参数选择"
              readonly
              @click="handleChooe(pickerTypes.commonChooseparams)"
            />
            <van-field
              label-width="65"
              label-align="right"
              v-model="commonDate.calendar.Bdate"
              class="form-select"
              name="commonDate"
              placeholder="点击选择日期"
              label="选择日期"
              readonly
              @click="handleChooe(pickerTypes.commonChooseDate)"
            />
            <van-field
              label-width="65"
              label-align="right"
              v-model="commondevItem.DevId"
              class="form-select"
              name="commonDevId"
              placeholder="点击选择设备"
              label="对比设备"
              readonly
              @click="handleChooe(pickerTypes.choosedev)"
            />
            <div class="tips">
              友情提示：添加多个设备前，请先选择设备场景和设备名称然后点击添加设备按钮进行添加
            </div>
            <div class="common-submit">
              <van-button native-type="submit">保存</van-button>
            </div>
          </van-form>
        </van-tab>
        <van-tab title="环比分析">
          <van-form class="qoq-form" @submit="onSubmit" ref="qoqFormRef">
            <van-field
              label-width="65"
              label-align="right"
              v-model="qoqdevItem.ParamName"
              class="form-select"
              name="qoqParamId"
              placeholder="点击选择参数"
              label="参数选择"
              readonly
              @click="handleChooe(pickerTypes.qoqChooseparams)"
            />
            <van-field
              v-for="(item, index) in monthList"
              :key="index"
              label-width="65"
              label-align="right"
              v-model="item.calendar.Bdate"
              class="form-select"
              name="qoqDate"
              placeholder="点击选择日期"
              label="选择日期"
              readonly
              @click-input="handleChooe(pickerTypes.qoqChooseDate, index)"
            >
              <template #button>
                <van-button size="small" class="delete-month" @click="delMonthList(item)"
                  >删除该月份</van-button
                >
              </template>
              <template #button v-if="index === 0 && monthList.length < 5">
                <van-button size="small" class="add-month" @click="addMonthList"
                  ><van-icon
                    name="plus"
                    size="14"
                    color="#00cc90"
                    style="margin-right: 5px"
                  />添加月份</van-button
                >
              </template>
            </van-field>
            <div class="tips">
              友情提示：添加多个对比月份前，请先选择对比月份然后点击添加月份按钮进行添加
            </div>
            <div class="common-submit">
              <van-button native-type="submit">保存</van-button>
            </div>
          </van-form>
        </van-tab>
      </van-tabs>
    </template>
  </van-dialog>
  <!-- 参数选择 -->
  <params-switch
    v-if="popupType === pickerTypes.commonChooseparams || popupType === pickerTypes.qoqChooseparams"
    v-model:popup-visbile="chooseVisible"
    @handele-dev="handClickParam"
    :curentParamId="popupType === 'commonParams' ? commondevItem.ParamId : qoqdevItem.ParamId"
  />
  <!-- 选择时间 -->
  <common-date-picker
    v-if="popupType === pickerTypes.commonChooseDate || popupType === pickerTypes.qoqChooseDate"
    v-model:show-calendar="chooseVisible"
    @calendar-confirm="onConfirm"
  />
</template>

<script lang="ts" setup>
import { ref, computed, reactive } from 'vue';
import type { Ref } from 'vue';
import { DateItem } from '@/components/index';
import { DevParamBaseItem } from '../index';
import { showFailToast } from 'vant';
import type { FormInstance } from 'vant';
import ParamsSwitch from '../paramsSwitch.vue';
import CommonDatePicker from '@/components/commonDatePicker.vue';
import moment from 'moment';

enum pickerTypes {
  commonChooseparams = 'commonParams', // 选择参数
  qoqChooseparams = 'qoqParams', // 选择参数
  commonChooseDate = 'commonDate', // 选择日期
  qoqChooseDate = 'qoqdate', // 选择日期
  choosedev = 'dev', // 选择参数
}
interface Props {
  dialogVisible: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  dialogVisible: false,
});
// 父子传方法
const emit = defineEmits<{
  (e: 'update:dialogVisible', value: boolean): void;
  (e: 'confirmDialog', ParamId: string, item: DateItem): void;
}>();
// 切换Tab标签页id
const activeId: Ref<number> = ref(0);
// 记录动态月份的序号
const monthIndex: Ref<number> = ref(0);
// 表单实列
const commonFormRef = ref<FormInstance>();
//  同比分析选择日期
const commonDate = reactive<DateItem>({
  calendar: { Bdate: '', Edate: '' },
});
//  环比分析选择日期
const qoqDate = reactive<DateItem>({
  calendar: { Bdate: '', Edate: '' },
});
//  同比分析对比设备(参数)选择
const commondevItem = reactive<DevParamBaseItem>({
  DevId: '',
  DevName: '',
  ParamId: '',
  ParamName: '',
});
//  环比分析对比设备(参数)选择
const qoqdevItem = reactive<DevParamBaseItem>({
  DevId: '',
  DevName: '',
  ParamId: '',
  ParamName: '',
});
// 动态增加月份
const monthList = reactive<DateItem[]>([
  {
    calendar: { Bdate: '', Edate: '' },
  },
]);
// popup弹窗类型
const popupType: Ref<string> = ref('');
// 控制各选择弹窗状态
const chooseVisible: Ref<boolean> = ref(false);
// popup弹窗显示状态
const show = computed({
  get() {
    return props.dialogVisible;
  },
  set(value) {
    emit('update:dialogVisible', value);
  },
});
// 关闭弹窗
const handleCloseDialog = () => {
  // 清空表单验证
  commonFormRef.value?.resetValidation();
  emit('update:dialogVisible', false);
  // 清空表单数据
  commondevItem.DevId = '';
  commondevItem.DevName = '';
  commondevItem.ParamId = '';
  commondevItem.ParamName = '';
  commonDate.calendar.Bdate = '';
  commonDate.calendar.Edate = '';
  qoqdevItem.DevId = '';
  qoqdevItem.DevName = '';
  qoqdevItem.ParamId = '';
  qoqdevItem.ParamName = '';
  monthIndex.value = 0;
  monthList.length = 1;
  monthList[monthIndex.value].calendar.Bdate = '';
  monthList[monthIndex.value].calendar.Edate = '';
  activeId.value = 0;
};
// 表单输入框点击事件
const handleChooe = (type: string, index?: number) => {
  if (type === 'qoqdate' && typeof index === 'number') {
    monthIndex.value = index;
  }
  popupType.value = type;
  if (type === 'dev') {
    showFailToast({
      message: '无数据',
      forbidClick: true,
      position: 'middle',
      duration: 500,
    });
    return;
  }
  chooseVisible.value = true;
};
// 日期确定事件
const onConfirm = (values: DateItem) => {
  if (popupType.value === 'commonDate') {
    commonDate.calendar.Bdate = moment(values.calendar.Bdate).format('YYYY-MM');
    commonDate.calendar.Edate = moment(values.calendar.Edate).format('YYYY-MM');
  } else {
    monthList[monthIndex.value].calendar.Bdate = moment(values.calendar.Bdate).format('YYYY-MM');
    monthList[monthIndex.value].calendar.Edate = moment(values.calendar.Bdate).format('YYYY-MM');
  }
  chooseVisible.value = false;
};
// 选择设备参数点击事件
const handClickParam = (item: DevParamBaseItem) => {
  if (popupType.value === 'commonParams') {
    commondevItem.DevId = item.DevId;
    commondevItem.DevName = item.DevName;
    commondevItem.ParamId = item.ParamId;
    commondevItem.ParamName = item.ParamName;
  } else {
    qoqdevItem.DevId = item.DevId;
    qoqdevItem.DevName = item.DevName;
    qoqdevItem.ParamId = item.ParamId;
    qoqdevItem.ParamName = item.ParamName;
  }
  chooseVisible.value = false;
};
// 添加月份事件
const addMonthList = () => {
  monthList.push({
    calendar: { Bdate: '', Edate: '' },
  });
};
// 删除月份事件
const delMonthList = (item: DateItem) => {
  const index = monthList.indexOf(item);
  if (index !== -1) {
    monthList.splice(index, 1);
  }
};
const onSubmit = () => {
  if (!commondevItem.ParamId && activeId.value === 0) {
    showFailToast({
      message: '请选择参数',
      forbidClick: true,
      position: 'middle',
      duration: 500,
    });
    return;
  }
  if (!qoqdevItem.ParamId && activeId.value === 1) {
    showFailToast({
      message: '请选择参数',
      forbidClick: true,
      position: 'middle',
      duration: 500,
    });
    return;
  }
  if (!commonDate.calendar.Edate && activeId.value === 0) {
    showFailToast({
      message: '请选日期',
      forbidClick: true,
      position: 'middle',
      duration: 500,
    });
    return;
  }
  const qoqDateFlag = monthList.every(item => item.calendar.Bdate.length>0)
  if (!qoqDateFlag && activeId.value === 1) {
    showFailToast({
      message: '请选日期',
      forbidClick: true,
      position: 'middle',
      duration: 500,
    });
    return;
  }
  if (!commondevItem.DevId && activeId.value === 0) {
    showFailToast({
      message: '请选择设备',
      forbidClick: true,
      position: 'middle',
      duration: 500,
    });
    return;
  }
  if (activeId.value === 0) {
    emit('confirmDialog', commondevItem.ParamId, commonDate);
  } else {
    const BdateStr=monthList.map(item=>item.calendar.Bdate).join()
    const EdateStr = monthList.map(item => item.calendar.Edate).join()
    qoqDate.calendar.Bdate=BdateStr
    qoqDate.calendar.Edate=EdateStr
    emit('confirmDialog', qoqdevItem.ParamId, qoqDate);
  }
};
</script>

<style scoped lang="less">
.compare-dialog {
  background: #1f2228;
  .van-dialog__content {
    .dialog-title {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      padding: 0 16px;
      height: 46px;
      background: #1f2228;
      color: #ffff;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      i {
        position: absolute;
        top: 13px;
        right: 16px;
      }
    }
    .tabs-content {
      background: #1f2228;
      .common-form,
      .qoq-form {
        margin-top: 16px;
        :deep(.form-select) {
          padding-bottom: 10px;
          background: #1f2228;
          .van-field__label--right {
            font-size: 14px;
            color: #ffffff99;
            height: 44px;
            line-height: 44px;
          }
          .van-field__control {
            width: 125px;
            padding-left: 10px;
            font-size: 14px;
            color: #ffffff99;
            height: 44px;
            line-height: 44px;
            border-radius: 4px;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          &::after {
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          .add-month,
          .delete-month {
            margin-left: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 6px 9px;
            border-radius: 4px;
            border: 0.5px solid rgba(255, 255, 255, 0.4);
            font-size: 14px;
            color: #cccccc;
            background: #1f2228;
          }
          .delete-month {
            border: none;
            border-radius: 0;
            color: #ff3347;
          }
        }
        .tips {
          margin-top: 10px;
          padding: 0 16px;
          font-size: 14px;
          line-height: 21px;
          color: #ffffff99;
          text-align: justify;
        }
        .common-submit {
          margin: 26px 0 16px;
          display: flex;
          justify-content: center;
          button {
            width: 150px;
            height: 40px;
            font-size: 14px;
            color: #ffffff;
            background: #1f73ff;
            border: 0.5px solid #1f73ff;
            border-radius: 4px;
          }
        }
      }
    }
  }
}
</style>
