<template>
  <div class="fieldInfo">
    <div class="title">
      <span>地块信息</span>
      <van-button @click.self="handleMore">
        <span>更多</span>
        <van-icon name="arrow" color="#A5A7A9" />
      </van-button>
    </div>
    <div class="main" v-for="item in props.fieldInfo.dataList" :key="item.id">
      <div class="head">
        <div class="field">
          <img src="@/assets/field.svg" alt="" />
          <span>{{ item.fieldName }}</span>
        </div>
        <div class="area">
          <img src="@/assets/area.svg" alt="" />
          <span>{{ item.area.toFixed(2) }}m&sup2;</span>
        </div>
      </div>
      <div class="content" @click="handClickItem(item)">
        <div class="content-item">
          <span>工作人员：</span>
          <span>{{ item.managerName }}</span>
        </div>
        <div class="content-item">
          <span>当前作物：</span>
          <span>{{ item.cropList.join() }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { Router } from 'vue-router';
import { FieldInfoBaseItem, FieldItem } from './index';

interface Props {
  fieldInfo: FieldInfoBaseItem;
}
const props = withDefaults(defineProps<Props>(), {
  fieldInfo: () => {
    return {
      totalRecord: 0,
      totalPage: 0,
      pageSize: 0,
      page: 0,
      dataList: [],
    };
  },
});
const router: Router = useRouter();
// 点击更多
const handleMore = () => {
  router.push('/fieldMore');
};
// 点击地块信息每一项
const handClickItem = (item: FieldItem) => {
  router.push({
    name: 'FieldDetail',
    query: { fieldId: item.id },
  });
};
</script>

<style scoped lang="less">
.fieldInfo {
  margin: 0 16px;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 14px 0;
    font-size: 16px;
    color: #ffffff;
    button {
      border: none;
      padding: 0;
      background: #1f2228;
      height: auto;
      span {
        margin-right: 5px;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }
  .main {
    margin-bottom: 14px;
    .head {
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
</style>
