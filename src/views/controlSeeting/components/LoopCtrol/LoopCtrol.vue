<template>
    <div class="loopCtrlCard">
        <van-cell title="控制动作:">
            <template #value>
                <van-radio-group v-model="Opaction" direction="horizontal">
                    <van-radio name="1" checked-color="#ee0a24">正转
                        <template #icon>
                            <van-icon name="circle" />
                        </template>
                    </van-radio>
                    <van-radio name="2">反转
                        <template #icon>
                            <van-icon name="circle" />
                        </template></van-radio>
                    <van-radio name="0">停止
                        <template #icon>
                            <van-icon name="circle" />
                        </template>
                    </van-radio>
                </van-radio-group>
            </template>
        </van-cell>
        <van-cell title="启用状态:">
            <template #value>
                <div class="disp"> <van-switch v-model="Enabled" /></div>
            </template>
        </van-cell>
        <van-cell title="执行频率:">
            <template #value>
                <div class="disp">
                    <van-field autocomplete="off" v-model="Frequency" :formatter="formatter" />
                </div>
            </template>
        </van-cell>
        <van-cell title="执行时长:">
            <template #value>
                <div class="disp">
                    <van-field autocomplete="off" v-model="Duration" :formatter="formatter" />
                </div>
            </template>
        </van-cell>
        <van-cell title="起止日期:">
            <template #value>
                <div class="disp">
                    <van-button plain hairline type="primary" @click="DataBtnType(0)">{{ Bdate.join("-")
                    }}</van-button>
                    <span style="margin: 0 2px">__</span>
                    <van-button plain hairline type="primary" @click="DataBtnType(1)">{{ Edate.join("-")
                    }}</van-button>
                </div>
            </template>
        </van-cell>
        <van-cell title="起止时间:">
            <template #value>
                <div class="disp">
                    <van-button plain hairline type="primary" @click="OptimePopup = !OptimePopup">{{
                        Optimestr
                    }}</van-button>
                    <span style="margin: 0 10px">__</span>
                    <van-button plain hairline type="primary" @click="OptimePopup2 = !OptimePopup2">{{
                        OptimestrT
                    }}</van-button>
                </div>
            </template>
        </van-cell>
        <div class="btns">
            <van-button size="normal" @click="saveSetLoopCtrl" type="success">保存</van-button>
            <div style="padding: 0 10px;"></div>
            <van-button size="normal" type="default">重置</van-button>

        </div>
        <!-- 日期弹层曾弹出层 -->
        <teleport to="body">
            <CtrlPopup :popUpShow="popUpShow" @handle-PopupShow="handlepopUpShow" :Bdate="date" />
        </teleport>
        <teleport to="body">
            <VanPopup v-model:show="OptimePopup" :style="{ height: '30%' }" position="bottom">
                <VanTimePicker @cancel="OptimePopup = !OptimePopup" @confirm="onConfirm" :columns-type="columnsType"
                    v-model="Optime" :formatter="packerformatter" />
            </VanPopup>
        </teleport>
        <teleport to="body">
            <VanPopup v-model:show="OptimePopup2" :style="{ height: '30%' }" position="bottom">
                <VanTimePicker @cancel="OptimePopup2 = !OptimePopup2" @confirm="onConfirm" :columns-type="columnsType"
                    v-model="Optime2" :formatter="packerformatter" />
            </VanPopup>
        </teleport>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import type { Ref } from 'vue';
import CtrlPopup from '../TimeCtrl/CtrlPopup.vue'
import { showToast, TimePickerColumnType } from 'vant';
import { SetLoopCtrl } from "@/api/autoControl"
import moment from 'moment';
// 定义数据和引用   
// 定时控制操作动作
const Opaction = ref('1');
// 是否启用
const Enabled: Ref<boolean> = ref(true)
// 执行频率
const Frequency = ref('')
// 执行时长
const Duration = ref('')
// 时间数据
const date = ref([''])
// 开始日期
const Bdate = ref(['开始日期'])
// 结束日期
const Edate = ref(['结束日期'])
// 按钮哪一个
const DataBtnFlag = ref(0)
// 时间弹出层
const popUpShow: Ref<boolean> = ref(false)
// 时间选择器弹出层展示
const OptimePopup: Ref<boolean> = ref(false)
const OptimePopup2: Ref<boolean> = ref(false)
const Optimestr: Ref<String> = ref('请选择');
const OptimestrT: Ref<String> = ref('请选择');
// 执行时间
const Optime: Ref<any[]> = ref([]);
const Optime2: Ref<any[]> = ref([]);
// 执行时间的值

