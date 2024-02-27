import type { BaseParams, BaseResponseItem } from './common'

export interface BlogrollItem extends BaseResponseItem {
  name: string
  link: string
  remarks: string
}

export interface Blogroll extends BaseParams {
  name: string
  link: string
  remarks: string
}
