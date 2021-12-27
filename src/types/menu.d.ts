import { IBasePageParams, IBaseParams, IBaseResponse, IBaseResponseItem } from './common';

export interface IMenu extends IBaseParams {
  parentId: number;
  name: string;
  type: number;
  router?: string;
  permission?: string;
  path?: string;
  icon?: string;
  isCache?: number;
}

export interface IMenuItem extends IBaseResponseItem {
  parentId: number;
  name: string;
  type: number;
  router: string;
  permission: string;
  path: string;
  icon: string;
  isCache: number;
}

export interface IMenuItemWithHasChildren extends IMenuItem {
  hasChildren: boolean
}

export interface IMenuPageParams extends IBasePageParams {
  keyword?: string;
  isAll?: number;
}

export interface IMenuInfo extends IBaseResponse {
  parentId: number;
  name: string;
  type: number;
  router: string;
  permission: string;
  path: string;
  icon: string;
  isCache: number;
}
