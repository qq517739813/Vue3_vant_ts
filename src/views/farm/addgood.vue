<template>
    <div class="addgood">
        <van-nav-bar title="新增投入品" class="title" fixed :border="false" placeholder safe-area-inset-top
            @click-left="onClickLeft">
            <template #left>
                <van-icon name="arrow-left" size="20" color="#FFFFFF" />
            </template>
        </van-nav-bar>

        <van-cell title="投入品名称">
            <template #label>
                <div class="lable" @click="handleClick">
                    <span class="custom-title">{{ requestgood.good.label }}</span>
                    <van-icon name="arrow" />
                </div>
            </template>
        </van-cell>
        <van-cell :border=false title="投入品数量">
            <template #label>
                <div class="lable">
                    <input v-model="num" type="text" style="border: none; background-color: transparent;" placeholder="请输入数量">
                </div>
            </template>

        </van-cell>
        <van-cell />

        <div style="padding-top: 60px;">
            <van-button @click="handlesaveActGoods" style="width: 100%;" type="success">成功按钮</van-button>
        </div>


        <van-dialog v-model:show="show" :show-confirm-button="false" closeOnClickOverlay>
            <van-cell>
                <template #title>
                    <div class="dialogTitle">选择主体</div>
                </template>
            </van-cell>
            <van-cell v-for="(item, index) in goods.goodsinfo" :key="index">
                <template #title>
                    <div style="text-align: center" @click="handlecaellvalue(item)">{{ item.goodsName }}</div>
                </template>
            </van-cell>
        </van-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import { goodsgetList, saveActGoods } from '@/api/farm'
import { goodsInfoItem } from './index'
import { useRoute } from 'vue-router';
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { showToast } from "vant";

const route: RouteLocationNormalizedLoaded = useRoute();
// 拿到路由参数传过来的id
const routeid = reactive({ id: route.query.actId })



const show = ref(false)
const num = ref('')
const goods = reactive<goodsInfoItem>({
    goodsinfo: {}
})
const requestgood = reactive({
    good: {
        label: '',
        id: '',
        unit: '',
        tenantId: ''
    }
})
const init = async () => {
    const payload = {
        page: 0,
        pageSize: 0,
        IsAll: true
    }
    const { data: res } = await goodsgetList(payload)
    goods.goodsinfo = res.dataList
}

const handlecaellvalue = (item: any) => {
    requestgood.good.label = item.goodsName
    requestgood.good.id = item.id
    requestgood.good.unit = item.unit
    requestgood.good.tenantId = item.tenantId
    show.value = !show.value
}

const handlesaveActGoods = () => {

    const payload = {
        tenantId: requestgood.good.tenantId,
        actId: routeid.id,
        goodsId: requestgood.good.id,
        num: num.value,
        unit: requestgood.good.unit
    }
    saveActGoods(payload).then(() => {
        showToast('保存成功');
        history.back();
    })


}

const handleClick = () => {
    show.value = !show.value
}
const onClickLeft = () => history.back();

onMounted(() => {
    init()
})
</script>

<style lang="less" scoped>
.addgood {
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
                font-size: 14px;
                color: #00cc90;
            }
        }
    }

    .dialogTitle {
        text-align: center;
        font-weight: 700;
        padding: 5px 0;
    }

    .lable {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 3px;

        padding: 3px 0;
    }

    :deep(.van-cell) {
        color: #ccc;
        background: #1f2228;
        ;

    }

}
</style>