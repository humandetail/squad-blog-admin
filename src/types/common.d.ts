export type ZeroOrOneType = 0 | 1

export type Noop = (...args: any[]) => void

export interface BaseResponse<T = any> {
  code: number
  data: T
  message: string
}

export interface BasePageResponse<T = any> extends BaseResponse {
  data: {
    current: number
    pageSize: number
    total: number
    records: T
  }
}

export interface BaseResponseItem {
  id: number
  sort: number
  isShow: ZeroOrOneType
  operator: string
  createdTime: string
  updatedTime: string
}

export interface BaseParams {
  sort?: number
  isShow?: number
}

export interface BasePageParams {
  keyword?: string
  isShow?: number
  current?: number
  pageSize?: number
  sortField?: string
  sortDesc?: number
}

export type RecordType = Record<string, any>

export type OperationButtonType = 'default' | 'primary' | 'danger' | 'success'

export interface PopConfirm {
  title?: string
  okText?: string
  cancelText?: string
  icon?: string
}
export interface OperationButtonProps {
  text: string
  icon?: string
  type?: OperationButtonType
  handler?: Noop
  record?: any
  popConfirm?: PopConfirm
}
