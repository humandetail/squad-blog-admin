<template>
  <section class="today-flow">
    <a-card
      title="今日流量"
      :loading="loading"
    >
      <header class="header">
        <ul class="row">
          <li class="item"></li>
          <li class="item">浏览量(PV)</li>
          <li class="item">访客数(UV)</li>
          <li class="item">IP数</li>
        </ul>
      </header>
      <ul
        v-for="item of data"
        :key="item.date"
        class="row"
      >
        <li class="item">
          {{ item.date }}
        </li>
        <li class="item">
          {{ item.pv }}
        </li>
        <li class="item">
          {{ item.uv }}
        </li>
        <li class="item">
          {{ item.ip }}
        </li>
      </ul>
    </a-card>
  </section>
</template>

<script setup lang="ts">
import { theme } from 'ant-design-vue'
import useRequest from '@/composables/useRequest'
import { getTodayFlow } from '@/services'

import type { TodayFlowItem } from '@/types/statistic'

const { token } = theme.useToken()
const { fetch, loading } = useRequest(getTodayFlow)

const record = ref<TodayFlowItem>({
  todayFlow: { pv: 0, uv: 0, ip: 0 },
  yesterdayFlow: { pv: 0, uv: 0, ip: 0 }
})

const data = computed(() => {
  const { todayFlow, yesterdayFlow } = record.value ?? {}
  return [
    { date: '今日', pv: todayFlow?.pv, uv: todayFlow?.uv, ip: todayFlow?.ip },
    { date: '昨日', pv: yesterdayFlow?.pv, uv: yesterdayFlow?.uv, ip: yesterdayFlow?.ip }
  ]
})

onMounted(async () => {
  const res = await fetch()

  record.value = res.data
})
</script>

<style lang="scss">
.row {
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
  color: v-bind('token.colorTextSecondary');

  .item {
    width: 25%;
    padding: 8px 16px;
    border-right: 1px solid v-bind('token.colorBorderSecondary');

    &:not(:first-child) {
      text-align: right;
    }
  }

  &:first-of-type {
    font-weight: 700;
    font-size: 16px;
    color: v-bind('token.colorText');
  }
}

.header {
  .row .item {
    border: 0;
  }
}
</style>
