import { IBaseParams, IBaseResponseItem } from './common';

export interface ITemplateItem extends IBaseResponseItem {
  name: string;
  qiniuDomain: string;
  qiniuKey: string;
  coverId: number;
  coverPic: string;
}

export interface ITemplate extends IBaseParams {
  name: string;
  coverId: number;
  file: File | null;
}
