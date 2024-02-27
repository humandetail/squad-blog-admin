import { type Setting, type SettingItem } from '@/types/setting'
import { axiosGet, axiosPut } from '@/utils/http'

export function getSettingInfo () {
  return axiosGet<SettingItem>('/setting')
}

export function editSetting (data: Setting) {
  return axiosPut<null>('/setting', data)
}
