import { IBasePageResponse, ZeroOrOneType } from '@/types/common';
import { IRole, IRoleItem, IRolePageParams } from '@/types/role';
import { axiosDelete, axiosGet, axiosPost, axiosPut } from '@/utils/http';

/**
 * 创建角色
 * @param data
 */
export function createRole (data: IRole) {
  return axiosPost<null>('/roles', data);
}

/**
 * 获取角色详情
 * @param params
 */
export function getRoleInfo (id: number) {
  return axiosGet<IRoleItem>(`/roles/${id}`);
}

/**
 * 获取角色列表
 * @param params
 */
export function getRoles (params: IRolePageParams) {
  return axiosGet<IRoleItem[], IBasePageResponse>('/roles', { params });
}

/**
 * 删除角色
 * @param id
 */
export function deleteRole (id: number) {
  return axiosDelete<null>(`/roles/${id}`);
}

/**
 * @param id 角色 id
 * @param menus 菜单/权限 id 集合
 */
export function authorizations (id: number, menus: number[]) {
  return axiosPut<null>(`/roles/${id}/authorizations`, { menus });
}

/**
 * 编辑角色
 * @param role
 */
export function editRole (role: IRole) {
  return axiosPut<null>(`/roles/${role.id}`, role);
}

/**
 * 切换角色显示/隐藏状态
 */
export function toggleRoleIsShow (id: number, isShow: ZeroOrOneType) {
  return axiosPut<null>(`/roles/${id}/show`, { isShow });
}
