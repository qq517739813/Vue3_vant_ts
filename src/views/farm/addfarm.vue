<template>
    <div class="addfarm">
        <van-nav-bar title="农事活动上传" class="title" fixed :border="false" placeholder safe-area-inset-top
            @click-left="onClickLeft">
            <template #left >
                <van-icon name="arrow-left" size="20" color="#FFFFFF" />
            </template>
        </van-nav-bar>

        <van-cell title="农事主体">
            <template #label>
                <div class="lable" @click="handleClick('选择主体')">
                    <span class="custom-title">{{ btns.btn.main }}</span>
                    <van-icon name="arrow" />
                </div>
            </template>
        </van-cell>
        <van-cell title="工作地块" label="描述信息">
            <template #label>
                <div class="lable" @click="handleClick('选择地块')">
                    <span class="custom-title">{{ btns.btn.field }}</span>
                    <van-icon name="arrow" />
                </div>
            </template>
        </van-cell>
        <van-cell title="农事类型" label="描述信息">
            <template #label>
                <div class="lable" @click="handleClick('选择类型')">
                    <span class="custom-title">{{ btns.btn.actType }}</span>
                    <van-icon name="arrow" />
                </div>
            </template>
        </van-cell>
        <van-cell>
            <template #title>
                <span>农事名称</span>
                <span style="color: red"> *</span>
            </template>
            <template #label>
                <div class="lable">
                    <input v-model="farmName" type="text" style="border: none; background-color: transparent;"
                        placeholder="输入农事名称">
                </div>
            </template>

        </van-cell>

        <van-cell>
            <template #title>
                <span>农事内容</span>
                <span style="color: red"> *</span>
            </template>
            <template #label>
                <div class="lable">
                    <van-field v-model="actIntro" rows="2" type="textarea" autosize placeholder="输入农事内容" />
                </div>
            </template>
        </van-cell>
        <van-cell v-if="routeid.id" :border=false title="投入品信息">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #right-icon v-if="store.userInfo.roles[0] != 'customer'">
                <span style="color: #00CC90">
                    <span @click="handleAddGood">添加+</span>
                </span>
            </template>
            <template #label>
                <div class="lable" v-for="item in  goods.goodsinfo.dataList" :key="item.id">
                    <span>名称:{{ item.goodsName }}</span>
                    <span>数量:{{ item.num }}{{ item.unit }}</span>
                    <span style="color: red;" v-if="store.userInfo.roles[0] != 'customer'"><van-icon name="delete-o" @click="handleDelgood(item.id)" /></span>
                </div>
            </template>
        </van-cell>

        <van-cell :border=false title="工作照片">
            <template #label>
                <div class="lable">
                    <van-uploader v-model="fileList.file1" :after-read="afterRead" name="file1" :max-count="1">
                        <div class="upimg">
                            <van-icon size="30" name="plus" />
                            <span>上传图片</span>
                        </div>
                    </van-uploader>
                    <van-uploader v-model="fileList.file2" :after-read="afterRead" name="file2" :max-count="1">
                        <div class="upimg">
                            <van-icon size="30" name="plus" />
                            <span>上传图片</span>
                        </div>
                    </van-uploader>
                    <van-uploader v-model="fileList.file3" :after-read="afterRead" name="file3" :max-count="1">
                        <div class="upimg">
                            <van-icon size="30" name="plus" />
                            <span>上传图片</span>
                        </div>
                    </van-uploader>
                </div>
            </template>
        </van-cell>

        <div class="savabtn" v-if="store.userInfo.roles[0] != 'customer'">
            <van-button v-if="routeid.id" round type="danger" @click="handleDel">删除</van-button>
            <van-button round type="success" @click="handleSave">保存</van-button>
        </div>

        <van-dialog v-model:show="show" :show-confirm-button="false" closeOnClickOverlay>
            <van-cell>
                <template #title>
                    <div class="dialogTitle">{{ title }}</div>
                </template>
            </van-cell>
            <van-cell v-for="(item, index) in values" :key="index">
                <template #title>
                    <div style="text-align: center" @click="handlecaellvalue(item)">{{ cellvaluecomputed(item) }}</div>
                </template>
            </van-cell>
        </van-dialog>
    </div>
</template>
  
