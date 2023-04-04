<template>
    <div class="monitorData">
        实时数据
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { useRoute } from "vue-router";

const route = useRoute();

const countFuncode = computed(() => {
    return route.params.FunCode
})

console.log('countFuncode', countFuncode)
</script>

<style scoped lang="less">
.monitorData {
    color: #fff;
}
</style>
