<template>
  <div class="empty">
    <van-empty image-size="150">
      <template #image>
        <img src="@/assets/empty.svg" alt="" />
      </template>
    </van-empty>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import type { ComputedRef } from 'vue';
import { userStore } from '@/store/user';
import { useRoute } from 'vue-router';
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { getField, getDevListByDevId } from '@/api/field';

const store = userStore();
const route: RouteLocationNormalizedLoaded = useRoute();
// 路由参数
const countFieldId: ComputedRef = computed(() => {
  return route.query.fieldId;
});
const getFieldInfo = async (Id: string) => {
  const payload = {
    Id,
  };
  const { data: fieldRes } = await getField(payload);
  getDevList(fieldRes.devList);
  console.log('fieldRes', fieldRes);
};
const getDevList = async (ids: string[]) => {
  const payload = {
    Id: ids,
    Token: store.userInfo.user.iotToken,
    Val: '',
  };
  const res = await getDevListByDevId(payload);
  console.log('res', res);
};
onMounted(() => {
  getFieldInfo(countFieldId.value);
});
</script>

<style scoped lang="less"></style>
