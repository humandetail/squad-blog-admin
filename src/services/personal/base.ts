import { IBasePageParams, IBasePageResponse, ZeroOrOneType } from '@/types/common';
import { IPersonalBase, IPersonalBaseItem } from '@/types/personalBase';
import { axiosDelete, axiosGet, axiosPost, axiosPut } from '@/utils/http';

/**
 * 获取个人信息-基本信息列表
 */
export function getPersonalBases (params: IBasePageParams) {
  return axiosGet<IPersonalBaseItem[], IBasePageResponse<IPersonalBaseItem[]>>('/personal/bases', {
    params
  });
}

/**
 * 获取个人信息-基本信息
 */
export function getPersonalBaseInfo (id: number) {
  return axiosGet<IPersonalBaseItem>(`/personal/bases/${id}`);
}

/**
 * 创建个人信息-基本信息
 * @param data
 */
export function createPersonalBase (data: IPersonalBase) {
  return axiosPost<null>('/personal/bases', data);
}

/**
 * 编辑个人信息-基本信息
 * @param id
 * @param data
 */
export function editPersonalBase (id: number, data: IPersonalBase) {
  return axiosPut<null>(`/personal/bases/${id}`, data);
}

/**
 * 切换个人信息-基本信息显示/隐藏状态
 * @param id
 * @param isShow
 */
export function togglePersonalBaseIsShow (id: number, isShow: ZeroOrOneType) {
  return axiosPut<null>(`/personal/bases/${id}/show`, { isShow });
}

/**
 * 切换个人信息-基本信息默认状态
 * @param id
 * @param isDefault
 */
export function togglePersonalBaseIsDefault (id: number, isDefault: ZeroOrOneType) {
  return axiosPut<null>(`/personal/bases/${id}/default`, { isDefault });
}

/**
 * 删除个人信息-基本信息
 * @param id
 */
export function deletePersonalBase (id: number) {
  return axiosDelete<null>(`/personal/bases/${id}`);
}
