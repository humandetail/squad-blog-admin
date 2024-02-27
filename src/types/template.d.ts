import type { BaseParams, BaseResponseItem } from './common'

export interface TemplateItem extends BaseResponseItem {
  name: string
  qiniuDomain: string
  qiniuKey: string
  coverId: number
  coverPic: string
}

export interface Template extends BaseParams {
  name: string
  coverId: number
  file: File | null
}
