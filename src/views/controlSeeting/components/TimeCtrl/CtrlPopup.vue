<template >
    <!-- 时间弹出层 -->
    <van-popup v-model:show="popUpShow" position="bottom" :style="{ height: '30%' }" @close="clickcloseicon">
        <van-date-picker v-model="date"  :min-date="minDate" :max-date="maxDate" :formatter="formatter"
            @confirm="handlepopUpShow" @cancel="popUpShow = !popUpShow" />
    </van-popup>
</template>

<script lang="ts" setup>
import { Ref, ref, watch } from 'vue';

interface Props {
    popUpShow: boolean;
    Bdate: any;
}
// 父传子数据
const props = withDefaults(defineProps<Props>(), {
    popUpShow: false,
    Bdate: [],

})
// 父传子方法
const emit = defineEmits(['handlePopupShow'])

// 时间弹出层
const popUpShow: Ref<boolean> = ref(props.popUpShow);

const minDate = new Date(2013, 1, 1);
const maxDate = new Date(2033, 12, 30);
// 时间
const date = ref(props.Bdate)
// Dataformatter
const formatter = (type: string, option: any) => {
    const newOptions = Object.assign({}, option)
    if (type === 'year') {
        newOptions.text += '年';
    }
    if (type === 'month') {
        newOptions.text += '月';
    }
    if (type === 'day') {
        newOptions.text += '日'
    }
    return newOptions;
};
// close poUp
const handlepopUpShow = () => {
    popUpShow.value = false;
    emit('handlePopupShow',date )
    // props.popUpShow = false
}
const clickcloseicon = () => {
    popUpShow.value = false;
    emit('handlePopupShow', '0')

}
watch(() => props.popUpShow, (value) => {
    popUpShow.value = value;
});
</script>

<style lang="less" scoped></style>