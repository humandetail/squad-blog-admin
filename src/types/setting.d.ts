import { EWebsiteStatus } from '@/config/constants';
import { IBaseParams, IBaseResponseItem } from './common';

export interface ISettingItem extends IBaseResponseItem{
  siteName: string;
  seoTitle: string;
  seoKeywords: string;
  seoDescription: string;
  status: EWebsiteStatus;
  logoId: number;
  logoPic: string;
}

export interface ISetting extends IBaseParams {
  siteName: string;
  seoTitle: string;
  seoKeywords: string;
  seoDescription: string;
  status: EWebsiteStatus;
  logoId: number;
}
