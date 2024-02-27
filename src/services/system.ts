import { type BasePageParams, type BasePageResponse, type BaseResponse, type ZeroOrOneType } from '@/types/common'
import { type Menu, type MenuItem, type MenuItemWithHasChildren, type MenuPageParams } from '@/types/menus'
import { type Role, type RoleItem, type RolePageParams } from '@/types/role'
import { type ChangePasswordParams, type UserInfo, type UserManage, type RegisterUserType, type LoginParams } from '@/types/user'
import { axiosDelete, axiosGet, axiosPost, axiosPut } from '@/utils/http'
import { encryptPassword } from '@/utils/tools'

/**
 * 创建菜单
 * @param data - 菜单信息
 * @returns null
 */
export function createMenu (data: Menu) {
  return axiosPost<null>('/menus', data)
}

/**
 * 获取菜单列表
 * @param params
 * @returns
 */
export function getMenus (params: MenuPageParams) {
  return axiosGet<MenuItem[], BasePageResponse<MenuItem[]>>('/menus', { params })
}

/**
 * 获取用户允许访问的菜单/权限
 */
export function getAllowMenus () {
  return axiosGet<MenuItem[], BasePageResponse<MenuItem[]>>('/getMenus')
}

/**
 * 获取菜单详情
 * @param id
 * @returns
 */
export function getMenuInfo (id: number) {
  return axiosGet<Menu, BaseResponse<Menu>>(`/menus/${id}`)
}

/**
 * 获取下级菜单
 * @param parentId - 父级菜单 id
 * @returns
 */
export function getMenusByParentId (parentId: number, params?: BasePageParams) {
  return axiosGet<MenuItemWithHasChildren[], BasePageResponse<MenuItemWithHasChildren[]>>(`/menus/parentId/${parentId}`, { params })
}

/**
 * 编辑菜单
 * @param menu
 */
export function editMenu (menu: MenuItem) {
  return axiosPut<null>(`/menus/${menu.id}`, menu)
}

/**
 * 删除菜单
 * @param id
 */
export function deleteMenu (id: number) {
  return axiosDelete<null>(`/menus/${id}`)
}

/**
 * 切换菜单显示/隐藏状态
 */
export function toggleMenuIsShow (id: number, isShow: ZeroOrOneType) {
  return axiosPut<null>(`/menus/${id}/show`, { isShow })
}

/**
 * 创建角色
 * @param data
 */
export function createRole (data: Role) {
  return axiosPost<null>('/roles', data)
}

/**
 * 获取角色详情
 * @param params
 */
export function getRoleInfo (id: number) {
  return axiosGet<RoleItem>(`/roles/${id}`)
}

/**
 * 获取角色列表
 * @param params
 */
export function getRoles (params: RolePageParams) {
  return axiosGet<RoleItem[], BasePageResponse>('/roles', { params })
}

/**
 * 删除角色
 * @param id
 */
export function deleteRole (id: number) {
  return axiosDelete<null>(`/roles/${id}`)
}

/**
 * @param id 角色 id
 * @param menus 菜单/权限 id 集合
 */
export function authorizations (id: number, menus: number[]) {
  return axiosPut<null>(`/roles/${id}/authorizations`, { menus })
}

/**
 * 编辑角色
 * @param role
 */
export function editRole (role: Role) {
  return axiosPut<null>(`/roles/${role.id}`, role)
}

/**
 * 切换角色显示/隐藏状态
 */
export function toggleRoleIsShow (id: number, isShow: ZeroOrOneType) {
  return axiosPut<null>(`/roles/${id}/show`, { isShow })
}

/**
 * 用户登录
 * @param data - 用户登录信息
 * @returns token
 */
export function login ({ username, password }: LoginParams) {
  return axiosPost<string>('/login', {
    username,
    password: encryptPassword(password)
  })
}

/**
 * 退出登录
 * @returns null
 */
export function logout () {
  return axiosGet('/logout')
}

/**
 * 获取用户信息
 * @returns 用户信息
 */
export function getUserInfo () {
  return axiosGet<UserInfo>('/getUserInfo')
}

/**
 * 修改用户密码
 */
export function changePassword (id: string, data: ChangePasswordParams) {
  return axiosPut(`/users/${id}/password`, data)
}

/**
 * 获取用户列表
 */
export function getUsers (params: BasePageParams) {
  return axiosGet<UserInfo[], BasePageResponse>('/users', { params })
}

/**
 * 用户注册
 */
export function registerUser (data: RegisterUserType) {
  return axiosPost<null>('/users', data)
}

/**
 * 用户管理：分配角色、锁定、解锁用户
 * @param id 用户 id
 * @param data
 */
export function userManage (id: string, { isLock, roleId }: UserManage) {
  return axiosPut<null>(`/users/${id}/manage`, isLock ? { isLock } : { roleId })
}

/**
 * 删除用户
 */
export function deleteUser (id: string) {
  return axiosDelete<null>(`/users/${id}`)
}
