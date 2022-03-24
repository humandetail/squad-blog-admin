import { IBaseParams, IBaseResponseItem, ZeroOrOneType } from './common';

type TagItem = {
  id: number;
  displayName: string;
}

export interface IPostItem extends IBaseResponseItem {
  title: string;
  summary: string;
  content?: string;
  author: string;
  source: string;
  recommendationIndex: number;
  seoTitle: string;
  seoKeywords: string;
  seoDescription: string;
  categoryId: number;
  categoryName: string;
  coverId: number;
  coverPic: string;
  templateId: number;
  templateName: string;
  tags: TagItem[];
}

export interface IPost extends IBaseParams {
  title: string;
  summary: string;
  content: string;
  author: string;
  source: string;
  recommendationIndex: number;
  seoTitle: string;
  seoKeywords: string;
  seoDescription: string;
  categoryId: number;
  coverId: number;
  templateId: number;
  tags: number[];
}

export interface IPostBatchCategory {
  categoryId: number;
  newCategoryId: number;
  isAll?: boolean;
  ids?: string[];
}

export type IPostBatchTagAction = 'add' | 'remove' | 'change';

export interface IPostBatchTag {
  newTagId: number;
  action: IPostBatchTagAction;
  tagId?: number;
  isAll?: boolean;
  ids?: string;
}

export interface IPostBatchStatus {
  isShow: ZeroOrOneType;
  isAll?: boolean;
  ids?: string[];
}

export interface IPostBatchDelete {
  ids: string[];
}

export interface IPostBatchTemplate {
  templateId: number;
  newTemplateId: number;
  isAll?: boolean;
  ids?: string[];
}
