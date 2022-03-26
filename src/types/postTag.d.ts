import { IBaseParams, IBaseResponseItem } from './common';

export interface IPostTagItem extends IBaseResponseItem {
  name: string;
  displayName: string;
}

export interface IPostTag extends IBaseParams {
  name: string;
  displayName: string;
}
