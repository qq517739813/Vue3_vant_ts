<template>
  <div class="more">
    <van-nav-bar
      left-arrow
      fixed
      :border="false"
      placeholder
      safe-area-inset-top
      class="title"
      title="地块信息"
      @click-left="onClickLeft"
    />
    <div class="main" v-if="!loading && field.fieldInfo.dataList?.length">
      <div class="item" v-for="item in field.fieldInfo.dataList" :key="item.id">
        <div class="head">
          <div class="left">
            <div class="field">
              <img src="@/assets/field.svg" alt="" />
              <span>{{ item.fieldName }}</span>
            </div>
            <div class="area">
              <img src="@/assets/area.svg" alt="" />
              <span>{{ item.area?.toFixed(2) }}m&sup2;</span>
            </div>
          </div>
          <div class="right">
            <van-button @click="handClickItem(item)">
              <span>详情</span>
              <van-icon name="arrow" size="14" color="#A5A7A9" />
            </van-button>
          </div>
        </div>
        <div class="content">
          <div class="content-item">
            <span>工作人员：</span>
            <span>{{ item.managerName }}</span>
          </div>
          <div class="content-item">
            <span>当前作物：</span>
            <span>{{ item.cropList?.join() }}</span>
          </div>
        </div>
      </div>
    </div>
    <empty v-else />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';
import type { Router } from 'vue-router';
import { showLoadingToast, closeToast } from 'vant';
import { getFieldList } from '@/api/home';
import { FieldInfoItem,FieldItem } from './index';
import Empty from '@/components/empty.vue';

const router: Router = useRouter();

// 控制显示状态
const loading: Ref<boolean> = ref(false);
// 地块信息
const field = reactive<FieldInfoItem>({ fieldInfo: {} });
// 获取地块信息
const getFieldData = async (isAll: boolean) => {
  loading.value = true;
  showLoadingToast({
    message: 'loading...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0,
  });
  const payload = {
    page: 1,
    pageSize: 2,
    isAll,
  };
  const { data: fieldRes } = await getFieldList(payload);
  field.fieldInfo = fieldRes;
  loading.value = false;
  closeToast();
};
// 导航栏左侧事件
const onClickLeft = () => history.back();
// 点击地块信息每一项
const handClickItem = (item: FieldItem) => {
  console.log('item', item);
  router.push({
    name: 'FieldDetail',
    query: { fieldId: item.id, managerName: item.managerName },
  });
};
onMounted(() => {
  getFieldData(true);
});
</script>

<style scoped lang="less">
.more {
  .title {
    :deep(.van-nav-bar--fixed) {
      background: #1f2228;
      .van-nav-bar__left {
        .van-nav-bar__arrow {
          font-size: 18px;
          color: #ffffff;
        }
      }

      .van-nav-bar__title {
        font-weight: normal;
        font-size: 18px;
        color: #ffffff;
      }
    }
  }
  .main {
    padding: 25px 16px 0;
    .item {
      margin-bottom: 14px;
      .head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 12px;
          width: 190px;
          min-height: 32px;
          border-radius: 4px 4px 0px 0px;
          background: rgba(255, 255, 255, 0.1);
          .field,
          .area {
            display: flex;
            align-items: center;
            img {
              margin-right: 5px;
              width: 16px;
              height: 16px;
            }
            span {
              font-size: 14px;
              color: #ffffff;
            }
          }
        }
        .right {
          display: flex;
          align-items: center;
          button {
            border: none;
            padding-right: 0;
            background: #1f2228;
            height: auto;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.6);
            span {
              margin-right: 5px;
            }
          }
        }
      }
      .content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 14px 0 14px 11px;
        min-height: 83px;
        border-radius: 0px 4px 4px 4px;
        box-sizing: border-box;
        border: 0.5px solid rgba(255, 255, 255, 0.1);
        .content-item {
          font-size: 14px;
          color: #9e9e9e;
          span:nth-child(2) {
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>