<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { getMainGetList, getTypeList, getFieldList, uploadPhoto, actSave, getact, deleteact, getActGoodsList, deleteActGoods } from "@/api/farm";
import { MainInfoItem, fieldInfoItem, acttypeInfoItem, actInfoItem, goodsInfoItem } from "./index"
import { useRouter, useRoute } from 'vue-router';
import { userStore } from '@/store/user';
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { showConfirmDialog, showToast } from "vant";

const router = useRouter();
const store = userStore()
const route: RouteLocationNormalizedLoaded = useRoute();
// 拿到路由参数传过来的id
const routeid = reactive({ id: route.query.id })

// 农事主体
const mainList = reactive<MainInfoItem>({ mainInfo: {} })
// 农事地块
const fieldList = reactive<fieldInfoItem>({ fieldInfo: {} })
// 农事类型
const actTypeList = reactive<acttypeInfoItem>({ acttypeInfo: {} })
// 按钮显示
const btns = reactive({
    btn: {
        main: ' ',
        field: ' ',
        actType: ' ',
    }
})
// 活动数据
const act = reactive<actInfoItem>({ actinfo: {} })
// const 按钮类型
const btntype = ref('');
// 发送请求内容
const mainId = ref('');
const fieldId = ref('');
const typeId = ref('');
// 内容显示
const values = ref([])
const title = ref('')
const show = ref(false)
const farmName = ref('');
const actIntro = ref('')

// 图片1
const fileList = reactive({
    file1: [{ url: '' }],
    file2: [{ url: '' }],
    file3: [{ url: '' }]
});
const filerequestlist = ref({
    file: [] as any[]
});
// 投入品内容
const goods = reactive<goodsInfoItem>({
    goodsinfo: {}
})

// 获取农场主体，农事地块，农事类型
const init = async () => {

    fileList.file1 = [];
    fileList.file2 = [];
    fileList.file3 = [];
    const payload = {
        IsAll: true
    }
    const { data: mainlist } = await getMainGetList(payload);
    const { data: fieldlist } = await getFieldList(payload);
    const { data: acttypelist } = await getTypeList(payload);
    mainList.mainInfo = mainlist;
    btns.btn.main = mainList.mainInfo.dataList[0].mainName
    mainId.value = mainList.mainInfo.dataList[0].id
    fieldList.fieldInfo = fieldlist;
    btns.btn.field = fieldList.fieldInfo.dataList[0].fieldName
    fieldId.value = fieldList.fieldInfo.dataList[0].id
    actTypeList.acttypeInfo = acttypelist;
    btns.btn.actType = actTypeList.acttypeInfo.dataList[0].actionName
    typeId.value = actTypeList.acttypeInfo.dataList[0].id
    if (routeid.id) {
        // 获取投入品信息
        const payload1 = {
            IsAll: true,
            filter: routeid.id as string
        };
        const { data: ActGoods } = await getActGoodsList(payload1);
        goods.goodsinfo = ActGoods
        const { data: res } = await getact({ id: routeid.id })
        act.actinfo = res
        mainId.value = res.mainId
        fieldId.value = res.fieldId
        typeId.value = res.typeId
        actIntro.value = res.actIntro
        farmName.value = res.actName
        mainList.mainInfo.dataList.forEach((item: any) => {
            if (item.id === res.mainId) {
                mainId.value = item.id
                btns.btn.main = item.mainName
            }
        });
        fieldList.fieldInfo.dataList.forEach((item: any) => {
            if (item.id === res.fieldId) {
                fieldId.value = item.id
                btns.btn.field = item.fieldName
            }
        });
        actTypeList.acttypeInfo.dataList.forEach((item: any) => {
            if (item.id === res.typeId) {
                typeId.value = item.id
                btns.btn.actType = item.actionName
            }
        });
        switch (res.imgs.length) {
            case 1:
                fileList.file1 = [{ url: `${res.imgPath}${res.imgs[0]}` }]
                break;
            case 2:
                fileList.file1 = [{ url: `${res.imgPath}${res.imgs[0]}` }]
                fileList.file2 = [{ url: `${res.imgPath}${res.imgs[1]}` }]
                break;
            case 3:
                fileList.file1 = [{ url: `${res.imgPath}${res.imgs[0]}` }]
                fileList.file2 = [{ url: `${res.imgPath}${res.imgs[1]}` }]
                fileList.file3 = [{ url: `${res.imgPath}${res.imgs[2]}` }]
                break;
            default:
                break;
        }

    }



}
const handleClick = (item: string) => {
    show.value = !show.value
    title.value = item
    switch (item) {
        case '选择主体':
            values.value = mainList.mainInfo.dataList
            btntype.value = '1'
            break;
        case '选择地块':
            values.value = fieldList.fieldInfo.dataList
            btntype.value = '2'
            break;
        case '选择类型':
            values.value = actTypeList.acttypeInfo.dataList
            btntype.value = '3'
            break
        default:
            break;
    }
}
// 算弹出框应该怎么显示几个按钮
const cellvaluecomputed = (item: any) => {

    switch (btntype.value) {
        case '1':
            return item.mainName
                ;
        case '2':
            return item.fieldName
                ;
        case '3':
            return item.actionName
                ;
        default:
            break;
    }
}
const handlecaellvalue = (item: any) => {
    // console.log(item);

    switch (btntype.value) {
        case '1':
            mainId.value = item.id
            show.value = false;
            btns.btn.main = item.mainName
            break
            ;
        case '2':
            fieldId.value = item.id
            show.value = false;
            btns.btn.field = item.fieldName
            break
            ;
        case '3':
            typeId.value = item.id
            show.value = false;
            btns.btn.actType = item.actionName
            break;
        default:
            break;
    }

}
const afterRead = async (file: any, type: any) => {
    // 此时可以自行将文件上传至服务器
    const formData = new FormData();
    formData.append('file', file.file);
    formData.append('type', 'Activity');

    await uploadPhoto(formData).then((res: any) => {
        switch (type.name) {
            case 'file1':
                fileList.file1 = [{ url: `${res.filePath}${res.fileName}` }]
                filerequestlist.value.file.push(res.fileName)
                break;
            case 'file2':
                fileList.file2 = [{ url: `${res.filePath}${res.fileName}` }]
                filerequestlist.value.file.push(res.fileName)
                break;
            case 'file3':
                fileList.file3 = [{ url: `${res.filePath}${res.fileName}` }]
                filerequestlist.value.file.push(res.fileName)
                break;
            default:
                break;
        }

    }).catch((err) => { return err })
};

