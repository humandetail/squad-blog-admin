<template>
  <section class="top-post">
    <a-card
      title="Top10文章"
      :loading="loading"
    >
      <a-empty
        v-if="record.length === 0"
        :image="simpleImage"
      />
      <div
        ref="containerRef"
        class="container"
      ></div>
    </a-card>
  </section>
</template>

<script setup lang="ts">
import { Chart } from '@antv/g2'
import { Empty } from 'ant-design-vue'
import useRequest from '@/composables/useRequest'
import { getTop10PostViews } from '@/services'

import type { Top10PostViewItem } from '@/types/statistic'

const props = withDefaults(defineProps<{
  range: number
}>(), {
  range: 1
})

const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE

const { fetch, loading } = useRequest(getTop10PostViews)

const record = ref<Top10PostViewItem>({})

let chart: Chart | null = null
const containerRef = ref<HTMLElement | null>(null)

watch(() => props.range, async range => {
  const res = await fetch(range)
  record.value = res.data

  if (record.value.length > 0) {
    await nextTick()
    render()
  }
}, { immediate: true })

const render = () => {
  chart = new Chart({
    container: containerRef.value,
    autoFit: true
  })

  chart.coordinate({ type: 'radial', endAngle: Math.PI })

  chart.coordinate({
    transform: [{ type: 'transpose' }]
  })

  chart.data(record.value)

  chart
    .interval()
    .encode('x', 'title')
    .encode('y', 'count')
    .encode('color', 'title')
    .encode('shape', 'funnel')
    .transform({ type: 'symmetryY' })
    .scale('x', { padding: 0 })
    .animate('enter', { type: 'fadeIn' })
    .label({
      text: (d: any) => `${d.title}\n${d.count}`,
      position: 'inside',
      transform: [{ type: 'contrastReverse' }]
    })
    .axis(false)
    .style('radiusTopLeft', 16)

  chart.render()
}
</script>
