import type { BaseParams, BaseResponseItem, ZeroOrOneType } from './common'

export interface PersonalBaseItem extends BaseResponseItem {
  nickname: string
  qq: string
  blog: string
  github: string
  email: string
  intro: string
  isDefault: ZeroOrOneType
  isShowSkills: ZeroOrOneType
  isShowWorks: ZeroOrOneType
  avatarId: number
  avatarPic: string
  userId: number
  username: string
}

export interface PersonalBase extends BaseParams {
  nickname: string
  qq?: string
  blog?: string
  github?: string
  email?: string
  intro?: string
  isDefault?: ZeroOrOneType
  isShowSkills?: ZeroOrOneType
  isShowWorks?: ZeroOrOneType
  avatarId?: number
}

export interface SelectedPersonalBase {
  baseId: number
  baseNickname: string
}

export interface PersonalSkillItem extends BaseResponseItem {
  name: string
  description: string
  iconId: number
  iconPic: string
  baseId: number
  baseNickname: string
}

export interface PersonalSkill extends BaseParams {
  name: string
  description: string
  iconId: number
  baseId: number
}

export interface PersonalSkillBatchBase {
  baseId: number
  newBaseId: number
  isAll?: boolean
  ids?: string[]
}

export interface PersonalSkillBatchStatus {
  isShow: ZeroOrOneType
  isAll?: boolean
  ids?: string[]
}

export interface PersonalSkillBatchDelete {
  ids: string[]
}

export interface PersonalWorkPicture {
  id: number
  url: string
}

export interface PersonalWorkItem extends BaseResponseItem {
  name: string
  link: string
  description: string
  baseId: number
  baseNickname: string
  pictures: PersonalWorkPicture[]
}

export interface PersonalWork extends BaseParams {
  name: string
  link: string
  description: string
  baseId: number
  pictures: number[]
}

export interface PersonalWorkBatchBase {
  baseId: number
  newBaseId: number
  isAll?: boolean
  ids?: string[]
}

export interface PersonalWorkBatchStatus {
  isShow: ZeroOrOneType
  isAll?: boolean
  ids?: string[]
}

export interface PersonalWorkBatchDelete {
  ids: string[]
}
