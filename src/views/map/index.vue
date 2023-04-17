<template>
  <div class="map" v-if="!loading">
    <van-nav-bar fixed :border="false" placeholder safe-area-inset-top class="title" title="地图" />
    <div id="container"></div>
  </div>
</template>

<script lang="ts" setup>
import AMapLoader from '@amap/amap-jsapi-loader';
import { onMounted, reactive, onUnmounted, ref } from 'vue';
import { userStore } from '@/store/user';
import { useRouter } from 'vue-router';
import type { Router } from 'vue-router';
import { showLoadingToast, closeToast } from 'vant';
import { GetEquipmentsList } from '@/api/equipment';
import { DevListtem,CommonItem } from './index';
import { MAP_KEY, SECURITY_JS_CODE } from '@/config/base';
import { getMarkersIcon } from '@/utils/base';

(window as any)._AMapSecurityConfig = {
  securityJsCode: SECURITY_JS_CODE,
};
const store = userStore();
const router: Router = useRouter();
const loading = ref<boolean>(false);
let map: any = null;
const devInfo = reactive<DevListtem>({ DevList: [] });
// 获取设备列表
const initData = () => {
  loading.value = true;
  showLoadingToast({
    message: 'loading...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0,
  });
  const payload = {
    Uid: store.userInfo.Uid,
    Token: store.userInfo.Token,
  };
  GetEquipmentsList(payload).then((res) => {
    if ((res as any).IsSuccess) {
      const { Data } = res as any;
      devInfo.DevList = Data;
      loading.value = false;
      closeToast();
      initMap();
    }
  });
};
// 初始化地图
const initMap = () => {
  AMapLoader.load({
    key: MAP_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    AMapUI: {
      version: '1.1',
      plugins: [],
    },
    Loca: {
      version: '2.0.0',
    },
  })
    .then((AMap) => {
      map = new AMap.Map('container', {
        // 设置地图容器id
        viewMode: '3D', // 是否为3D地图模式
        zoom: 11, // 初始化地图层级
        zooms: [11, 20], // 缩放范围
        mapStyle: 'amap://styles/dark',
        // center: [108.90862, 32.31288], // 初始化地图中心点位置
      });
      const { DevList } = devInfo;
      // 获取当前地图级别
      const center = map.getCenter();
      // 设置地图中心点
      map.setCenter(center);
      // 限制地图显示范围
      // const bounds = map.getBounds();
      // map.setLimitBounds(bounds);

      if (DevList.length > 0) {
        map.clearMap();
      }
      DevList.forEach((marker) => {
        const marks = new AMap.Marker({
          map,
          // icon: getMarkersIcon(marker),
          position: [Number(marker.Lng), Number(marker.Lat)],
          extData: marker,
          content: `<img src="${getMarkersIcon(
            marker,
          )}" style="width: 40px; height: 80px;" alt="">`,
        });
        marks.on('click', openDialog);
      });
      // 添加覆盖物
      map.add(DevList);
      // 自动适配到合适视野范围
      // 无参数，默认包括所有覆盖物的情况
      map.setFitView();
      map.on('complete', () => {
        // log.success("地图加载完成！");
        console.log('地图加载完成！');
      });
    })
    .catch((e) => {
      console.log(e);
    });
};
// 打开详情弹窗
const openDialog = (e: Event) => {
  // console.log('e :>> ', (e.target as any)._originOpts.extData);
  const item:CommonItem=(e.target as any)._originOpts.extData
   router.push({
    name: item.FunCode[0],
    params: {
      FunCode: item.FunCode[0],
    },
    query: {
      ObjId:item.DevId ,
    },
  });
};
onMounted(() => {
  initData();
});
onUnmounted(() => {
  // 销毁地图，并清空地图容器
  if (map) {
    map.destroy();
    map = null;
  }
  console.log('地图销毁完成！');
});
</script>

<style scoped lang="less">
.map {
  .title {
    :deep(.van-nav-bar--fixed) {
      background: #1f2228;
      .van-nav-bar__title {
        font-weight: normal;
        font-size: 18px;
        color: #ffffff;
      }
    }
  }
  #container {
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: calc(100vh - 50px);
  }
}
</style>
