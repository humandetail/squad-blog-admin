import type { BaseResponseItem, ZeroOrOneType } from './common'

export interface LoginParams {
  username: string
  password: string
}

export interface ChangePasswordParams {
  password: string
  newPassword: string
}

export interface UserInfo extends Omit<BaseResponseItem, 'id'> {
  id: string
  username: string
  isLock: number
  lastLogin: string
  nickname: string
  avatarPic: string
  roleId: number
  roleName: string
}

export interface RegisterUserType {
  username: string
  password: string
}

export interface UserManage {
  isLock?: ZeroOrOneType
  roleId?: number
}
