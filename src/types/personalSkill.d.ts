import { IBaseParams, IBaseResponseItem, ZeroOrOneType } from './common';

export interface IPersonalSkillItem extends IBaseResponseItem{
  name: string;
  description: string;
  iconId: number;
  iconPic: string;
  baseId: number;
  baseNickname: string;
}

export interface IPersonalSkill extends IBaseParams {
  name: string;
  description: string;
  iconId: number;
  baseId: number;
}

export interface IPersonalSkillBatchBase {
  baseId: number;
  newBaseId: number;
  isAll?: boolean;
  ids?: string[];
}

export interface IPersonalSkillBatchStatus {
  isShow: ZeroOrOneType;
  isAll?: boolean;
  ids?: string[];
}

export interface IPersonalSkillBatchDelete {
  ids: string[];
}
