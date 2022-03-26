import { IBaseParams, IBaseResponseItem } from './common';

export interface IBlogrollItem extends IBaseResponseItem{
  name: string;
  link: string;
  remarks: string;
}

export interface IBlogroll extends IBaseParams {
  name: string;
  link: string;
  remarks: string;
}
