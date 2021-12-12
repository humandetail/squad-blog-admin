export interface IBaseResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

export interface IBasePageResponse<T = any> {
  code: number;
  data: {
    current: number;
    pageSize: number;
    total: number;
    records: T
  },
  message: string;
}

export interface IBaseResponseItem {
  id: number;
  sort: number;
  isShow: number;
  operator: string;
  createdTime: string;
  updatedTime: string;
}
