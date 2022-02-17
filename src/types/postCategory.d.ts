import { IBaseParams, IBaseResponseItem } from './common';

export interface IPostCategoryItem extends IBaseResponseItem {
  name: string;
  displayName: string;
}

export interface IPostCategory extends IBaseParams {
  name: string;
  displayName: string;
}
