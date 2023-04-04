<template>
    <div class="userInfo">
        <div class="title">我的</div>

        <div class="userName">

        </div>
        <div class="warnSetting"></div>
        <div class="versionUpdate"></div>
        <div class="loginOut"></div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

onMounted(() => {
});
</script>

<style scoped lang="less">
.userInfo {
    .title {
    text-align: center;
    padding-top: 10px;
    font-size: 18px;
    color: #FFFFFF;
  }
}
</style>
