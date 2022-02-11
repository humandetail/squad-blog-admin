import { IBasePageParams, IBasePageResponse, IBaseResponse, ZeroOrOneType } from '@/types/common';
import { IPictureCategory, IPictureCategoryItem } from '@/types/pictureCategory';
import { axiosDelete, axiosGet, axiosPost, axiosPut } from '@/utils/http';

/**
 * 获取图片分类列表
 */
export const getPictureCategories = (params: IBasePageParams) => {
  return axiosGet<IPictureCategoryItem[], IBasePageResponse<IPictureCategoryItem[]>>('/pictureCategories', {
    params
  });
}

/**
 * 获取图片分类详情
 */
export const getPictureCategoryInfo = (id: number) => {
  return axiosGet<IPictureCategoryItem, IBaseResponse>(`/pictureCategories/${id}`);
}

/**
 * 添加图片分类
 */
export const createPictureCategory = (data: IPictureCategory) => {
  return axiosPost<null>('/pictureCategories', data);
}

/**
 * 编辑图片分类
 */
export const editPictureCategory = (id: number, data: IPictureCategory) => {
  return axiosPut<null>(`/pictureCategories/${id}`, data);
}

/**
 * 更改图片分类的显示状态
 */
export const togglePictureCategoryIsShow = (id: number, isShow: ZeroOrOneType) => {
  return axiosPut<null>(`/pictureCategories/${id}/show`, { isShow });
}

/**
 * 删除图片分类
 */
export const deletePictureCategory = (id: number) => {
  return axiosDelete<null>(`/pictureCategories/${id}`);
}
