import { IBasePageParams, IBasePageResponse, IBaseResponse, ZeroOrOneType } from '@/types/common';
import { IPostTag, IPostTagItem } from '@/types/postTag';
import { axiosDelete, axiosGet, axiosPost, axiosPut } from '@/utils/http';

/**
 * 获取文章标签列表
 */
export const getPostTags = (params: IBasePageParams) => {
  return axiosGet<IPostTagItem[], IBasePageResponse<IPostTagItem[]>>('/tags', {
    params
  });
}

/**
 * 获取文章标签详情
 */
export const getPostTagInfo = (id: number) => {
  return axiosGet<IPostTagItem, IBaseResponse>(`/tags/${id}`);
}

/**
 * 添加文章标签
 */
export const createPostTag = (data: IPostTag) => {
  return axiosPost<null>('/tags', data);
}

/**
 * 编辑文章标签
 */
export const editPostTag = (id: number, data: IPostTag) => {
  return axiosPut<null>(`/tags/${id}`, data);
}

/**
 * 更改文章标签的显示状态
 */
export const togglePostTagIsShow = (id: number, isShow: ZeroOrOneType) => {
  return axiosPut<null>(`/tags/${id}/show`, { isShow });
}

/**
 * 删除文章标签
 */
export const deletePostTag = (id: number) => {
  return axiosDelete<null>(`/tags/${id}`);
}
