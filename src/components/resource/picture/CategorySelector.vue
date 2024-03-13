<template>
  <a-select
    :loading="loading"
    :value="value"
    @change="$emit('update:value', $event)"
  >
    <a-select-option :value="0">请选择分类</a-select-option>

    <a-select-option
      v-for="category in categories"
      :key="category.id"
      :value="category.id"
    >
      {{ category.displayName }}
    </a-select-option>
  </a-select>
</template>

<script setup lang="ts">
import { useRequest } from '@/composables'
import { getPictureCategories } from '@/services'
import { type BasePageParams, type BasePageResponse } from '@/types/common'
import { type PictureCategoryItem } from '@/types/picture'

withDefaults(defineProps<{
  value: number
}>(), {
  value: 0
})

defineEmits<(e: 'update:value', id: number) => void>()

const categories = ref<Array<Pick<PictureCategoryItem, 'id' | 'displayName'>>>([])

const { loading, fetch } = useRequest<BasePageResponse<PictureCategoryItem[]>, [BasePageParams]>(getPictureCategories)

onMounted(async () => {
  const res = await fetch({ current: 1, pageSize: 100, isShow: 1 })

  categories.value = (res.data?.records || []).map(({ id, displayName }) => ({ id, displayName }))
})
</script>
