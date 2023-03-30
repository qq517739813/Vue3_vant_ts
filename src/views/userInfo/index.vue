<template>
    <div class="userInfo">我的</div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';


onMounted(() => {
    console.log('我是my页面,我做了缓存');
});
</script>

<style scoped lang="less">
.userInfo{
    color: #fff;
}
</style>
