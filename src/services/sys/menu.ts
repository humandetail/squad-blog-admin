import { IBasePageParams, IBasePageResponse, IBaseResponse, ZeroOrOneType } from '@/types/common';
import { IMenu, IMenuItem, IMenuItemWithHasChildren, IMenuPageParams } from '@/types/menu';
import { axiosDelete, axiosGet, axiosPost, axiosPut } from '@/utils/http';

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
 * 获取用户允许访问的菜单/权限
 */
export function getAllowMenus () {
  return axiosGet<IMenuItem[], IBasePageResponse<IMenuItem[]>>('/getMenus');
}

/**
 * 获取菜单详情
 * @param id
 * @returns
 */
export function getMenuInfo (id: number) {
  return axiosGet<IMenu, IBaseResponse<IMenu>>(`/menus/${id}`);
}

/**
 * 获取下级菜单
 * @param parentId - 父级菜单 id
 * @returns
 */
export function getMenusByParentId (parentId: number, params?: IBasePageParams) {
  return axiosGet<IMenuItemWithHasChildren[], IBasePageResponse<IMenuItemWithHasChildren[]>>(`/menus/parentId/${parentId}`, { params });
}

/**
 * 编辑菜单
 * @param menu
 */
export function editMenu (menu: IMenuItem) {
  return axiosPut<null>(`/menus/${menu.id}`, menu);
}

/**
 * 删除菜单
 * @param id
 */
export function deleteMenu (id: number) {
  return axiosDelete<null>(`/menus/${id}`);
}

/**
 * 切换菜单显示/隐藏状态
 */
export function toggleMenuIsShow (id: number, isShow: ZeroOrOneType) {
  return axiosPut<null>(`/menus/${id}/show`, { isShow });
}
