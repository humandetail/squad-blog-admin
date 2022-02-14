import { IBlogroll, IBlogrollItem } from '@/types/blogroll';
import { IBasePageParams, IBasePageResponse, ZeroOrOneType } from '@/types/common';
import { axiosDelete, axiosGet, axiosPost, axiosPut } from '@/utils/http';

/**
 * 获取友情链接列表
 */
export function getBlogrolls (params: IBasePageParams) {
  return axiosGet<IBlogrollItem[], IBasePageResponse<IBlogrollItem[]>>('/blogrolls', {
    params
  });
}

/**
 * 获取友情链接信息
 */
export function getBlogrollInfo (id: number) {
  return axiosGet<IBlogroll>(`/blogrolls/${id}`);
}

/**
 * 创建友情链接
 * @param data
 */
export function createBlogroll (data: IBlogroll) {
  return axiosPost<null>('/blogrolls', data);
}

/**
 * 编辑友情链接
 * @param id
 * @param data
 */
export function editBlogroll (id: number, data: IBlogroll) {
  return axiosPut<null>(`/blogrolls/${id}`, data);
}

/**
 * 切换友情链接显示/隐藏状态
 * @param id
 * @param isShow
 */
export function toggleBlogrollIsShow (id: number, isShow: ZeroOrOneType) {
  return axiosPut<null>(`/blogrolls/${id}/show`, { isShow });
}

/**
 * 删除友情链接
 * @param id
 */
export function deleteBlogroll (id: number) {
  return axiosDelete<null>(`/blogrolls/${id}`);
}
