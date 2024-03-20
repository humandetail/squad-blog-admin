<template>
  <a-modal
    v-model:open="visible"
    title="图片选择器"
    width="90%"
    :footer="null"
    :destroy-on-close="true"
    @cancel="$emit('close')"
  >
    <a-spin :spinning="spinning">
      <a-tabs
        mode="top"
        v-model:activeKey="activeKey"
      >
        <a-tab-pane
          v-for="item in categories"
          :key="item.id"
          :tab="item.displayName"
        >
          <a-spin :spinning="fetchPicturesLoading">
            <a-empty
              v-if="!currentCategoryPictures || currentCategoryPictures.length === 0"
              :image="simpleImage"
            />
            <div v-else class="wrapper">
              <a-card
                v-for="pic in currentCategoryPictures"
                :key="pic.id"
                width="220px"
                hoverable
              >
                <template #cover>
                  <a-image
                    :src="pic.qiniuDomain + pic.qiniuKey"
                  />
                </template>
                <div class="content">
                  <a-checkbox
                    v-if="multiple"
                    :checked="checkedKeys.includes(pic.id)"
                    @change="handleCheckboxChange(pic.id)"
                  />
                  <a-button
                    v-else
                    type="primary"
                    @click="handleChecked(pic.id)"
                  >
                    使用
                  </a-button>
                  <a-tooltip
                    class="title"
                    :title="pic.name"
                  >
                    {{ pic.name }}
                  </a-tooltip>
                </div>
              </a-card>
            </div>
          </a-spin>
        </a-tab-pane>

        <template #rightExtra>
          <a-input-search
            :loading="fetchPicturesLoading"
            allow-clear
            enter-button
            @search="getCurrentTabPictures(activeKey, $event)"
          />
        </template>
      </a-tabs>

      <footer class="footer">
        <div class="operations">
          <template v-if="multiple">
            <a-checkbox
              class="check-all"
              :indeterminate="!!checkedKeys.length && checkedKeys.length < currentCategoryPictures.length"
              :checked="checkedKeys.length === currentCategoryPictures.length"
              @change="handleCheckAll(currentCategoryPictures)"
            >
              {{
                checkedKeys.length === currentCategoryPictures.length
                  ? '全不选'
                  : '全选'
              }}
            </a-checkbox>

            <a-button
              type="primary"
              @click="handleMultipleSelectFinished"
            >
              选好了
            </a-button>
          </template>
        </div>

        <a-pagination
          v-bind="currentCategory?.data.pagination || {}"
          :pageSizeOptions="['8', '12', '16', '20']"
          showQuickJumper
          showSizeChanger
          @change="handlePaginationChange"
        />
      </footer>
    </a-spin>
  </a-modal>
</template>

<script
  setup
  lang="ts"
  generic="
    M extends boolean,
    T extends SelectedPicture,
    R extends M extends true ? T[] : T
  "
>
import { computed, onMounted, ref, watch } from 'vue'
import { Empty } from 'ant-design-vue'
import { ALL_PICTURES_CATEGORY_NAME } from '@/config/constants'
import { type SelectedPicture } from '@/types/picture'
import { useCheckbox, usePictureSelector } from '@/composables'

const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE

const props = withDefaults(defineProps<{
  show: boolean
  multiple?: M
  tab?: string
}>(), {
  tab: ALL_PICTURES_CATEGORY_NAME
})

const emits = defineEmits<{
  (e: 'close'): void
  (e: 'change', value: R): void
}>()

const visible = ref<boolean>(props.show)

const {
  checkedKeys,
  handleCheckboxChange,
  handleCheckAll
} = useCheckbox()

const {
  categories,
  activeKey,
  fetchCategoriesLoading,
  fetchPicturesLoading,
  currentCategory,
  currentCategoryPictures,
  allPicturesCategory,
  getDefaultPagination,
  fetchCategories,
  setCurrentTabKey,
  getCurrentTabPictures,
  handlePaginationChange
} = usePictureSelector()

const spinning = computed(() => fetchCategoriesLoading.value)

watch(() => props.tab, (tab) => {
  setCurrentTabKey(tab, categories.value)
}, {
  immediate: true
})

watch(() => props.show, () => {
  activeKey.value = 0
  checkedKeys.value = []
}, { immediate: true })

watch(activeKey, (key) => {
  getCurrentTabPictures(key)
})

watch(() => props.show, (show) => {
  visible.value = show
})

onMounted(async () => {
  const res = await fetchCategories({ isShow: 1, current: 1, pageSize: 100 })
  categories.value = [
    ...[allPicturesCategory()],
    ...(res?.data?.records || []).map(({ id, displayName }) => ({
      id,
      displayName,
      data: {
        pagination: getDefaultPagination(),
        records: {}
      }
    }))
  ]
  setCurrentTabKey(props.tab, categories.value)

  // 获取当前分类下的图片列表
  getCurrentTabPictures(activeKey.value)
})

const handleChecked = (picId: number) => {
  const item = currentCategoryPictures.value.find(item => item.id === picId)
  if (!item) {
    return false
  }
  const selectedPic = {
    id: picId,
    name: item.name,
    url: item.qiniuDomain + item.qiniuKey
  }
  emits('change', selectedPic as unknown as R)
}

const handleMultipleSelectFinished = () => {
  emits('change', currentCategoryPictures.value.filter(item => checkedKeys.value.includes(item.id)).map(sub => {
    return {
      id: sub.id,
      name: sub.name,
      url: sub.qiniuDomain + sub.qiniuKey
    }
  }) as unknown as R)
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  :deep(.ant-card) {
    .ant-card-body {
      padding: 0;
    }

    .ant-image {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 220px;
      height: 180px;

      img {
        width: auto;
        max-width: 220px;
        max-height: 180px;
      }
    }

    .content {
      display: flex;
      align-items: center;
      width: 220px;
      margin: 0;
      padding: 8px;
      gap: 8px;

      .title {
        min-width: 0;
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #303030;

  .operations {
    .ant-btn {
      margin-left: 16px;
    }
  }
}
</style>
