import { IBasePageParams, IBasePageResponse, ZeroOrOneType } from '@/types/common';
import { IPersonalSkill, IPersonalSkillBatchBase, IPersonalSkillBatchDelete, IPersonalSkillBatchStatus, IPersonalSkillItem } from '@/types/personalSkill';
import { axiosDelete, axiosGet, axiosPost, axiosPut } from '@/utils/http';

/**
 * 获取个人信息-基本信息列表
 */
export function getPersonalSkills (params: IBasePageParams) {
  return axiosGet<IPersonalSkillItem[], IBasePageResponse<IPersonalSkillItem[]>>('/personal/skills', {
    params
  });
}

/**
 * 获取个人信息-基本信息
 */
export function getPersonalSkillInfo (id: number) {
  return axiosGet<IPersonalSkillItem>(`/personal/skills/${id}`);
}

/**
 * 创建个人信息-个人技能
 * @param data
 */
export function createPersonalSkill (data: IPersonalSkill) {
  return axiosPost<null>('/personal/skills', data);
}

/**
 * 编辑个人信息-个人技能
 * @param id
 * @param data
 */
export function editPersonalSkill (id: number, data: IPersonalSkill) {
  return axiosPut<null>(`/personal/skills/${id}`, data);
}

/**
 * 切换个人信息-个人技能显示/隐藏状态
 * @param id
 * @param isShow
 */
export function togglePersonalSkillIsShow (id: number, isShow: ZeroOrOneType) {
  return axiosPut<null>(`/personal/skills/${id}/show`, { isShow });
}

/**
 * 删除个人信息-个人技能
 * @param id
 */
export function deletePersonalSkill (id: number) {
  return axiosDelete<null>(`/personal/skills/${id}`);
}

/**
 * 批修改个人技能挂载点
 */
export const personalSkillBatchBase = (data: IPersonalSkillBatchBase) => {
  return axiosPost<null>('/personal/skills/batchMount', data);
}

/**
 * 批修改个人技能状态
 */
export const personalSkillBatchStatus = (data: IPersonalSkillBatchStatus) => {
  return axiosPost<null>('/personal/skills/batchShow', data);
}

/**
 * 批删除个人技能
 */
export const personalSkillBatchDelete = (data: IPersonalSkillBatchDelete) => {
  return axiosPost<null>('/personal/skills/batchDelete', data);
}
