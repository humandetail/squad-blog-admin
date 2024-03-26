import type { PVItem, TodayFlowItem, Top10KeywordItem, Top10PostViewItem, UVItem } from '@/types/statistic'
import { axiosGet } from '@/utils/http'

export function getTodayFlow () {
  return axiosGet<TodayFlowItem>('/statistics/todayFlow')
}

export function getPV (range: number) {
  return axiosGet<PVItem>('/statistics/pv', {
    params: { range }
  })
}

export function getUV (range: number) {
  return axiosGet<UVItem>('/statistics/uv', {
    params: { range }
  })
}

export function getTop10Keywords (range: number) {
  return axiosGet<Top10KeywordItem>('/statistics/top10Keywords', {
    params: { range }
  })
}

export function getTop10PostViews (range: number) {
  return axiosGet<Top10PostViewItem>('/statistics/top10PostViews', {
    params: { range }
  })
}
