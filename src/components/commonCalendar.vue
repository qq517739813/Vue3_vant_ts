<template>
  <div class="commonCalendar">
    <van-calendar
      ref="calendarRef"
      :max-range="7"
      v-model:show="show"
      :min-date="minDate"
      :max-date="maxDate"
      color="#ee7522"
      type="range"
      allow-same-day
      :show-mark="false"
      @confirm="handleConfirm"
      @close="handleClose"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, reactive } from 'vue';
import type { Ref } from 'vue';
import type { CalendarInstance } from 'vant';
import moment from 'moment';
import { DateItem } from './index';

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
// 日历选择实列
const calendarRef = ref<CalendarInstance>();
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
  const [start, end] = values;
  rangeCalendar.calendar = {
    Bdate: moment(start).format('YYYY-MM-DD'),
    Edate: moment(end).format('YYYY-MM-DD'),
  };
  calendarRef.value?.reset();
  emit('calendarConfirm', rangeCalendar);
};
// 日期取消事件
const handleClose = () => {
  calendarRef.value?.reset();
}
// 自定义日期范围
const customDate = () => {
  const dateY:string = moment().format('YYYY');
  const dateM: string = moment().format('MM');
  const dateD: string = moment().format('MM');
  minDate.value = new Date(Number(dateY)-1,0, 1);
  maxDate.value = new Date(Number(dateY), Number(dateM), Number(dateD));
};
onMounted(async () => {
  customDate();
});
</script>

<style scoped lang="less"></style>
