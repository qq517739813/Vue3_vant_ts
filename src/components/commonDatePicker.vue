<template>
  <div class="commonDatePicker">
    <van-popup
      v-model:show="show"
      :style="{ height: '50%' }"
      position="bottom"
      @close="handleCancel"
    >
      <van-date-picker
        v-model="currentDate.confirmDate"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        :columns-type="['year', 'month']"
        :show-mark="false"
        @confirm="handleConfirm"
        @cancel="handleCancel"
      >
        <template #cancel>
          <span class="cancel">取消</span>
        </template>
        <template #confirm>
          <span class="confirm">确定</span>
        </template>
      </van-date-picker>
    </van-popup>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, reactive } from 'vue';
import type { Ref } from 'vue';
import { DateItem } from './index';
import moment from 'moment';

interface currentDateItem {
  confirmDate: string[];
}
interface Props {
  showCalendar: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  showCalendar: false,
});
// 父子传方法
const emit = defineEmits<{
  (e: 'update:showCalendar', value: boolean): void;
  (e: 'calendarConfirm', Item: DateItem): void;
}>();

// 当前选中的日期
const currentDate = reactive<currentDateItem>({
  confirmDate: [],
});
// 最小日期
const minDate: Ref<Date> = ref(new Date());
// 最大日期
const maxDate: Ref<Date> = ref(new Date());
// 日期范围
const rangeCalendar = reactive<DateItem>({
  calendar: { Bdate: '', Edate: '' },
});
// popup弹窗显示状态
const show = computed({
  get() {
    return props.showCalendar;
  },
  set(value) {
    emit('update:showCalendar', value);
  },
});
// 日期确定事件
const handleConfirm = (values: any) => {
  const { selectedValues } = values;
  const nowDates = new Date(selectedValues.join('-'));
  const startStr = moment(nowDates).startOf('month').format('YYYY-MM-DD');
  const endStr = moment(nowDates).endOf('month').format('YYYY-MM-DD');
  rangeCalendar.calendar = {
    Bdate: startStr,
    Edate: endStr,
  };
  emit('calendarConfirm', rangeCalendar);
  customDate();
};
// 日期取消事件
const handleCancel = () => {
  emit('update:showCalendar', false);
  customDate();
};
// 自定义日期范围
const customDate = () => {
  const dateY:string = moment().format('YYYY');
  const dateM: string = moment().format('MM');
  currentDate.confirmDate = [dateY, dateM];
  minDate.value = new Date(Number(dateY)-10, 0);
  maxDate.value = new Date(Number(dateY), Number(dateM));
};
// 格式化选项
const formatter = (type: string, option: any) => {
  const options = option;
  if (type === 'year') {
    options.text += '年';
  }
  if (type === 'month') {
    options.text += '月';
  }
  return options;
};
onMounted(async () => {
  customDate();
});
</script>

<style scoped lang="less">
.commonDatePicker {
  .cancel,
  .confirm {
    font-size: 18px;
    color: #00cc90;
  }
}
</style>
