import { IBaseParams, IBaseResponseItem } from './common';

export interface IPictureCategoryItem extends IBaseResponseItem {
  name: string;
  displayName: string;
}

export interface IPictureCategory extends IBaseParams {
  name: string;
  displayName: string;
}
