<template>
  <div class="adoptionInfo">
    <div class="title">认养信息</div>
    <!-- 农场管理员 -->
    <div v-if="store.userInfo.roles.includes('farmer')" class="farmer">
      <div class="left">
        <img src="@/assets/plotTitle.svg" alt="" />
      </div>
      <div class="right">
        <div class="item">
          <span>农场主：</span>
          <span>{{ props.adoptInfo.userName }}</span>
        </div>
        <div class="item">
          <span>占地面积：</span>
          <span>{{ props.adoptInfo.fieldArea }}m&sup2;</span>
        </div>
        <div class="item double">
          <div class="item-text">
            <span>员工：</span>
            <span>{{ props.adoptInfo.workerNum }}</span>
          </div>
          <div class="item-text">
            <span>现有地：</span>
            <span>{{ props.adoptInfo.fieldNum }}</span>
          </div>
        </div>
        <div class="item double">
          <div class="item-text">
            <span>认养地块：</span>
            <span>{{ props.adoptInfo.usedFieldNum }}</span>
          </div>
          <div class="item-text">
            <span>认养人：</span>
            <span>{{ props.adoptInfo.customerNum }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="unFarmer">
      <div class="item double">
        <div class="item-text">
          <span>认养人：</span>
          <!-- 工作人员 -->
          <span v-if="store.userInfo.roles.includes('worker')">{{ props.adoptInfo.customerNum }}</span>
          <!-- 客户 -->
          <span v-if="store.userInfo.roles.includes('customer')">{{ props.adoptInfo. userName}}</span>
        </div>
        <div class="item-text">
          <span>农事负责人：</span>
          <span v-if="store.userInfo.roles.includes('worker')">{{ props.adoptInfo.userName }}</span>
          <span v-if="store.userInfo.roles.includes('customer')">{{ props.adoptInfo. managerData}}</span>
        </div>
      </div>
      <div class="item">
        <span>农场主：</span>
        <span>{{ props.adoptInfo.farmerData }}</span>
      </div>
      <div class="item">
        <span>种植地块：</span>
        <span>{{ props.adoptInfo.fieldData }}</span>
      </div>
      <div class="item">
        <span>当前作物：</span>
        <span>{{ props.adoptInfo.cropData }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { userStore } from '@/store/user';
import { AdoptionInfoBaseItem } from './index';

interface Props {
  adoptInfo: AdoptionInfoBaseItem;
}
const props = withDefaults(defineProps<Props>(), {
  adoptInfo: () => {
    return { userName: '' };
  },
});
const store = userStore();
</script>

<style scoped lang="less">
.adoptionInfo {
    margin: 0 16px;
  .title {
    margin: 14px 0;
    font-size: 16px;
    color: #ffffff;
  }
  .farmer {
    min-height: 107px;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    .left {
      img {
        margin-left: 20px;
        margin-right: 27px;
        width: 70px;
        height: 70px;
      }
    }
    .right {
      .item {
        display: flex;
        font-size: 14px;
        line-height: 21px;
        color: #9e9e9e;
        min-width: 160px;
        span:nth-child(2) {
          color: #ffffff;
        }
      }
      .double {
        justify-content: space-between;
      }
    }
  }
  .unFarmer {
    min-height: 110px;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 12px 50px 0 12px;
    .item {
      display: flex;
      font-size: 14px;
      line-height: 21px;
      color: #9e9e9e;
      min-width: 160px;
      span:nth-child(2) {
        color: #ffffff;
      }
    }
    .double {
        justify-content: space-between;
      }
  }
}
</style>
