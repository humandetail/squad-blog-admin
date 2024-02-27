import type { BaseParams, BaseResponseItem } from './common'

export interface PictureItem extends BaseResponseItem {
  name: string
  qiniuDomain: string
  qiniuKey: string
  categoryId: number
}

export interface Picture extends BaseParams {
  name: string
  categoryId: number
  file: File | null
}

export interface SelectedPicture {
  id: number
  name: string
  url: string
}

export interface PictureCategoryItem extends BaseResponseItem {
  name: string
  displayName: string
}

export interface PictureCategory extends BaseParams {
  name: string
  displayName: string
}
