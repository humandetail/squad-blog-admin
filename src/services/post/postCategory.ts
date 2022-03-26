import { IBasePageParams, IBasePageResponse, IBaseResponse, ZeroOrOneType } from '@/types/common';
import { IPostCategory, IPostCategoryItem } from '@/types/postCategory';
import { axiosDelete, axiosGet, axiosPost, axiosPut } from '@/utils/http';

/**
 * 获取文章分类列表
 */
export const getPostCategories = (params: IBasePageParams) => {
  return axiosGet<IPostCategoryItem[], IBasePageResponse<IPostCategoryItem[]>>('/categories', {
    params
  });
}

/**
 * 获取文章分类详情
 */
export const getPostCategoryInfo = (id: number) => {
  return axiosGet<IPostCategoryItem, IBaseResponse>(`/categories/${id}`);
}

/**
 * 添加文章分类
 */
export const createPostCategory = (data: IPostCategory) => {
  return axiosPost<null>('/categories', data);
}

/**
 * 编辑文章分类
 */
export const editPostCategory = (id: number, data: IPostCategory) => {
  return axiosPut<null>(`/categories/${id}`, data);
}

/**
 * 更改文章分类的显示状态
 */
export const togglePostCategoryIsShow = (id: number, isShow: ZeroOrOneType) => {
  return axiosPut<null>(`/categories/${id}/show`, { isShow });
}

/**
 * 删除文章分类
 */
export const deletePostCategory = (id: number) => {
  return axiosDelete<null>(`/categories/${id}`);
}
