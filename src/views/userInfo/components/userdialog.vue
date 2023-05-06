<template>
    <van-dialog style="padding: 10px;" v-model:show="props.isShow" :closeOnClickOverlay="true" :showConfirmButton="false">
        <span>{{ props.type }}</span>
        <van-form>
            <van-field autocomplete="off" :placeholder="placeholder"  label-width="70" name="val"
                v-model="val" :border="false" />
            <div class="btns">
                <van-button @click="sava" type="success">保存</van-button>
                <van-button @click="Handleclose" type="success">取消</van-button>
            </div>
        </van-form>
    </van-dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

const val = ref<string>('')
const props = defineProps({
    type: {
        type: String,
        default: undefined,
    },
    isShow: {
        type: Boolean,
        default: false,
    },
});
const emit = defineEmits(['handleSave', 'handleClose'])
// 点击修改密码
const sava = () => {
    emit('handleSave', [val.value,props.type])
    val.value = ''
}
const Handleclose = () => {
    emit('handleClose')
    val.value = ''
}
const placeholder = computed(() => {
    switch (props.type) {
        case "修改密码":
            return '请输入密码';
        case "修改电话":
            return '请输入电话号码';
        case "修改邮箱":
            return '请输入邮箱'
        default:
            return '';
    }
})
</script>

<style scoped lang="less">
.btns {
    display: flex;
    justify-content: space-around;

    .van-button--normal {
        width: 45%;
    }
}
</style>