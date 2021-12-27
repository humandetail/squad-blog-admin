import { IBasePageResponse } from '@/types/common';
import { IMenu, IMenuItem, IMenuItemWithHasChildren, IMenuPageParams } from '@/types/menu';
import { axiosGet, axiosPost } from '@/utils/http';

/**
 * 创建菜单
 * @param data - 菜单信息
 * @returns null
 */
export function createMenu (data: IMenu) {
  return axiosPost<null>('/menus', data);
}

/**
 * 获取菜单列表
 * @param params
 * @returns
 */
export function getMenus (params: IMenuPageParams) {
  return axiosGet<IMenuItem[], IBasePageResponse<IMenuItem[]>>('/menus', { params });
}

/**
 * 获取下级菜单
 * @param parentId - 父级菜单 id
 * @returns
 */
export function getMenusByParentId (parentId: number) {
  return axiosGet<IMenuItemWithHasChildren[]>(`/menus/parentId/${parentId}`);
}
