<template>
  <div class="equipment">
    <van-nav-bar fixed :border="false" placeholder safe-area-inset-top class="title" title="农事活动" />
    <van-pull-refresh v-model="refreshLoading" @refresh="onRefresh" class="equipment-pull-refresh">
      <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
      <template #pulling="props">
        <div class="pulling" :style="{ height: props.distance }">
          <van-icon name="arrow-down" />
          <span>下拉即可刷新...</span>
        </div>
      </template>
      <!-- 释放提示 -->
      <template #loosing>
        <div class="loosing">
          <van-icon name="arrow-up" />
          <span>释放即可刷新...</span>
        </div>
      </template>
      <div class="act-content">
        <div class="act-item" v-for="item in farm.farmInfo.dataList" :key="item.id" @click="handleClick(item)">
          <!-- 每一项的title -->
          <van-row class="acttitle">
            <van-col span="19">
              <span style="color:#fff">{{ item.actName }}</span>
              <span>({{ format(item.creationTime) }})</span>
            </van-col>
            <van-col>
              <span>详情</span>
              <van-icon name="arrow" />
            </van-col>
          </van-row>
          <van-row>
            <van-col span="12">
              <span>农事负责人:</span>
              <span class="fontcolor">{{ item.creator }}</span>
            </van-col>
            <van-col>
              <span>地块：</span>
              <span class="fontcolor">{{ item.fieldName }}</span>
            </van-col>
          </van-row>
          <van-row>
            <van-col>
              <span>农事内容：{{item.actIntro}}</span>
            </van-col>
          </van-row>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue';
// import { userStore } from '@/store/user';
import { showLoadingToast, closeToast } from 'vant';
import { getActList } from '@/api/home';
// import { getEquipImg } from '@/utils/base';
import { FarmRecordItem } from './index';
import moment from 'moment';

// const store = userStore();
// const loading = ref<boolean>(false);
const refreshLoading = ref<boolean>(false);
// 农事记录
const farm = reactive<FarmRecordItem>({ farmInfo: {} });
// 获取用户设备模块
const initData = async () => {
  // loading.value = true;
  showLoadingToast({
    message: 'loading...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0,
  });
  const payload = {
    page: 1,
    pageSize: 2,
    isAll: true,
  };
  await getActList(payload).then((res) => {
    if ((res as any).isSuccess) {
      const { data: farmRes } = res as any;
      farm.farmInfo = farmRes
      // equipInfo.UserEquips = Data;
      // loading.value = false;
      console.log(farmRes);
      closeToast();
    }
  });
};
// 下拉刷新
const onRefresh = () => {
  refreshLoading.value = true;
  initData();
  refreshLoading.value = false;
};
// 设备点击事件
const handleClick = (item: any) => {
  console.log('item', item)
};
// 过滤时间
const format = (item: string) => {
  return moment(item).format('YYYY-MM-DD')
}
onMounted(() => {
  initData();
});
</script>

<style scoped lang="less">
.equipment {
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

  .equipment-pull-refresh {
    :deep(.van-pull-refresh__track) {
      min-height: calc(100vh - 96px);
    }
  }

  .pulling,
  .loosing {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    font-size: 20px;

    span {
      margin-left: 10px;
    }
  }

  .act-content {

    //   display: flex;
    //   flex-wrap: wrap;
    // padding: 10px 5px;
    color: #ccc;

    .act-item {
      margin: 10px 8px;
      border-radius: 5px;
      border: solid 1px #333333;
      box-sizing: border-box;
      //     flex-direction: column;
      //     align-items: center;
      //     margin-bottom: 14px;
      //     width: 104px;
      //     height: 108px;
      //     border-radius: 4px;
      //     border: 1px solid #333333;
      //     span {
      //       font-size: 14px;
      //       color: #cccccc;
      //     }
      .van-col{
        padding: 5px 10px;
      }
    }

    //   .equipment-item:nth-child(3n-1) {
    //     margin: 0 14px;
    //   }
  }
}

// 农事每块的title
.acttitle {
  padding: 10px 0;
  border-bottom: solid 1px #333333;

}
//白色自豪
.fontcolor{
  color: #ffffff;
}
</style>
