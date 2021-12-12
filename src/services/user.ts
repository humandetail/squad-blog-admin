import { IMenuItem, IUserInfo } from '@/types/user';
import { encryptPassword } from '@/utils/tools';
import { axiosGet, axiosPost } from '@utils/http';

interface ILoginParams {
  username: string;
  password: string;
}

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
  return axiosPost('/logout');
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
export function getMenus () {
  return axiosGet<IMenuItem[]>('/getMenus');
}
