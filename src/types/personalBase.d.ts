import { IBaseParams, IBaseResponseItem, ZeroOrOneType } from './common';

export interface IPersonalBaseItem extends IBaseResponseItem{
  nickname: string;
  qq: string;
  blog: string;
  github: string;
  email: string;
  intro: string;
  isDefault: ZeroOrOneType;
  isShowSkills: ZeroOrOneType;
  isShowWorks: ZeroOrOneType;
  avatarId: number;
  avatarPic: string;
  userId: number;
  username: string;
}

export interface IPersonalBase extends IBaseParams {
  nickname: string;
  qq?: string;
  blog?: string;
  github?: string;
  email?: string;
  intro?: string;
  isDefault?: ZeroOrOneType;
  isShowSkills?: ZeroOrOneType;
  isShowWorks?: ZeroOrOneType;
  avatarId?: number;
}

export type SelectedPersonalBase = {
  baseId: number;
  baseNickname: string;
}
