import type { BaseParams, BaseResponseItem, ZeroOrOneType } from './common'

interface TagItem {
  id: number
  displayName: string
}

export interface PostItem extends BaseResponseItem {
  title: string
  summary: string
  content?: string
  author: string
  source: string
  recommendationIndex: number
  seoTitle: string
  seoKeywords: string
  seoDescription: string
  categoryId: number
  categoryName: string
  coverId: number
  coverPic: string
  templateId: number
  templateName: string
  tags: TagItem[]
}

export interface Post extends BaseParams {
  title: string
  summary: string
  content: string
  author: string
  source: string
  recommendationIndex: number
  seoTitle: string
  seoKeywords: string
  seoDescription: string
  categoryId: number
  coverId: number
  templateId: number
  tags: number[]
}

export interface PostBatchCategory {
  categoryId: number
  newCategoryId: number
  isAll?: boolean
  ids?: string[]
}

export type PostBatchTagAction = 'add' | 'remove' | 'change'

export interface PostBatchTag {
  newTagId: number
  action: PostBatchTagAction
  tagId?: number
  isAll?: boolean
  ids?: string
}

export interface PostBatchStatus {
  isShow: ZeroOrOneType
  isAll?: boolean
  ids?: string[]
}

export interface PostBatchDelete {
  ids: string[]
}

export interface PostBatchTemplate {
  templateId: number
  newTemplateId: number
  isAll?: boolean
  ids?: string[]
}

export interface PostCategoryItem extends BaseResponseItem {
  name: string
  displayName: string
}

export interface PostCategory extends BaseParams {
  name: string
  displayName: string
}

export interface PostTagItem extends BaseResponseItem {
  name: string
  displayName: string
}

export interface PostTag extends BaseParams {
  name: string
  displayName: string
}
