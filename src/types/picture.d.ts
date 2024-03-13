import { type UploadProps } from 'ant-design-vue'
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
  fileList: Required<UploadProps>['fileList']
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
