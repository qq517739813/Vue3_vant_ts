<template>
  <div class="realData">
    <div class="realData-title">
      <span>实时数据</span>
      <span>{{ props.realTime }}</span>
    </div>
    <div v-if="realList.length" class="realData-content">
      <div
        class="realData-items"
        v-for="item in props.realList"
        :key="item.ParamId"
        @click="handeleItemClick(item.ParamId)"
      >
        <div class="item-title">
          <div class="title-left">
            <img :src="item.ParamIcon" alt="" />
            <span>{{ item.ParamName }}</span>
          </div>
          <div class="title-right">
            <span>图表</span>
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="item-text">
          <span>{{ item.ParamVal }}</span>
          <span>{{ item.ParamUnit }}</span>
        </div>
      </div>
    </div>
    <empty v-else />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import type { Router } from 'vue-router';
import { RealDataItem } from './index';
import Empty from '@/components/empty.vue';

interface Props {
  realList: RealDataItem[];
  equipmentId: string;
  realTime: string;
}
// 父子传数据
const props = withDefaults(defineProps<Props>(), {
  realList: () => [],
  equipmentId: '',
});
const router: Router = useRouter();
// 农场地块点击事件
const handeleItemClick = (paramId:string) => {
  router.push({
    name: 'MonitorHistoryData',
    query: {
      ObjId: props.equipmentId,
      paramId
    },
  });
};
</script>

<style scoped lang="less">
.realData {
  color: #ffffff;
  .realData-title {
    margin: 24px 0 11px;
    font-size: 16px;
    color: #cccccc;
    span:last-child {
      margin-left: 10px;
      font-size: 14px;
      color: #999999;
    }
  }
  .realData-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .realData-items {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px 8px 9px 8px;
      margin-bottom: 14px;
      width: 164px;
      min-height: 70px;
      border-radius: 4px;
      border: 0.5px solid #333333;
      .item-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title-left {
          display: flex;
          align-items: center;
          img {
            margin-right: 5px;
            width: 16px;
            height: 16px;
          }
          span {
            font-size: 14px;
            color: #cccccc;
          }
        }
        .title-right {
          font-size: 12px;
          color: #9e9e9e;
        }
      }
      .item-text {
        span:first-child {
          font-size: 18px;
          color: #00cc90;
        }
        span {
          font-size: 12px;
          color: #06aa7b;
        }
      }
    }
  }
}
</style>