const handleSave = async () => {


    if (!farmName.value.trim() || !actIntro.value.trim()) {
        showToast('请填写内容');
        return;
    }
    const payload = {
        actIntro: actIntro.value,
        actName: farmName.value,
        id: routeid.id || null,
        imgs: filerequestlist.value.file,
        fieldId: fieldId.value,
        mainId: mainId.value,
        typeId: typeId.value,
    }

    // const { data: res } = await actSave(payload);
    await actSave(payload);
    // console.log(res);

    showToast('保存成功');

}
const handleDelgood = (id: string) => {
    showConfirmDialog({
        title: '删除',
        message:
            '确定删除投入品吗?',
    })
        .then(() => {
            // console.log('cancel');

            deleteActGoods({ id: [id] }).then(() => {
                init()
                showToast('删除成功')
            })
        })
        .catch(() => {
        });
}
const handleDel = () => {

    // router.push({
    //     name:'FarmLog'
    // })

    deleteact({ id: [routeid.id] }).then(() => {
        router.push({
            name: 'Farm'
        })
    })
}
const handleAddGood = () => {
    router.push({
        name: 'AddGood',
        query: { actId: routeid.id }
    })
}
const onClickLeft = () => history.back();

onMounted(() => {
    init();
});
</script>
  
<style scoped lang="less">
.addfarm {
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

    .lable {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 3px;

        padding: 3px 0;
    }

    .dialogTitle {
        text-align: center;
        font-weight: 700;
        padding: 5px 0;
    }

    .savabtn {
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 40px 0px 20px;

        .van-button--normal {
            padding: 0 30px;
        }
    }

    :deep(.van-cell) {
        color: #ccc;
        background: #1f2228;
        ;

    }

}

.upimg {
    width: 22vw;
    height: 22vw;
    display: flex;
    border: 1px solid #333;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

:deep(.van-field__control) {
    color: inherit;
}
</style>
  