<template>
  <div class="deviceSwitch">
    <van-calendar
      v-model:show="show"
      :min-date="minDate"
      :max-date="maxDate"
      color="#ee7522"
      type="range"
      allow-same-day
      :show-mark="false"
      @confirm="handleConfirm"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, reactive } from 'vue';
import type { Ref } from 'vue';
import { formatDate } from '@/utils/utils';
import { DateItem } from './index';

interface Props {
  showCalendar: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  showCalendar: false,
});
// 父子传方法
const emit = defineEmits(['update:showCalendar','calendarConfirm']);
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
    Bdate: formatDate(start),
    Edate: formatDate(end),
  };
  emit('calendarConfirm',rangeCalendar)
};
// 自定义日期范围
const customDate = () => {
  const nowDate = new Date();
  const dateY = nowDate.getFullYear();
  const dateM = nowDate.getMonth();
  const dateD = nowDate.getDate();
  minDate.value = new Date(dateY - 1, dateM, dateD);
  maxDate.value = new Date(dateY, dateM, dateD);
};
onMounted(async () => {
  customDate();
});
</script>

<style scoped lang="less"></style>
