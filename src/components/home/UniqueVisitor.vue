<template>
  <section class="unique-visitor">
    <a-card
      title="UV"
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
import { getUV } from '@/services'

import type { UVItem } from '@/types/statistic'

const props = withDefaults(defineProps<{
  range: number
}>(), {
  range: 1
})

const { fetch, loading } = useRequest(getUV)

const record = ref<UVItem>({})

const data = computed(() => {
  return Object.entries(record.value).map(([date, uv]) => {
    return {
      date,
      uv
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
  chart = new Chart({
    container: containerRef.value,
    autoFit: true
  })

  chart
    .data(data.value)
    .encode('x', 'date')
    .encode('y', 'uv')
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
