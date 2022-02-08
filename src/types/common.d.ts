export type ZeroOrOneType = 0 | 1;
export interface IBaseResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

export interface IBasePageResponse<T = any> extends IBaseResponse {
  data: {
    current: number;
    pageSize: number;
    total: number;
    records: T
  }
}

export interface IBaseResponseItem {
  id: number;
  sort: number;
  isShow: ZeroOrOneType;
  operator: string;
  createdTime: string;
  updatedTime: string;
}

export interface IBaseParams {
  sort?: number;
  isShow?: number;
}

export interface IBasePageParams {
  isShow?: number;
  current?: number;
  pageSize?: number;
  sortField?: string;
  sortDesc?: number;
}

export type RecordType = Record<string, any>;

export type OperationButtonType = 'default' | 'primary' | 'danger' | 'success';

export interface IPopConfirm {
  title?: string;
  okText?: string;
  cancelText?: string;
  icon?: string;
}
export interface IOperationButtonProps {
  text: string;
  icon?: string;
  type?: OperationButtonType;
  handler?: Function,
  record?: any;
  popConfirm?: IPopConfirm;
}
