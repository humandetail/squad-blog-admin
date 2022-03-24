import { ISetting, ISettingItem } from '@/types/setting';
import { axiosGet, axiosPut } from '@/utils/http';

export function getSettingInfo () {
  return axiosGet<ISettingItem>('/setting');
}

export function editSetting (data: ISetting) {
  return axiosPut<null>('/setting', data);
}
