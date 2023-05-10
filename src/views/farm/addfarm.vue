<template>
    <div class="addfarm">
        <van-nav-bar title="农事活动上传" class="title" fixed :border="false" placeholder safe-area-inset-top
            @click-left="onClickLeft">
            <template #left>
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
        <van-cell :border=false title="农事名称 *">
            <template #title>
                <span>农事名称</span>
                <span style="color: red"> *</span>
            </template>
            <template #label>
                <div class="lable">
                    <input v-model="farmName" type="text" style="border: none; background-color: transparent;">
                </div>
            </template>

        </van-cell>

        <van-cell :border=false title="农事内容">
            <template #label>
                <div class="lable">
                    <textarea rows="3" cols="50" style="border: none; background-color: transparent;"
                        placeholder="请输入您的文章内容..."></textarea>
                </div>
            </template>
        </van-cell>

        <van-cell :border=false title="工作照片">
            <template #label>
                <div class="lable">
                    <van-uploader v-model="fileList.file1" :after-read="afterRead" />
                    <van-uploader :after-read="afterRead" />
                    <van-uploader :after-read="afterRead" />
                </div>
            </template>
        </van-cell>


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
import { getMainGetList, getTypeList, getFieldList, uploadPhoto } from "@/api/farm";
import { MainInfoItem, fieldInfoItem, acttypeInfoItem } from "./index"

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
// 图片1
const fileList = reactive({
    file1: [{ url: '' }]
});
// 获取农场主体，农事地块，农事类型
const init = async () => {
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
    switch (btntype.value) {
        case '1':
            mainId.value = item.id
            show.value = false;
            break
            ;
        case '2':
            fieldId.value = item.id
            show.value = false;
            break
            ;
        case '3':
            typeId.value = item.id
            show.value = false;
            break;
        default:
            break;
    }

}
const afterRead = (file: any) => {
    // 此时可以自行将文件上传至服务器
    console.log(file);
    const formData = new FormData();
    formData.append('file', file.file);
    formData.append('type', 'Activity');
    uploadPhoto(formData).then((res: any) => {
        fileList.file1 = [{ url: `${res.filePath}${res.fileName}` }]

    }).catch((err) => { return err })
};
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
        background: #ccc;
        padding: 3px 0;
    }

    .dialogTitle {
        text-align: center;
        font-weight: 700;
        padding: 5px 0;
    }

}
</style>
  