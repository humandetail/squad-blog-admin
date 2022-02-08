import { IBasePageParams, IBaseParams, IBaseResponseItem } from './common';
import { IMenuItem } from './menu';

export interface IRole extends IBaseParams {
  name: string;
  remarks: string;
}

export interface IRoleItem extends IBaseResponseItem {
  name: string;
  remarks: string;
  isAdmin: boolean;
  menus: IMenuItem[]
}

export interface IRolePageParams extends IBasePageParams {
}
