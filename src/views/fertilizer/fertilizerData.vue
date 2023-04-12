<template>
  <div class="fertilizerData">
    <div class="fertilizerData-title">施肥机数据</div>
    <div class="fertilizerData-content">
      <div v-for="(item, index) in props.fertilizerData" :key="index" class="content-item">
        <div class="items">
          <img :src="item.ParamIcon" alt="" />
          <span>{{ item.ParamName }}</span>
        </div>
        <span>{{ `${item.Val}${item.Unit}` }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FertilizerDataItem } from './index';

interface Props {
  fertilizerData: FertilizerDataItem[];
}
// 父传子数据
const props = withDefaults(defineProps<Props>(), {
  fertilizerData: () => [],
});
</script>

<style scoped lang="less">
.fertilizerData {
  .fertilizerData-title {
    margin: 20px 0 14px;
    font-size: 16px;
    color: #cccccc;
  }
  .fertilizerData-content {
    display: flex;
    flex-direction: column;
    padding: 15px 19px 6px 14px;
    min-height: 196px;
    border-radius: 4px;
    border: 0.5px solid rgba(255, 255, 255, 0.1);
    .content-item {
      margin-bottom: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      color: #ffffff;
      .items {
        img {
          margin-right: 10px;
          width: 20px;
          height: 20px;
          vertical-align: sub;
        }
      }
    }
  }
}
</style>
