import { ILoginParams, IChangePasswordParams, IUserInfo, RegisterUserType } from '@/types/user';
import { encryptPassword } from '@/utils/tools';
import { axiosDelete, axiosGet, axiosPost, axiosPut } from '@/utils/http';
import { IMenuItem } from '@/types/menu';
import { IBasePageParams, IBasePageResponse, ZeroOrOneType } from '@/types/common';

/**
 * 用户登录
 * @param data - 用户登录信息
 * @returns token
 */
export function login ({ username, password }: ILoginParams) {
  return axiosPost<string>('/login', {
    username,
    password: encryptPassword(password)
  });
}

/**
 * 退出登录
 * @returns null
 */
export function logout () {
  return axiosGet('/logout');
}

/**
 * 获取用户信息
 * @returns 用户信息
 */
export function getUserInfo () {
  return axiosGet<IUserInfo>('/getUserInfo');
}

/**
 * 获取用户可访问菜单
 * @returns 用户可访问的菜单
 */
export function getAllowMenus () {
  return axiosGet<IMenuItem[]>('/getMenus');
}

/**
 * 修改用户密码
 */
export function changePassword (id: string, data: IChangePasswordParams) {
  return axiosPut(`/users/${id}/password`, data);
}

/**
 * 获取用户列表
 */
export function getUsers (params: IBasePageParams) {
  return axiosGet<IUserInfo[], IBasePageResponse>('/users', { params });
}

/**
 * 用户注册
 */
export function registerUser (data: RegisterUserType) {
  return axiosPost<null>('/users', data);
}

/**
 * 锁定/解锁用户
 */
export function setUserLockStatus (id: string, isLock: ZeroOrOneType) {
  return axiosPut<null>(`/users/${id}/lock`, { isLock });
}

/**
 * 删除用户
 */
export function deleteUser (id: string) {
  return axiosDelete<null>(`/users/${id}`);
}
