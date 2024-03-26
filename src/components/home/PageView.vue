<template>
  <section class="page-view">
    <a-card
      title="PV"
      :loading="loading"
    >
      <div
        ref="containerRef"
        class="container"
      ></div>
    </a-card>
  </section>
</template>

<script setup lang="ts">
import { Chart } from '@antv/g2'
import useRequest from '@/composables/useRequest'
import { getPV } from '@/services'

import type { PVItem } from '@/types/statistic'

const props = withDefaults(defineProps<{
  range: number
}>(), {
  range: 1
})

const { fetch, loading } = useRequest(getPV)

const record = ref<PVItem>({})

const data = computed(() => {
  return Object.entries(record.value).map(([date, pv]) => {
    return {
      date,
      pv
    }
  })
})

let chart: Chart | null = null
const containerRef = ref<HTMLElement | null>(null)

watch(() => props.range, async range => {
  const res = await fetch(range)
  record.value = res.data

  await nextTick()

  render()
}, { immediate: true })

const render = () => {
  if (!containerRef.value) {
    return
  }

  chart = new Chart({
    container: containerRef.value,
    autoFit: true
  })

  chart
    .data(data.value)
    .encode('x', 'date')
    .encode('y', 'pv')
    .scale('x', {
      range: [0, 1]
    })
    .scale('y', {
      nice: true
    })

  chart.line().encode('shape', 'smooth')

  chart.point().encode('shape', 'point').tooltip(false)

  chart.render()
}
</script>
