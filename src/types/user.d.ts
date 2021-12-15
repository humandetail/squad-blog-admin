import { IBaseResponseItem } from './common';

export interface ILoginParams {
  username: string;
  password: string;
}

export interface IChangePasswordParams {
  password: string;
  newPassword: string;
}

export interface IUserInfo extends Omit<IBaseResponseItem, 'id'> {
  id: string;
  username: string;
  isLock: number;
  lastLogin: string;
  nickName: string;
  avatarPic: string;
  roleId: number;
  roleName: string;
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
