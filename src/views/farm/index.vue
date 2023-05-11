<template>
  <div class="equipment">
    <van-nav-bar fixed :border="false" placeholder safe-area-inset-top class="title" title="农事活动" right-text="添加+"  @click-right="onClickRight" />
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
          <div class="act-item" v-for="item in farm.farmInfo.dataList" :key="item.id" >
            <!-- 每一项的title -->
            <van-row class="acttitle">
              <van-col span="19">
                <span style="color:#fff">{{ item.actName }}</span>
                <span>({{ format(item.creationTime) }})</span>
              </van-col>
              <van-col @click="handleClick(item)">
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
                <span>农事内容：{{ item.actIntro }}</span>
              </van-col>
            </van-row>
          </div>
        </div>
    </van-pull-refresh>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { showLoadingToast, closeToast } from 'vant';
import { getActList } from '@/api/home';
import { FarmRecordItem } from './index';
import moment from 'moment';

const router = useRouter();
const refreshLoading = ref<boolean>(false);
const farm = reactive<FarmRecordItem>({ farmInfo: {} });
const initData = async () => {
  showLoadingToast({
    message: 'loading...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0,
  });
  const payload = {
    page: 1,
    pageSize: 6,
    isAll: true,
  };
  await getActList(payload).then((res) => {
    if ((res as any).isSuccess) {
      const { data: farmRes } = res as any;
      farm.farmInfo = farmRes
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
// 点击右侧按钮
const onClickRight = ()=>{
  router.push({name: 'AddFarm'})
  
}
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
    color: #ccc;

    .act-item {
      margin: 10px 8px;
      border-radius: 5px;
      border: solid 1px #333333;
      box-sizing: border-box;

      .van-col {
        padding: 5px 10px;
      }
    }
  }
  :deep(.van-nav-bar__text){
    color: #ccc;
  }
}

// 农事每块的title
.acttitle {
  padding: 10px 0;
  border-bottom: solid 1px #333333;

}

//白色自豪
.fontcolor {
  color: #ffffff;
}
</style>
