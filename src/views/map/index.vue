<template>
  <div class="map" v-if="!loading">地图</div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { userStore } from '@/store/user';
import { GetEquipmentsList } from '@/api/map'
import { DevListtem } from './index'

const store = userStore();
const loading = ref(false)
const devInfo = reactive<DevListtem>({ DevList:{} })
// 获取设备列表
const initData = () => {
  loading.value = true
  const payload = {
    Uid: store.userInfo.Uid,
    Token: store.userInfo.Token,
  }
  GetEquipmentsList(payload).then(res => {
    if ((res as any).IsSuccess) {
      const { Data } = (res as any);
      devInfo.DevList = Data
      loading.value = false;
    }
  })
}
onMounted(() => {
  initData()
});
</script>

<style scoped lang="less">
.map {
  color: #fff;

}
</style>