const props = defineProps(['CtrlID', 'GetLoopCtrlres'])
// 数据处理
// 过滤只能输入数字
const formatter = (value: any) => value.replace(/\D/g, '');
// 过滤时间
// 时间选择器列类型
const columnsType: TimePickerColumnType[] = ['hour', 'minute', 'second'];
// timeformatter
const packerformatter = (type: any, option: any) => {
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
// 事件内容
// 判断按钮点的哪个
const DataBtnType = (type: number) => {
    type === 0 ? DataBtnFlag.value = 0 : DataBtnFlag.value = 1
    type === 0 ? date.value = Bdate.value : date.value = Edate.value
    popUpShow.value = true;
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
const onConfirm = () => {
    OptimePopup.value = false
    Optimestr.value = Optime.value.join(":")
    OptimePopup2.value = false
    OptimestrT.value = Optime2.value.join(":")

}
const saveSetLoopCtrl = async () => {
    const SetLoopCtrlInfo = {
        Bdate: Bdate.value.join("-"),
        Edate: Edate.value.join("-"),
        CtrId: props.CtrlID,
        Enabled: Enabled.value,
        Duration: parseInt(Duration.value, 10),
        Action: parseInt(Opaction.value, 10),
        Frequency: parseInt(Frequency.value, 10),
        Btime: Optime.value.join(":"),
        Etime: Optime2.value.join(":")
    }
    await SetLoopCtrl(SetLoopCtrlInfo).then(() => {
        showToast('配置成功')

    }).catch(() => {
        showToast('配置失败')
    });

}
const init = () => {
    if (props.GetLoopCtrlres.CtrId) {       
        Bdate.value = moment(props.GetLoopCtrlres.Bdate).format('YYYY-MM-DD').split('-')
        Edate.value = moment(props.GetLoopCtrlres.Edate).format('YYYY-MM-DD').split('-')
        Enabled.value = props.GetLoopCtrlres.Enabled;
        Duration.value = props.GetLoopCtrlres.Duration;
        Opaction.value = props.GetLoopCtrlres.Action.toString();
        Frequency.value = props.GetLoopCtrlres.Frequency;
        Optime.value = props.GetLoopCtrlres.Btime.split(":");
        Optimestr.value = props.GetLoopCtrlres.Btime
        Optime2.value = props.GetLoopCtrlres.Etime.split(":");
        OptimestrT.value = props.GetLoopCtrlres.Etime
    }
}
watch(() => props.GetLoopCtrlres, (newValue: any) => {
    if (newValue.CtrId) {
        Bdate.value = moment(props.GetLoopCtrlres.Bdate).format('YYYY-MM-DD').split('-')
        Edate.value = moment(props.GetLoopCtrlres.Edate).format('YYYY-MM-DD').split('-')
        Enabled.value = newValue.Enabled;
        Duration.value = newValue.Duration;
        Opaction.value = newValue.Action.toString();
        Frequency.value = newValue.Frequency;
        Optime.value = newValue.Btime.split(":");
        Optimestr.value = newValue.Btime
        Optime2.value = newValue.Etime.split(":");
        OptimestrT.value = newValue.Etime
    }
})
onMounted(() => {
    init()
})
</script>

<style lang="less" scoped>
.loopCtrlCard {
    box-sizing: border-box;
    margin: 10px;
    color: #ccc;
    border: 0.5px solid rgba(255, 255, 255, 0.3);
    border-radius: 5px;
    background: #22252C;

    :deep(.van-cell__value) {
        min-width: 75%;
    }

    :deep(.van-cell) {
        background: #22252C;
        color: #ccc;
    }

}

.disp {
    display: flex;
}

.btns {
    display: flex;
    justify-content: center;
    margin: 20px 0;

    .van-button--normal {
        padding: 0 30px;


    }
}
</style>

