import { ILoginParams, IChangePasswordParams, IUserInfo, RegisterUserType, IUserManage } from '@/types/user';
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
 * 用户管理：分配角色、锁定、解锁用户
 * @param id 用户 id
 * @param data
 */
export function userManage (id: string, { isLock, roleId }: IUserManage) {
  return axiosPut<null>(`/users/${id}/manage`, isLock ? { isLock } : { roleId });
}

/**
 * 删除用户
 */
export function deleteUser (id: string) {
  return axiosDelete<null>(`/users/${id}`);
}
