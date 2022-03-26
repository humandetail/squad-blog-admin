import { IBaseParams, IBaseResponseItem, ZeroOrOneType } from './common';

export type PersonalWorkPicture = {
  id: number;
  url: string;
}

export interface IPersonalWorkItem extends IBaseResponseItem{
  name: string;
  link: string;
  description: string;
  baseId: number;
  baseNickname: string;
  pictures: PersonalWorkPicture[]
}

export interface IPersonalWork extends IBaseParams {
  name: string;
  link: string;
  description: string;
  baseId: number;
  pictures: number[];
}

export interface IPersonalWorkBatchBase {
  baseId: number;
  newBaseId: number;
  isAll?: boolean;
  ids?: string[];
}

export interface IPersonalWorkBatchStatus {
  isShow: ZeroOrOneType;
  isAll?: boolean;
  ids?: string[];
}

export interface IPersonalWorkBatchDelete {
  ids: string[];
}
