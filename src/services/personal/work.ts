import { IBasePageParams, IBasePageResponse, ZeroOrOneType } from '@/types/common';
import { IPersonalWork, IPersonalWorkBatchBase, IPersonalWorkBatchDelete, IPersonalWorkBatchStatus, IPersonalWorkItem } from '@/types/personalWork';
import { axiosDelete, axiosGet, axiosPost, axiosPut } from '@/utils/http';

/**
 * 获取个人信息-作品集列表
 */
export function getPersonalWorks (params: IBasePageParams) {
  return axiosGet<IPersonalWorkItem[], IBasePageResponse<IPersonalWorkItem[]>>('/personal/works', {
    params
  });
}

/**
 * 获取个人信息-作品集
 */
export function getPersonalWorkInfo (id: number) {
  return axiosGet<IPersonalWorkItem>(`/personal/works/${id}`);
}

/**
 * 创建个人信息-作品集
 * @param data
 */
export function createPersonalWork (data: IPersonalWork) {
  return axiosPost<null>('/personal/works', data);
}

/**
 * 编辑个人信息-作品集
 * @param id
 * @param data
 */
export function editPersonalWork (id: number, data: IPersonalWork) {
  return axiosPut<null>(`/personal/works/${id}`, data);
}

/**
 * 切换个人信息-作品集显示/隐藏状态
 * @param id
 * @param isShow
 */
export function togglePersonalWorkIsShow (id: number, isShow: ZeroOrOneType) {
  return axiosPut<null>(`/personal/works/${id}/show`, { isShow });
}

/**
 * 删除个人信息-作品集
 * @param id
 */
export function deletePersonalWork (id: number) {
  return axiosDelete<null>(`/personal/works/${id}`);
}

/**
 * 批修改作品集挂载点
 */
export const personalWorkBatchBase = (data: IPersonalWorkBatchBase) => {
  return axiosPost<null>('/personal/works/batchMount', data);
}

/**
 * 批修改作品集状态
 */
export const personalWorkBatchStatus = (data: IPersonalWorkBatchStatus) => {
  return axiosPost<null>('/personal/works/batchShow', data);
}

/**
 * 批删除作品集
 */
export const personalWorkBatchDelete = (data: IPersonalWorkBatchDelete) => {
  return axiosPost<null>('/personal/works/batchDelete', data);
}
