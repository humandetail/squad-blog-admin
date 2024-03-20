import type { BasePageParams, BasePageResponse } from '@/types/common'
import useRequest from './useRequest'
import { getPostCategories, getPostTags, getTemplates } from '@/services'
import type { PostCategoryItem, PostTagItem } from '@/types/post'
import type { TemplateItem } from '@/types/template'
import { error } from '@/utils/http'
import { computed, onMounted, ref } from 'vue'

type CategoryItem = Pick<PostCategoryItem, 'id' | 'displayName'>
type TagItem = Pick<PostTagItem, 'id' | 'displayName'>
type PostTemplateItem = Pick<TemplateItem, 'id' | 'name' | 'coverPic'>

const usePostFormInit = () => {
  const categories = ref<CategoryItem[]>([])
  const tags = ref<TagItem[]>([])
  const templates = ref<PostTemplateItem[]>([])

  const {
    loading: fetchCategoriesLoading,
    fetch: fetchCategories
  } = useRequest<BasePageResponse<PostCategoryItem[]>, [BasePageParams]>(getPostCategories)

  const {
    loading: fetchTagsLoading,
    fetch: fetchTags
  } = useRequest<BasePageResponse<PostTagItem[]>, [BasePageParams]>(getPostTags)

  const {
    loading: fetchTemplateLoading,
    fetch: fetchTemplates
  } = useRequest<BasePageResponse<TemplateItem[]>, [BasePageParams]>(getTemplates)

  const initLoading = computed(() => (
    fetchCategoriesLoading.value ||
    fetchTagsLoading.value ||
    fetchTemplateLoading.value
  ))

  onMounted(async () => {
    try {
      const res = await Promise.all([
        fetchCategories({ current: 1, pageSize: 100, isShow: 1 }),
        fetchTags({ current: 1, pageSize: 100, isShow: 1 }),
        fetchTemplates({ current: 1, pageSize: 100, isShow: 1 })
      ])

      const errItem = res.find(item => item.code !== 200)

      if (errItem) {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw errItem
      }

      const [categoriesRes, tagsRes, templatesRes] = res

      categories.value = categoriesRes?.data?.records || []
      tags.value = tagsRes?.data?.records || []
      templates.value = templatesRes?.data?.records || []
    } catch (err: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      error(err?.desc || '表单初始化失败，请重试')
    }
  })

  return {
    initLoading,
    fetchCategoriesLoading,
    fetchTagsLoading,
    fetchTemplateLoading,
    categories,
    tags,
    templates,
    fetchCategories,
    fetchTags,
    fetchTemplates
  }
}

export default usePostFormInit
