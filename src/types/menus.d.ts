import type { BasePageParams, BaseParams, BaseResponse, BaseResponseItem } from './common'

export interface Menu extends BaseParams {
  parentId: number
  name: string
  type: number
  router?: string
  permission?: string
  path?: string
  icon?: string
  isCache?: number
}

export interface MenuItem extends BaseResponseItem {
  parentId: number
  name: string
  type: number
  router: string
  permission: string
  path: string
  icon: string
  isCache: number
  hasChildren?: boolean
  children?: MenuItem[]
}

export interface MenuItemWithHasChildren extends MenuItem {
  hasChildren: boolean
}

export interface MenuPageParams extends BasePageParams {
  keyword?: string
  isAll?: number
}

export interface MenuInfo extends BaseResponse {
  parentId: number
  name: string
  type: number
  router: string
  permission: string
  path: string
  icon: string
  isCache: number
}

export interface MenuChain {
  id: number
  parentId: number
  title: string
  router: string
  icon: string
}
