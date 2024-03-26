interface FlowItem {
  uv: number
  pv: number
  ip: number
}

export interface TodayFlowItem {
  todayFlow: FlowItem
  yesterdayFlow: FlowItem
}

export type PVItem = Record<string, number>

export type UVItem = Record<string, number>

export interface Top10KeywordItem {
  ip: string
  keyword: string
  count: number
}

export interface Top10PostViewItem {
  id: string
  title: string
  count: number
}
