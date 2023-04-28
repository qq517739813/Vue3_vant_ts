<template>
    <div class="timerCtrolCard" v-for="item in props.ParamCtrolList" :key="item.Id">
        <div class="timeCtroltitle">
            <div class="titletime">{{ item.ParamName }}</div>
            <div class="titleBtn">
                <van-button @click="delTimeCtrol(item.Id)" size="mini" type="default" color="#ccc">删除</van-button>
                <van-button size="mini" type="success" @click="showEdit(item)">编辑</van-button>
            </div>
        </div>
        <div class="timeCtrovalue">
            <div class="valueTop">
                <van-row>
                    <van-col span="8">
                        控制条件：{{ item.Type === 1 ? "大于" : "小于" }}
                    </van-col>
                    <van-col span="8">
                        控制值：{{ item.Value }}
                    </van-col>
                    <van-col span="8">
                        控制动作：{{ item.Opaction === 1 ? "开" : "关" }}
                    </van-col>
                </van-row>
            </div>
            <div class="valueTime">启用状态：{{ item.Enabled ? '启用' : '禁用' }}</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { CommonItem } from "../../index";
import { onMounted } from "vue";
import { DelParamCtrl } from "@/api/autoControl"
import { showLoadingToast, closeToast, showToast } from 'vant';
import { userStore } from '@/store/user';

interface Props {
    ParamCtrolList: CommonItem[];
}
const props = withDefaults(defineProps<Props>(), {
    ParamCtrolList: () => [],
})
const emit = defineEmits(['getCtrlinfo', 'onClickRight']);
const store = userStore();
const delTimeCtrol = (Id: any) => {
    showLoadingToast({
        message: 'loading...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0,
    });
    const timeCtrlinfo = {
        ObjId: Id,
        Token: store.userInfo.Token
    }

    DelParamCtrl(timeCtrlinfo).then(() => {
        emit('getCtrlinfo')
        closeToast();
        showToast("删除成功")
    })
}
const showEdit = (Id: any) => {
    emit('onClickRight', Id)
}

onMounted(() => {

})
</script>

<style lang="less" scoped>
.timerCtrolCard {
    margin: 10px;
    color: #ccc;
    border: 0.5px solid rgba(255, 255, 255, 0.3);
    border-radius: 5px;
    background: #22252C;

    .timeCtroltitle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 0.5px solid rgba(255, 255, 255, 0.3);
        height: 30px;
        padding: 0 5px;

        .titleBtn {
            display: flex;

            .van-button--default {
                background: #1F2228 !important;
                border: 0.5px solid rgba(255, 255, 255, 0.3) !important;
            }
        }
    }

    .timeCtrovalue {
        padding: 10px 5px;
        font-size: 13px;

        .valueTop {
            padding: 10px 0;
        }
    }
}
</style>