<template>
    <div class="userInfo" v-if="!loading">
        <div class="userName">

        </div>
        <div class="warnSetting"></div>
        <div class="versionUpdate"></div>
        <div class="loginOut"></div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
// import { userStore } from '@/store/user';
// import { getUserInfo } from '@/api/user'

// const store = userStore();
const loading = ref(false)

// 获取设备汇总数据
// const initData = () => {
//     loading.value = true
//     const payload = {
//         Uid: store.userInfo.Uid,
//         Token: store.userInfo.Token,
//     }
//     getUserInfo(payload).then(res => {
//         if ((res as any).IsSuccess) {
//             const { Data } = (res as any);
//             console.log('Data', Data)
//             loading.value = false;
//         }
//     })
// }
onMounted(() => {
    // initData()
});
</script>

<style scoped lang="less">
.userInfo {
    color: #fff;
}
</style>
