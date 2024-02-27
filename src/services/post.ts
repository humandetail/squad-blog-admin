import { type BasePageParams, type BasePageResponse, type BaseResponse, type ZeroOrOneType } from '@/types/common'
import { type PostCategory, type PostCategoryItem, type PostTag, type PostTagItem, type Post, type PostBatchCategory, type PostBatchDelete, type PostBatchStatus, type PostBatchTag, type PostBatchTemplate, type PostItem } from '@/types/post'
import { axiosDelete, axiosGet, axiosPost, axiosPut } from '@/utils/http'

/**
 * 获取文章列表
 */
export const getPosts = (params: BasePageParams) => {
  return axiosGet<PostItem[], BasePageResponse<PostItem[]>>('/posts', {
    params
  })
}

/**
 * 获取文章详情
 */
export const getPostInfo = (id: string) => {
  return axiosGet<PostItem, BaseResponse>(`/posts/${id}`)
}

/**
 * 添加文章
 */
export const createPost = (data: Post) => {
  return axiosPost<null>('/posts', data)
}

/**
 * 编辑文章
 */
export const editPost = (id: string, data: Post) => {
  return axiosPut<null>(`/posts/${id}`, data)
}

/**
 * 更改文章的显示状态
 */
export const togglePostIsShow = (id: number, isShow: ZeroOrOneType) => {
  return axiosPut<null>(`/posts/${id}/show`, { isShow })
}

/**
 * 删除文章
 */
export const deletePost = (id: number) => {
  return axiosDelete<null>(`/posts/${id}`)
}

/**
 * 批修改文章分类
 */
export const postBatchCategory = (data: PostBatchCategory) => {
  return axiosPost<null>('/posts/batchCategory', data)
}

/**
 * 批修改文章标签
 */
export const postBatchTag = (data: PostBatchTag) => {
  return axiosPost<null>('/posts/batchTag', data)
}

/**
 * 批修改文章模板
 */
export const postBatchTemplate = (data: PostBatchTemplate) => {
  return axiosPost<null>('/posts/batchTemplate', data)
}

/**
 * 批修改文章状态
 */
export const postBatchStatus = (data: PostBatchStatus) => {
  return axiosPost<null>('/posts/batchShow', data)
}

/**
 * 批删除文章
 */
export const postBatchDelete = (data: PostBatchDelete) => {
  return axiosPost<null>('/posts/batchDelete', data)
}

/**
 * 获取文章分类列表
 */
export const getPostCategories = (params: BasePageParams) => {
  return axiosGet<PostCategoryItem[], BasePageResponse<PostCategoryItem[]>>('/categories', {
    params
  })
}

/**
 * 获取文章分类详情
 */
export const getPostCategoryInfo = (id: number) => {
  return axiosGet<PostCategoryItem, BaseResponse>(`/categories/${id}`)
}

/**
 * 添加文章分类
 */
export const createPostCategory = (data: PostCategory) => {
  return axiosPost<null>('/categories', data)
}

/**
 * 编辑文章分类
 */
export const editPostCategory = (id: number, data: PostCategory) => {
  return axiosPut<null>(`/categories/${id}`, data)
}

/**
 * 更改文章分类的显示状态
 */
export const togglePostCategoryIsShow = (id: number, isShow: ZeroOrOneType) => {
  return axiosPut<null>(`/categories/${id}/show`, { isShow })
}

/**
 * 删除文章分类
 */
export const deletePostCategory = (id: number) => {
  return axiosDelete<null>(`/categories/${id}`)
}

/**
 * 获取文章标签列表
 */
export const getPostTags = (params: BasePageParams) => {
  return axiosGet<PostTagItem[], BasePageResponse<PostTagItem[]>>('/tags', {
    params
  })
}

/**
 * 获取文章标签详情
 */
export const getPostTagInfo = (id: number) => {
  return axiosGet<PostTagItem, BaseResponse>(`/tags/${id}`)
}

/**
 * 添加文章标签
 */
export const createPostTag = (data: PostTag) => {
  return axiosPost<null>('/tags', data)
}

/**
 * 编辑文章标签
 */
export const editPostTag = (id: number, data: PostTag) => {
  return axiosPut<null>(`/tags/${id}`, data)
}

/**
 * 更改文章标签的显示状态
 */
export const togglePostTagIsShow = (id: number, isShow: ZeroOrOneType) => {
  return axiosPut<null>(`/tags/${id}/show`, { isShow })
}

/**
 * 删除文章标签
 */
export const deletePostTag = (id: number) => {
  return axiosDelete<null>(`/tags/${id}`)
}
