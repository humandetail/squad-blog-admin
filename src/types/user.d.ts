import { IBaseResponseItem, ZeroOrOneType } from './common';

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

export type RegisterUserType = {
  username: string;
  password: string;
};

export type IUserManage = {
  isLock?: ZeroOrOneType;
  roleId?: number;
}
