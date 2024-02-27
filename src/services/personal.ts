import type { BasePageParams, BasePageResponse, ZeroOrOneType } from '@/types/common'
import type { PersonalBase, PersonalBaseItem, PersonalSkill, PersonalSkillBatchBase, PersonalSkillBatchDelete, PersonalSkillBatchStatus, PersonalSkillItem, PersonalWork, PersonalWorkBatchBase, PersonalWorkBatchDelete, PersonalWorkBatchStatus, PersonalWorkItem } from '@/types/personal'
import { axiosDelete, axiosGet, axiosPost, axiosPut } from '@/utils/http'

/**
 * 获取个人信息-基本信息列表
 */
export function getPersonalBases (params: BasePageParams) {
  return axiosGet<PersonalBaseItem[], BasePageResponse<PersonalBaseItem[]>>('/personal/bases', {
    params
  })
}

/**
 * 获取个人信息-基本信息
 */
export function getPersonalBaseInfo (id: number) {
  return axiosGet<PersonalBaseItem>(`/personal/bases/${id}`)
}

/**
 * 创建个人信息-基本信息
 * @param data
 */
export function createPersonalBase (data: PersonalBase) {
  return axiosPost<null>('/personal/bases', data)
}

/**
 * 编辑个人信息-基本信息
 * @param id
 * @param data
 */
export function editPersonalBase (id: number, data: PersonalBase) {
  return axiosPut<null>(`/personal/bases/${id}`, data)
}

/**
 * 切换个人信息-基本信息显示/隐藏状态
 * @param id
 * @param isShow
 */
export function togglePersonalBaseIsShow (id: number, isShow: ZeroOrOneType) {
  return axiosPut<null>(`/personal/bases/${id}/show`, { isShow })
}

/**
 * 切换个人信息-基本信息默认状态
 * @param id
 * @param isDefault
 */
export function togglePersonalBaseIsDefault (id: number, isDefault: ZeroOrOneType) {
  return axiosPut<null>(`/personal/bases/${id}/default`, { isDefault })
}

/**
 * 删除个人信息-基本信息
 * @param id
 */
export function deletePersonalBase (id: number) {
  return axiosDelete<null>(`/personal/bases/${id}`)
}

/**
 * 获取个人信息-基本信息列表
 */
export function getPersonalSkills (params: BasePageParams) {
  return axiosGet<PersonalSkillItem[], BasePageResponse<PersonalSkillItem[]>>('/personal/skills', {
    params
  })
}

/**
 * 获取个人信息-基本信息
 */
export function getPersonalSkillInfo (id: number) {
  return axiosGet<PersonalSkillItem>(`/personal/skills/${id}`)
}

/**
 * 创建个人信息-个人技能
 * @param data
 */
export function createPersonalSkill (data: PersonalSkill) {
  return axiosPost<null>('/personal/skills', data)
}

/**
 * 编辑个人信息-个人技能
 * @param id
 * @param data
 */
export function editPersonalSkill (id: number, data: PersonalSkill) {
  return axiosPut<null>(`/personal/skills/${id}`, data)
}

/**
 * 切换个人信息-个人技能显示/隐藏状态
 * @param id
 * @param isShow
 */
export function togglePersonalSkillIsShow (id: number, isShow: ZeroOrOneType) {
  return axiosPut<null>(`/personal/skills/${id}/show`, { isShow })
}

/**
 * 删除个人信息-个人技能
 * @param id
 */
export function deletePersonalSkill (id: number) {
  return axiosDelete<null>(`/personal/skills/${id}`)
}

/**
 * 批修改个人技能挂载点
 */
export const personalSkillBatchBase = (data: PersonalSkillBatchBase) => {
  return axiosPost<null>('/personal/skills/batchMount', data)
}

/**
 * 批修改个人技能状态
 */
export const personalSkillBatchStatus = (data: PersonalSkillBatchStatus) => {
  return axiosPost<null>('/personal/skills/batchShow', data)
}

/**
 * 批删除个人技能
 */
export const personalSkillBatchDelete = (data: PersonalSkillBatchDelete) => {
  return axiosPost<null>('/personal/skills/batchDelete', data)
}

/**
 * 获取个人信息-作品集列表
 */
export function getPersonalWorks (params: BasePageParams) {
  return axiosGet<PersonalWorkItem[], BasePageResponse<PersonalWorkItem[]>>('/personal/works', {
    params
  })
}

/**
 * 获取个人信息-作品集
 */
export function getPersonalWorkInfo (id: number) {
  return axiosGet<PersonalWorkItem>(`/personal/works/${id}`)
}

/**
 * 创建个人信息-作品集
 * @param data
 */
export function createPersonalWork (data: PersonalWork) {
  return axiosPost<null>('/personal/works', data)
}

/**
 * 编辑个人信息-作品集
 * @param id
 * @param data
 */
export function editPersonalWork (id: number, data: PersonalWork) {
  return axiosPut<null>(`/personal/works/${id}`, data)
}

/**
 * 切换个人信息-作品集显示/隐藏状态
 * @param id
 * @param isShow
 */
export function togglePersonalWorkIsShow (id: number, isShow: ZeroOrOneType) {
  return axiosPut<null>(`/personal/works/${id}/show`, { isShow })
}

/**
 * 删除个人信息-作品集
 * @param id
 */
export function deletePersonalWork (id: number) {
  return axiosDelete<null>(`/personal/works/${id}`)
}

/**
 * 批修改作品集挂载点
 */
export const personalWorkBatchBase = (data: PersonalWorkBatchBase) => {
  return axiosPost<null>('/personal/works/batchMount', data)
}

/**
 * 批修改作品集状态
 */
export const personalWorkBatchStatus = (data: PersonalWorkBatchStatus) => {
  return axiosPost<null>('/personal/works/batchShow', data)
}

/**
 * 批删除作品集
 */
export const personalWorkBatchDelete = (data: PersonalWorkBatchDelete) => {
  return axiosPost<null>('/personal/works/batchDelete', data)
}
