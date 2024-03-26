<template>
  <section class="top-keywords">
    <a-card
      title="Top10关键字"
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
import { getTop10Keywords } from '@/services'

import type { Top10KeywordItem } from '@/types/statistic'

const props = withDefaults(defineProps<{
  range: number
}>(), {
  range: 1
})

const { fetch, loading } = useRequest(getTop10Keywords)

const record = ref<Top10KeywordItem>({})

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

  chart.coordinate({ type: 'radial', endAngle: Math.PI })

  chart
    .interval()
    .data({
      value: record.value,
      transform: [{ type: 'sortBy', fields: [['count', true]] }]
    })
    .encode('x', 'keyword')
    .encode('y', 'count')
    .scale('y', { type: 'sqrt' })
    .encode('color', 'keyword')
    .encode('size', 40)
    .style('radius', 20)
    .label({
      text: 'count',
      position: 'outside',
      autoRotate: true,
      rotateToAlignArc: true,
      dx: 4
    })
    .axis('x', { title: false })
    .axis('y', false)
    .animate('enter', { type: 'waveIn', duration: 1000 })
  chart.render()
}
</script>
