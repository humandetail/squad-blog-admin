import { IBasePageResponse, IBaseParams, ZeroOrOneType } from '@/types/common';
import { ITemplate, ITemplateItem } from '@/types/template';
import { axiosDelete, axiosGet, axiosPost, axiosPut } from '@/utils/http';

/**
 * 获取文章模板列表
 */
export function getTemplates (params: IBaseParams) {
  return axiosGet<ITemplateItem[], IBasePageResponse<ITemplateItem[]>>('/templates', {
    params
  });
}

/**
 * 获取文章模板详情
 */
export function getTemplateInfo (id: number) {
  return axiosGet<ITemplateItem>(`/templates/${id}`);
}

/**
 * 新增文章模板
 */
export function createTemplate (data: ITemplate) {
  const fd = new FormData();
  fd.append('file', (data.file as any).originFileObj);
  for (const [key, value] of Object.entries(data)) {
    if (key !== 'file') {
      fd.append(key, value);
    }
  }
  return axiosPost<null>('/templates', fd);
}

/**
 * 修改文章模板信息
 */
export function editTemplate (id: number, data: ITemplate) {
  const fd = new FormData();
  if (data.file) {
    fd.append('file', (data.file as any).originFileObj);
  }
  for (const [key, value] of Object.entries(data)) {
    if (key !== 'file') {
      fd.append(key, value);
    }
  }
  return axiosPut<null>(`/templates/${id}`, fd);
}

/**
 * 更改文章模板的显示状态
 */
export const toggleTemplateIsShow = (id: number, isShow: ZeroOrOneType) => {
  return axiosPut<null>(`/templates/${id}/show`, { isShow });
}

/**
 * 删除文章模板
 */
export function deleteTemplate (id: number) {
  return axiosDelete<null>(`/templates/${id}`);
}
