<template>
  <div class="farmRecord">
    <div class="title">
      <span>农事记录</span>
      <van-button @click="handleMore">
        <span>更多</span>
        <van-icon name="arrow" color="#A5A7A9" />
      </van-button>
    </div>
    <van-cell-group class="record" :border="false">
      <van-cell is-link v-for="item in props.farmRecord.dataList" :key="item.id" @click="handleitem(item)">
        <template #title>
          <span class="actName">{{ item.actName }}</span>
        </template>
        <template #value>
          <span class="creator">{{ item.creator }}</span>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { FarmRecordBaseItem } from './index';

const router = useRouter();

interface Props {
  farmRecord: FarmRecordBaseItem;
}
const props = withDefaults(defineProps<Props>(), {
  farmRecord: () => {
    return {
      totalRecord: 0,
      totalPage: 0,
      pageSize: 0,
      page: 0,
      dataList: [],
    };
  },
});
const handleitem = (item: any) => {
  router.push({
    name: 'AddFarm',
    query: { id: item.id }
  })

}
const handleMore = () => {
  router.push({
    name: 'FarmLog'
  })
};
</script>

<style scoped lang="less">
.farmRecord {
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
      padding-right: 0;
      background: #1f2228;
      height: auto;

      span {
        margin-right: 5px;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }

  .record {
    .van-cell {
      padding: 10px;
      background: #1f2228;
      font-size: 14px;

      .actName {
        color: #ffffff;
      }

      .creator {
        color: #9e9e9e;
      }
    }

    .van-cell:after {
      left: 0;
      right: 0;
      border-bottom: 0.5px solid rgba(255, 255, 255, 0.1);
    }
  }
}
</style>
