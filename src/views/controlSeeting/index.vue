<template >
    <div class="ctrlidClass">
        <!-- 头部nav -->
        <van-nav-bar title="智能控制" class="title" fixed :border="false" placeholder safe-area-inset-top
            @click-left="onClickLeft" @click-right="onClickRight">
            <template #left>
                <van-icon name="arrow-left" size="20" color="#FFFFFF" style="margin-left: 11px" />
            </template>
            <template #right v-if="active != 2">
                <span class="head-change">新增</span>
            </template>
        </van-nav-bar>
        <van-tabs v-model:active="active" swipeable>
            <van-tab title="定时控制">
                <pull-refresh @pull-method="getCtrlinfo" equipmentId="''">
                    <TimerCtrol v-if="TimerCtrolListres.Ctrolitem.Data?.length != 0"
                        :TimerCtrolListres="TimerCtrolListres.Ctrolitem.Data" @get-Ctrlinfo="getCtrlinfo"
                        @on-ClickRight="onClickRight" />
                    <div v-else class="Nodata">
                        <img src="@/assets/Nodata.svg" />
                        <span>暂无数据</span>
                    </div>
                </pull-refresh>
            </van-tab>
            <van-tab title="参数控制">
                <pull-refresh @pull-method="getCtrlinfo" equipmentId="''">
                    <ParamCtrol v-if="ParamCtrolListres.Ctrolitem.Data?.length != 0"
                        :ParamCtrolList="ParamCtrolListres.Ctrolitem.Data" @get-Ctrlinfo="getCtrlinfo"
                        @on-ClickRight="onClickRight" />
                    <div v-else class="Nodata">
                        <img src="@/assets/Nodata.svg" />
                        <span>暂无数据</span>
                    </div>
                </pull-refresh>
            </van-tab>
            <van-tab title="循环控制">
                <pull-refresh @pull-method="getCtrlinfo" equipmentId="''">
                    <LoopCtrol :CtrlID="CtrlID" :GetLoopCtrlres="GetLoopCtrlres.Ctrolitem.Data" />
                </pull-refresh>
            </van-tab>
        </van-tabs>
        <CtrlDialog v-if="active === 0" :dialogshow=dialogshow @handle-CloseDialog=handleCloseDialog
            :ctrolItem="paramvalue.Ctrolitem.Data" @handle-SaveDialog=handleSaveDialog />
        <paramDialog v-else :dialogshow=dialogshow @handle-CloseDialog=handleCloseDialog
            @handle-SaveDialog="handleSaveDialog" :ctrolItem="paramvalue.Ctrolitem.Data" :CtrlID="CtrlID" />
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, reactive } from 'vue';
import type { ComputedRef } from 'vue';
import { useRoute } from 'vue-router';
import { userStore } from '@/store/user';
import { showLoadingToast, closeToast } from 'vant';
import { GetTimerCtrolList, GetParamCtrolList, GetLoopCtrl } from "@/api/autoControl";
import { getdevList } from '@/utils/base';
import { Ctrolitems } from "./index";
import pullRefresh from '@/components/pullRefresh.vue';
import CtrlDialog from './components/TimeCtrl/CtrlDialog.vue'
import TimerCtrol from './components/TimeCtrl/TimerCtrol.vue'
import ParamCtrol from "./components/ParamCtrol/ParamCtrol.vue";
import paramDialog from './components/ParamCtrol/paramDialog.vue';
import LoopCtrol from './components/LoopCtrol/LoopCtrol.vue';
// 定义数据和引用  
const router = useRoute()
const store = userStore();
const active = ref(0);
const dialogshow = ref(false);
const ctrlvalue = reactive<Ctrolitems>({ Ctrolitem: {} })
const paramvalue = reactive<Ctrolitems>({ Ctrolitem: {} })
// 获取定时控制
const TimerCtrolListres = reactive<Ctrolitems>({ Ctrolitem: {} });
// 获取参数控制
const ParamCtrolListres = reactive<Ctrolitems>({ Ctrolitem: {} });
// 获取循环控制
const GetLoopCtrlres = reactive<Ctrolitems>({ Ctrolitem: {} });
// 获取定时控制参数控制循环控制数据
const getCtrlinfo = async () => {
    showLoadingToast({
        message: 'loading...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0,
    });
    const Ctrlinfo = {
        CtrlID: CtrlID.value,
        Token: store.userInfo.Token
    }
    // 获取定时控制
    let res: any = await GetTimerCtrolList(Ctrlinfo);

    TimerCtrolListres.Ctrolitem = res
    // 获取参数控制
    res = await GetParamCtrolList(Ctrlinfo);
    ParamCtrolListres.Ctrolitem = res
    // 获取循环控制
    res = await GetLoopCtrl(Ctrlinfo);
    GetLoopCtrlres.Ctrolitem = res

    // 获取参数控制采集设备列表
    await getdevList('MonitorData')
    // 获取
    closeToast();
}

// 事件内容
// 导航栏左侧事件
const onClickLeft = () => history.back();
// 导航栏右侧事件
const onClickRight = (value: any) => {
    dialogshow.value = true;
    ctrlvalue.Ctrolitem.Data = value;
    paramvalue.Ctrolitem.Data = value;
};
// 关闭dialog
const handleCloseDialog = () => {
    dialogshow.value = false;

}
// 保存对话框
const handleSaveDialog = () => {
    getCtrlinfo()
    handleCloseDialog()
}
const CtrlID: ComputedRef = computed(() => {
    return router.query.CtrlId as string;
})
onMounted(async () => {
    await getCtrlinfo()
})

</script>

<style scoped lang="less">
.ctrlidClass {
    padding: 0;
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
                color: #00cc90;
            }
        }

    }
    // tabs 
    .van-tabs {
        :deep(.van-tabs__nav) {
            background: #22252C;

        }
        :deep(.van-tabs__line) {
            background: #00cc90;
        }

        :deep(.van-tab--active) {
            color: #00cc90;
        }
    }
    :deep(.van-tabs__wrap) {
        position: fixed;
        top: 45px;
        left: 0;
        right: 0;
        z-index: 999;
    }

    :deep(.van-pull-refresh__track) {
        margin-top: 60px;
    }

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
            .van-cell {
                background: #1f2228;
                color: #ccc;

                .van-cell__value {
                    min-width: 75%;
                }
            }
            .btns {
                padding: 10px 0;
                display: flex;
                // align-items: center;
                justify-content: center;


            }
        }


    }
    .Nodata {
        // background-color: #fff;
        // box-sizing: border-box;
        color: #ccc;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 65%;
        justify-content: center;

        span {
            margin-top: 20px;
        }
    }
}

:deep(.van-radio__label) {
    color: #ccc;
}

:deep(.van-button--hairline) {
    background: #1f2228;
    color: #ccc;
    border: 0.5px solid rgba(255, 255, 255, 0.3);
    ;
}

:deep(.van-radio__icon--checked .van-icon) {
    color: #ccc;
    background-color: #07C160;
    border-color: #07C160;

}

:deep(.van-switch--on) {
    background: #07C160
}

:deep(.van-field) {
    border: 0.5px solid rgba(255, 255, 255, 0.3);
    margin-right: 60%;
}
:deep(.van-field__control){
    color: #fff;
}
</style>
