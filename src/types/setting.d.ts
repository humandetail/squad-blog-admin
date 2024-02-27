import type { WebsiteStatus } from '@/config/constants'
import type { BaseParams, BaseResponseItem } from './common'

export interface SettingItem extends BaseResponseItem {
  siteName: string
  seoTitle: string
  seoKeywords: string
  seoDescription: string
  status: WebsiteStatus
  logoId: number
  logoPic: string
}

export interface Setting extends BaseParams {
  siteName: string
  seoTitle: string
  seoKeywords: string
  seoDescription: string
  status: WebsiteStatus
  logoId: number
}
