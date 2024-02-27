import type { BasePageParams, BaseParams, BaseResponseItem } from './common'
import type { MenuItem } from './menu'

export interface Role extends BaseParams {
  id?: number
  name: string
  remarks: string
}

export interface RoleItem extends BaseResponseItem {
  name: string
  remarks: string
  isAdmin: boolean
  menus: MenuItem[]
}

export interface RolePageParams extends BasePageParams {
}
