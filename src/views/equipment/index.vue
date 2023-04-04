<template>
    <div class="equipment" v-if="!loading">
        <van-pull-refresh v-model="refreshLoading" @refresh="onRefresh" class="equipment-pull-refresh">
            <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
            <template #pulling="props">
                <div class="pulling" :style="{ height: props.distance }">
                    <van-icon name="arrow-down" />
                    <span>下拉即可刷新...</span>
                </div>
            </template>
            <!-- 释放提示 -->
            <template #loosing>
                <div class="loosing">
                    <van-icon name="arrow-up" />
                    <span>释放即可刷新...</span>
                </div>
            </template>
            <div class="equipment-content">
                <div class="equipment-item" v-for="item  in equipInfo.UserEquips" :key="item.ModuleId">
                    <img :src="getEquipImg(item)" alt="">
                    <span>{{ item.ModuleName }}</span>
                </div>
            </div>
        </van-pull-refresh>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue';
import { userStore } from '@/store/user';
import { GetUserEquips } from '@/api/equipment'
import { getEquipImg } from '@/utils/base';
import { UserEquipsItem } from './index'

const store = userStore();
const loading = ref<boolean>(false)
const refreshLoading = ref<boolean>(false)

const equipInfo = reactive<UserEquipsItem>({
    UserEquips: []
})
// 获取用户设备模块
const initData = () => {
    loading.value = true
    const payload = {
        Uid: store.userInfo.Uid,
        Token: store.userInfo.Token,
    }
    GetUserEquips(payload).then(res => {
        if ((res as any).IsSuccess) {
            const { Data } = (res as any);
            equipInfo.UserEquips = Data
            loading.value = false;
        }
    })
}
// 下拉刷新
const onRefresh = () => {
    refreshLoading.value = true;
    initData()
    refreshLoading.value = false;
};
onMounted(() => {
    initData()
});
</script>

<style scoped lang="less">
.equipment {
    .equipment-pull-refresh {
        :deep(.van-pull-refresh__track ){
            min-height: 100vh ;

        }
    }

    .pulling,
    .loosing {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 80px;
        font-size: 20px;

        span {
            margin-left: 10px;
        }
    }

    .equipment-content {
        display: flex;
        flex-wrap: wrap;
        padding: 39px 17px 0;

        .equipment-item {
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 14px;
            width: 104px;
            height: 108px;
            border-radius: 4px;
            border: 1px solid #333333;

            img {
                margin: 12px 0 10px;
                width: 45px;
                height: 45px;
            }

            span {
                font-size: 14px;
                color: #CCCCCC;
            }
        }

        .equipment-item:nth-child(3n-1) {
            margin: 0 14px;
        }

    }
}
</style>
