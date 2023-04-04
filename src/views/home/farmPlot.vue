<template>
    <div class="farmPlot">
        <main class="allFarm">
            <div class="allFarm_item" v-for="item in props.plotData" :key="item.TypeId" @click="handleClick(item.FunCode)">
                <img :src="item.Icon" alt="">
                <span class="item-title">{{ item.TypeName }}</span>
                <div class="item-text">运行<span>{{ item.OnlineNum }}</span>/总{{ item.AllNum }}</div>
            </div>
        </main>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
    plotData: {
        type: Object,
        default: () => {
            return {};
        }
    },
})

const handleClick = (FunCode:string) => {
    router.push({
        name: FunCode,
        params: {
            FunCode
        }
    })
}
</script>

<style scoped lang="less">
.farmPlot {
    .allFarm {
        display: flex;
        flex-wrap: wrap;

        .allFarm_item {
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
                margin-top: 12px;
                width: 40px;
                height: 40px;
            }

            .item-title {
                margin: 5px 0 2px;
                font-size: 14px;
                color: #CCCCCC;
            }

            .item-text {
                font-size: 12px;
                color: #d2d3d4;
            }

            span {
                color: #00CC90;
            }
        }

        .allFarm_item:nth-child(3n-1) {
            margin: 0 14px;
        }
    }
}
</style>
