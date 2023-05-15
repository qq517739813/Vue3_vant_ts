<template>
  <div class="farmActive">
    <div class="content" v-for="item in props.farmData" :key="item.id">
      <div class="head">
        <div class="left">
          <span>{{ item.actName }}</span>
          <span>{{ `(${moment(item.creationTime).format('YYYY.MM.DD')})` }}</span>
        </div>
        <div class="right" @click="handleClickDetail(item)">
          <span>详情</span>
          <van-icon name="arrow" size="14" color="#9e9e9e" />
        </div>
      </div>
      <div class="text">
        <div class="text-title">
          <div>
            <span>农事负责人:</span>
            <span>{{ item.creator }}</span>
          </div>
          <div>
            <span>地块:</span>
            <span>{{ item.fieldName }}</span>
          </div>
        </div>
        <div class="textarea">农事内容：{{ item.actIntro }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import { FarmItem } from '../index';
import { useRouter } from 'vue-router';

const router = useRouter();

interface Props {
  farmData: FarmItem[];
}
const props = withDefaults(defineProps<Props>(), {
  farmData: () => [],
});
// 查看详情
const handleClickDetail = (item: any) => {
  router.push({
    name: 'AddFarm',
    query: { id: item.id }
  })
};
</script>

<style scoped lang="less">
.farmActive {
  padding-top: 14px;
  height: calc(100vh - 510px);
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  .content {
    margin-bottom: 14px;
    box-sizing: border-box;
    min-height: 120px;
    border-radius: 4px;
    border: 0.5px solid rgba(255, 255, 255, 0.1);

    &:last-child {
      margin-bottom: 0;
    }

    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 11px;
      padding-right: 17px;
      height: 30px;
      border-bottom: 0.5px solid rgba(255, 255, 255, 0.1);

      .left {
        font-size: 14px;
        color: #fff;

        span:nth-child(2) {
          color: #9e9e9e;
        }
      }

      .right {
        font-size: 14px;
        color: #9e9e9e;
      }
    }

    .text {
      padding: 0 11px 11px;

      .text-title {
        margin: 6px 0;
        padding-right: 25px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        div span {
          font-size: 14px;
          color: #9e9e9e;

          &:nth-child(2) {
            color: #fff;
          }
        }
      }

      .textarea {
        font-size: 14px;
        color: #999999;
      }
    }
  }
}
</style>
