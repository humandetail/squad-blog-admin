import { IBasePageResponse, IBaseParams, ZeroOrOneType } from '@/types/common';
import { IPicture, IPictureItem } from '@/types/picture';
import { axiosDelete, axiosGet, axiosPost, axiosPut } from '@/utils/http';

/**
 * 获取图片列表
 */
export function getPictures (params: IBaseParams) {
  return axiosGet<IPictureItem[], IBasePageResponse<IPictureItem[]>>('/pictures', {
    params
  });
}

/**
 * 获取图片详情
 */
export function getPictureInfo (id: number) {
  return axiosGet<IPictureItem>(`/pictures/${id}`);
}

/**
 * 新增图片
 */
export function createPicture (data: IPicture) {
  const fd = new FormData();
  fd.append('file', (data.file as any).originFileObj);
  for (const [key, value] of Object.entries(data)) {
    if (key !== 'file') {
      fd.append(key, value);
    }
  }
  return axiosPost<null>('/pictures', fd);
}

/**
 * 修改图片信息
 */
export function editPicture (id: number, data: IPicture) {
  const fd = new FormData();
  if (data.file) {
    fd.append('file', (data.file as any).originFileObj);
  }
  for (const [key, value] of Object.entries(data)) {
    if (key !== 'file') {
      fd.append(key, value);
    }
  }
  return axiosPut<null>(`/pictures/${id}`, fd);
}

/**
 * 更改图片的显示状态
 */
export const togglePictureIsShow = (id: number, isShow: ZeroOrOneType) => {
  return axiosPut<null>(`/pictures/${id}/show`, { isShow });
}

/**
 * 删除图片
 */
export function deletePicture (id: number) {
  return axiosDelete<null>(`/pictures/${id}`);
}
