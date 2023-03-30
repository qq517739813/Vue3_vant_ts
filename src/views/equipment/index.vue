<template>
    <div class="equipment" v-if="!loading">
        <div class="equipment-item" v-for="item  in equipInfo.UserEquips" :key="item.ModuleId">
            <img :src="getEquipImg(item)" alt="">
            <span>{{ item.ModuleName }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue';
import { userStore } from '@/store/user';
import { GetUserEquips } from '@/api/equipment'
import { getEquipImg } from '@/utils/base';
import { UserEquipsItem } from './index'

const store = userStore();
const loading = ref(false)
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
onMounted(() => {
    initData()
});
</script>

<style scoped lang="less">
.equipment {
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
        img{
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
}</style>
