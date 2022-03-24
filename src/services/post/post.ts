import { IBasePageParams, IBasePageResponse, IBaseResponse, ZeroOrOneType } from '@/types/common';
import { IPost, IPostBatchCategory, IPostBatchDelete, IPostBatchStatus, IPostBatchTag, IPostBatchTemplate, IPostItem } from '@/types/post';
import { axiosDelete, axiosGet, axiosPost, axiosPut } from '@/utils/http';

/**
 * 获取文章列表
 */
export const getPosts = (params: IBasePageParams) => {
  return axiosGet<IPostItem[], IBasePageResponse<IPostItem[]>>('/posts', {
    params
  });
}

/**
 * 获取文章详情
 */
export const getPostInfo = (id: string) => {
  return axiosGet<IPostItem, IBaseResponse>(`/posts/${id}`);
}

/**
 * 添加文章
 */
export const createPost = (data: IPost) => {
  return axiosPost<null>('/posts', data);
}

/**
 * 编辑文章
 */
export const editPost = (id: string, data: IPost) => {
  return axiosPut<null>(`/posts/${id}`, data);
}

/**
 * 更改文章的显示状态
 */
export const togglePostIsShow = (id: number, isShow: ZeroOrOneType) => {
  return axiosPut<null>(`/posts/${id}/show`, { isShow });
}

/**
 * 删除文章
 */
export const deletePost = (id: number) => {
  return axiosDelete<null>(`/posts/${id}`);
}

/**
 * 批修改文章分类
 */
export const postBatchCategory = (data: IPostBatchCategory) => {
  return axiosPost<null>('/posts/batchCategory', data);
}

/**
 * 批修改文章标签
 */
export const postBatchTag = (data: IPostBatchTag) => {
  return axiosPost<null>('/posts/batchTag', data);
}

/**
 * 批修改文章模板
 */
export const postBatchTemplate = (data: IPostBatchTemplate) => {
  return axiosPost<null>('/posts/batchTemplate', data);
}

/**
 * 批修改文章状态
 */
export const postBatchStatus = (data: IPostBatchStatus) => {
  return axiosPost<null>('/posts/batchShow', data);
}

/**
 * 批删除文章
 */
export const postBatchDelete = (data: IPostBatchDelete) => {
  return axiosPost<null>('/posts/batchDelete', data);
}
