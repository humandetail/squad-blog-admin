import { IBaseParams, IBaseResponseItem } from './common';

export interface IPictureItem extends IBaseResponseItem {
  name: string;
  qiniuDomain: string;
  qiniuKey: string;
  categoryId: number;
}

export interface IPicture extends IBaseParams {
  name: string;
  categoryId: number;
  file: File | null
}

export type SelectedPicture = {
  id: number;
  url: string;
}
