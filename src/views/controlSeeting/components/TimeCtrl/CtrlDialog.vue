<template>
    <!-- 弹出框 -->
    <van-dialog :show="props.dialogshow" :closeOnClickOverlay="true" :showConfirmButton="false">
        <div class="dialogTitle">
            <p class="dialogTitleName">添加定时控制配置</p>
            <van-icon color="#fff" size="30px" name="cross" @click="handleCloseDialog" />
        </div>
        <!-- 整个弹出框表单 -->
        <div class="dialogContent">
            <van-cell name="a" title="操作动作:">
                <template #value>
                    <van-radio-group v-model="actionChecked" direction="horizontal">
                        <van-radio :name=1 checked-color="#ee0a24">正转
                            <template #icon>
                                <van-icon name="circle" />
                            </template>
                        </van-radio>
                        <van-radio :name=2>反转
                            <template #icon>
                                <van-icon name="circle" />
                            </template></van-radio>
                        <van-radio :name=3>停止
                            <template #icon>
                                <van-icon name="circle" />
                            </template></van-radio>
                    </van-radio-group>
                </template>
            </van-cell>
            <van-cell title="起止日期:">
                <template #value>
                    <div class="disp">
                        <van-button hairline size="small" @click="DataBtnType(0)">{{ Bdate.join("-")
                        }}</van-button>
                        <span style="margin: 0 10px">一</span>
                        <van-button hairline size="small" @click="DataBtnType(1)">{{ Edate.join("-")
                        }}</van-button>
                    </div>
                </template>
            </van-cell>
            <van-cell title="执行时间:">
                <template #value>
                    <div class="disp">
                        <van-button hairline size="small" @click="OptimePopup = !OptimePopup">{{
                            Optimestr
                        }}</van-button>
                    </div>
                </template>
            </van-cell>
            <van-cell title="是否定期:">
                <template #value>
                    <van-radio-group v-model="IsDate" direction="horizontal">
                        <van-radio :name=true>永久
                            <template #icon>
                                <van-icon name="circle" />
                            </template></van-radio>
                        <van-radio :name=false>定期
                            <template #icon>
                                <van-icon name="circle" />
                            </template></van-radio>
                    </van-radio-group>
                </template>
            </van-cell>
            <van-cell title="启用状态:">
                <template #value>
                    <div class="disp">
                        <van-switch v-model="Enabled" />
                    </div>
                </template>
            </van-cell>
            <div class="btns">
                <van-button size="normal" @click="saveSetTimerCtrl" type="success">保存</van-button>
                <div style="padding: 0 10px;"></div>
                <van-button size="normal" @click="reset" type="default">重置</van-button>
            </div>
        </div>
        <!-- </van-form> -->
    </van-dialog>
    <!-- 日期弹层曾弹出层 -->
    <CtrlPopup :popUpShow="popUpShow" @handle-PopupShow="handlepopUpShow" :Bdate="date" />
    <VanPopup v-model:show="OptimePopup" :style="{ height: '30%' }" position="bottom">
        <VanTimePicker @cancel="OptimePopup = !OptimePopup" @confirm="onConfirm" :columns-type="columnsType"
            v-model="Optime" :formatter="formatter" />
    </VanPopup>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import type { Ref, ComputedRef } from 'vue';
import { useRoute } from 'vue-router';
import { showToast } from 'vant';
import type { TimePickerColumnType } from 'vant';
import { SetTimerCtrl } from "@/api/autoControl";
import CtrlPopup from './CtrlPopup.vue'

// 定义数据和引用  
const router = useRoute()
// 定时控制操作动作
const actionChecked = ref(1);
const date = ref([''])
// 开始时间
const Bdate = ref(['开始日期'])
// 结束时间
const Edate = ref(['结束日期'])
// 时间弹出层
const popUpShow: Ref<boolean> = ref(false)
// 按钮哪一个
const DataBtnFlag = ref(0)
// 执行时间
const Optime: Ref<any[]> = ref([]);
const Optimestr: Ref<String> = ref('请选择');
// 时间选择器弹出层展示
const OptimePopup: Ref<boolean> = ref(false)
// 执行时间的值
const IsDate: Ref<boolean> = ref(true)
const Enabled: Ref<boolean> = ref(true)
// 时间选择器列类型
const columnsType: TimePickerColumnType[] = ['hour', 'minute', 'second'];

interface Props {
    dialogshow: boolean;
    ctrolItem: any
}
const props = withDefaults(defineProps<Props>(), {
    dialogshow: false,
    ctrolItem: {}
})

const emits = defineEmits(['handleCloseDialog', 'handleSaveDialog'])

// 事件内容
// 关闭dialog
const handleCloseDialog = () => {
    emits('handleCloseDialog')

}

// close poUp
const handlepopUpShow = (value: any) => {
    if (value === '0') {
        popUpShow.value = false;
    } else if (DataBtnFlag.value === 0) {
        Bdate.value = value.value;
        popUpShow.value = false;
    } else {
        Edate.value = value.value;
        popUpShow.value = false;
    }
}
// 判断按钮点的哪个
const DataBtnType = (type: number) => {
    type === 0 ? DataBtnFlag.value = 0 : DataBtnFlag.value = 1
    type === 0 ? date.value = Bdate.value : date.value = Edate.value
    popUpShow.value = true;
}
const onConfirm = () => {
    OptimePopup.value = false
    Optimestr.value = Optime.value.join(":")

}
// timeformatter
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
const saveSetTimerCtrl = async () => {
    const SetTimerCtrlInfo = {
        Bdate: Bdate.value.join("-"),
        Edate: Edate.value.join("-"),
        CtrId: CtrlID.value,
        Enabled: Enabled.value,
        IsDate: IsDate.value,
        Opaction: actionChecked.value,
        Optime: Optime.value.join(':'),
        Id: props.ctrolItem?.Id,
    }
    await SetTimerCtrl(SetTimerCtrlInfo).then(() => {
        showToast('配置成功')
        emits('handleSaveDialog')

    }).catch(() => {
        showToast('配置失败')
    });
}

const CtrlID: ComputedRef = computed(() => {
    return router.query.CtrlId;
})

const reset = () => {
    actionChecked.value = 1;
    Edate.value = ['结束日期'];
    Bdate.value = ['开始日期'];
    Optime.value = ['00', '00', '00'];
    Optimestr.value = '请选择';
    IsDate.value = true;
    Enabled.value = true;
}

watch(() => props.ctrolItem, (newValue?: any) => {
    if (newValue.Id) {
        actionChecked.value = newValue.Opaction;
        IsDate.value = newValue.IsDate;
        Enabled.value = newValue.Enabled;
        Optime.value = newValue.Optime.split(":");
        Optimestr.value = newValue.Optime;
        Bdate.value = newValue.Bdate.split(' ')[0].split('-')
        Edate.value = newValue.Edate.split(' ')[0].split('-')
    } else {
        reset()
    }
});

</script>

<style lang="less" scoped>
.dialogContent {
    .btns {
        .van-button--normal {
            padding: 0 30px;
        }
    }
}

.disp {
    display: flex;
}
</style>