<template>
    <!-- 弹出框 -->
    <van-dialog :show="props.dialogshow" :closeOnClickOverlay="true" :showConfirmButton="false">
        <div class="dialogTitle">
            <p class="dialogTitleName">添加参数控制配置</p>
            <van-icon color="#fff" size="30px" name="cross" @click="handleCloseDialog" />
        </div>
        <!-- 整个弹出框表单 -->
        <div class="dialogContent">
            <van-cell title="控制动作:">
                <template #value>
                    <van-radio-group v-model="Opaction" direction="horizontal">
                        <van-radio :name=1>正转
                            <template #icon>
                                <van-icon name="circle" />
                            </template></van-radio>
                        <van-radio :name=2>反转
                            <template #icon>
                                <van-icon name="circle" />
                            </template></van-radio>
                        <van-radio :name=0>停止
                            <template #icon>
                                <van-icon name="circle" />
                            </template></van-radio>
                    </van-radio-group>
                </template>
            </van-cell>

            <van-cell title="采集设备:">
                <template #value>
                    <van-dropdown-menu>
                        <van-dropdown-item v-model="RealData" :options="devOptions" @change="onChange" />
                    </van-dropdown-menu>
                </template>
            </van-cell>
            <van-cell title="传感器:">
                <template #value>
                    <van-dropdown-menu>
                        <van-dropdown-item v-model="paramValue" :options="paramList" />
                    </van-dropdown-menu>
                </template>
            </van-cell>
            <van-cell title="控制条件:">
                <template #value>
                    <van-radio-group v-model="Type" direction="horizontal">
                        <van-radio :name=1>大于
                            <template #icon>
                                <van-icon name="circle" />
                            </template></van-radio>
                        <van-radio :name=-1>小于
                            <template #icon>
                                <van-icon name="circle" />
                            </template></van-radio>
                    </van-radio-group>
                </template>
            </van-cell>
            <van-cell title="控制值:">
                <template #value>
                    <div class="disp">
                        <van-field autocomplete="off" v-model="Value" :formatter="formatter" placeholder="" />
                    </div>
                </template>
            </van-cell>
            <van-cell title="启用状态:">
                <template #value>
                    <div class="disp"> <van-switch v-model="Enabled" /></div>
                </template>
            </van-cell>
            <!-- <van-button @click="saveSetTimerCtrl" type="success">保存</van-button> -->
            <div class="btns">
                <van-button size="normal" @click="saveSetTimerCtrl" type="success">保存</van-button>
                <div style="padding: 0 10px;"></div>
                <van-button size="normal" type="default">重置</van-button>
            </div>
        </div>
    </van-dialog>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import type { Ref } from 'vue'
import { userStore } from '@/store/user';
import { useRoute } from 'vue-router';
import { DropdownItemOption } from 'vant/lib/dropdown-item/types';
import { GetRealDataList } from '@/api/monitorData'
import { SetParamCtrl } from '@/api/autoControl'
import { showToast } from 'vant';

// 定义数据和引用  
const router = useRoute()
const store = userStore();
// 定时控制操作动作
const Opaction = ref(1);
// 控制条件
const Type: Ref<number> = ref(1);
// 启用状态
const Enabled: Ref<boolean> = ref(false);
// 控制值
const Value: Ref<string> = ref('');
// 采集设备
const RealData = ref(store.devList[0].DevId);
// 传感器列表
const paramList = ref([]);
// 传感器值
const paramValue: Ref<string> = ref('');
interface Props {
    dialogshow: boolean;
    ctrolItem: any
}
const props = withDefaults(defineProps<Props>(), {
    dialogshow: false,
    ctrolItem: {},
    CtrlID: ''
})

const emits = defineEmits(['handleCloseDialog', 'handleSaveDialog'])

// 过滤只能输入数字
const formatter = (value: any) => value.replace(/\D/g, '');
// 定义采气设备下拉

// 定义采气设备下拉
const devOptions = computed((): DropdownItemOption[] => {
    return store.devList.map((item: any) => {
        return { text: item.DevName, value: item.DevId };
    });
});

// 事件内容
// 关闭dialog
const handleCloseDialog = () => {
    emits('handleCloseDialog')

}
// 下拉改变
const onChange = async (value: any) => {
    await GetRealDataList({
        ObjId: value,
        Token: store.userInfo.Token
    }).then((res: any) => {
        paramList.value = res.Data.map((item: any) => {
            return { text: item.ParamName, value: item.ParamId };
        });

    })

}

const saveSetTimerCtrl = async () => {
    const SetTimerCtrlInfo = {
        CtrId: router.query.CtrlId as string,
        Enabled: Enabled.value,
        Opaction: Opaction.value,
        ParamId: paramValue.value,
        Type: Type.value,
        Value: parseInt(Value.value, 10),
        Id: props.ctrolItem.Id
    }
    await SetParamCtrl(SetTimerCtrlInfo).then(() => {
        showToast('配置成功')
        emits('handleSaveDialog')

    }).catch(() => {
        showToast('配置失败')
    });
}


watch(() => props.ctrolItem, async (newValue?: any) => {

    if (newValue.Id) {
        onChange(RealData.value)
        Opaction.value = newValue.Opaction;
        RealData.value = newValue.DevId;
        paramValue.value = newValue.ParamId;
        Type.value = newValue.Type;
        Value.value = newValue.Value;
        Enabled.value = newValue.Enabled;
    }
    else {
        Opaction.value = 1;
        Type.value  = 1;
        Enabled.value = true;
    }
});
onMounted(() => {
    onChange(store.devList[0].DevId)

})

</script>

<style lang="less" scoped>
:deep(.van-dialog) {
    background: #1f2228;

    .dialogTitle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        border-bottom: 0.5px solid rgba(255, 255, 255, 0.3);
        margin-bottom: 10px;

        .dialogTitleName {
            color: #ccc;
        }
    }

    .dialogContent {
        padding: 20px 0;
        display: flex;
        flex-direction: column;

        .van-button--normal {
            margin: 0px auto;
            width: 120px;
        }

        .van-cell {
            background: #1f2228;
            color: #ccc;

            .van-cell__value {
                min-width: 75%;
            }
        }
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