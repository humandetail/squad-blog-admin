import { type Blogroll, type BlogrollItem } from '@/types/blogroll'
import { type BaseParams, type BaseResponse, type BasePageParams, type BasePageResponse, type ZeroOrOneType } from '@/types/common'
import { type PictureItem, type Picture, type PictureCategoryItem, type PictureCategory } from '@/types/picture'
import { type TemplateItem, type Template } from '@/types/template'
import { axiosDelete, axiosGet, axiosPost, axiosPut } from '@/utils/http'

/**
 * 获取友情链接列表
 */
export function getBlogrolls (params: BasePageParams) {
  return axiosGet<BlogrollItem[], BasePageResponse<BlogrollItem[]>>('/blogrolls', {
    params
  })
}

/**
 * 获取友情链接信息
 */
export function getBlogrollInfo (id: number) {
  return axiosGet<Blogroll>(`/blogrolls/${id}`)
}

/**
 * 创建友情链接
 * @param data
 */
export function createBlogroll (data: Blogroll) {
  return axiosPost<null>('/blogrolls', data)
}

/**
 * 编辑友情链接
 * @param id
 * @param data
 */
export function editBlogroll (id: number, data: Blogroll) {
  return axiosPut<null>(`/blogrolls/${id}`, data)
}

/**
 * 切换友情链接显示/隐藏状态
 * @param id
 * @param isShow
 */
export function toggleBlogrollIsShow (id: number, isShow: ZeroOrOneType) {
  return axiosPut<null>(`/blogrolls/${id}/show`, { isShow })
}

/**
 * 删除友情链接
 * @param id
 */
export function deleteBlogroll (id: number) {
  return axiosDelete<null>(`/blogrolls/${id}`)
}

/**
 * 获取图片列表
 */
export function getPictures (params: BaseParams & { categoryId?: number }) {
  return axiosGet<PictureItem[], BasePageResponse<PictureItem[]>>('/pictures', {
    params
  })
}

/**
 * 获取图片详情
 */
export function getPictureInfo (id: number) {
  return axiosGet<PictureItem>(`/pictures/${id}`)
}

/**
 * 新增图片
 */
export function createPicture (data: Picture) {
  const fd = new FormData()
  fd.append(
    'file',
    data.file instanceof File
      ? data.file
      : (data.file as any).originFileObj as unknown as Blob
  )
  for (const [key, value] of Object.entries(data)) {
    if (key !== 'file') {
      fd.append(key, value as string | Blob)
    }
  }
  return axiosPost<PictureItem>('/pictures', fd)
}

/**
 * 修改图片信息
 */
export function editPicture (id: number, data: Picture) {
  const fd = new FormData()
  if (data.file) {
    fd.append('file', (data.file as any).originFileObj as Blob)
  }
  for (const [key, value] of Object.entries(data)) {
    if (key !== 'file') {
      fd.append(key, value as string | Blob)
    }
  }
  return axiosPut<null>(`/pictures/${id}`, fd)
}

/**
 * 更改图片的显示状态
 */
export const togglePictureIsShow = (id: number, isShow: ZeroOrOneType) => {
  return axiosPut<null>(`/pictures/${id}/show`, { isShow })
}

/**
 * 删除图片
 */
export function deletePicture (id: number) {
  return axiosDelete<null>(`/pictures/${id}`)
}

/**
 * 获取图片分类列表
 */
export const getPictureCategories = (params: BasePageParams) => {
  return axiosGet<PictureCategoryItem[], BasePageResponse<PictureCategoryItem[]>>('/pictureCategories', {
    params
  })
}

/**
 * 获取图片分类详情
 */
export const getPictureCategoryInfo = (id: number) => {
  return axiosGet<PictureCategoryItem, BaseResponse>(`/pictureCategories/${id}`)
}

/**
 * 添加图片分类
 */
export const createPictureCategory = (data: PictureCategory) => {
  return axiosPost<null>('/pictureCategories', data)
}

/**
 * 编辑图片分类
 */
export const editPictureCategory = (id: number, data: PictureCategory) => {
  return axiosPut<null>(`/pictureCategories/${id}`, data)
}

/**
 * 更改图片分类的显示状态
 */
export const togglePictureCategoryIsShow = (id: number, isShow: ZeroOrOneType) => {
  return axiosPut<null>(`/pictureCategories/${id}/show`, { isShow })
}

/**
 * 删除图片分类
 */
export const deletePictureCategory = (id: number) => {
  return axiosDelete<null>(`/pictureCategories/${id}`)
}

/**
 * 获取文章模板列表
 */
export function getTemplates (params: BaseParams) {
  return axiosGet<TemplateItem[], BasePageResponse<TemplateItem[]>>('/templates', {
    params
  })
}

/**
 * 获取文章模板详情
 */
export function getTemplateInfo (id: number) {
  return axiosGet<TemplateItem>(`/templates/${id}`)
}

/**
 * 新增文章模板
 */
export function createTemplate (data: Template) {
  const fd = new FormData()
  fd.append('file', (data.file as any).originFileObj as Blob)
  for (const [key, value] of Object.entries(data)) {
    if (key !== 'file') {
      fd.append(key, value as string | Blob)
    }
  }
  return axiosPost<null>('/templates', fd)
}

/**
 * 修改文章模板信息
 */
export function editTemplate (id: number, data: Template) {
  const fd = new FormData()
  if (data.file) {
    fd.append('file', (data.file as any).originFileObj as Blob)
  }
  for (const [key, value] of Object.entries(data)) {
    if (key !== 'file') {
      fd.append(key, value as string | Blob)
    }
  }
  return axiosPut<null>(`/templates/${id}`, fd)
}

/**
 * 更改文章模板的显示状态
 */
export const toggleTemplateIsShow = (id: number, isShow: ZeroOrOneType) => {
  return axiosPut<null>(`/templates/${id}/show`, { isShow })
}

/**
 * 删除文章模板
 */
export function deleteTemplate (id: number) {
  return axiosDelete<null>(`/templates/${id}`)
}
