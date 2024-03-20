<template>
  <common-form-card
    :title="`${!isEdit ? '新增' : '编辑'}文章`"
    :loading="confirmLoading"
    :reset="resetFields"
    :submit="onSubmit"
  >
    <a-spin :spinning="initLoading">
      <a-form
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :colon="true"
      >
        <a-row>
          <a-col :span="12">
            <a-form-item
              label="标题"
              name="title"
              v-bind="validateInfos.title"
            >
              <a-input
                v-model:value="formState.title"
              />
            </a-form-item>

            <a-form-item
              label="摘要"
              name="summary"
              v-bind="validateInfos.summary"
            >
              <a-textarea
                v-model:value="formState.summary"
                :auto-size="{ minRows: 3, maxRows: 5 }"
              />
            </a-form-item>

            <a-form-item
              label="分类"
              name="categoryId"
              v-bind="validateInfos.categoryId"
            >
              <a-select v-model:value="formState.categoryId">
                <a-select-option :value="0">选择分类</a-select-option>
                <a-select-option
                  v-for="item in categories"
                  :key="item.id"
                  :value="item.id">
                  {{ item.displayName }}
                </a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item
              label="标签"
              name="tags"
              v-bind="validateInfos.tags"
            >
              <a-checkable-tag
                v-for="item in tags"
                :key="item.id"
                :checked="formState.tags.includes(item.id)"
                @change="handleTagChange(item.id)"
              >
                {{ item.displayName }}
              </a-checkable-tag>
            </a-form-item>

            <a-form-item
              label="封面图"
              name="coverId"
              v-bind="validateInfos.coverId"
            >
              <a-image
                v-if="previewItem"
                :src="previewItem.url"
                :width="160"
              />
              <a-button
                type="primary"
                success
                style="margin-top: 8px;"
                @click="pictureSelectorVisible = true"
              >
                选择图片
              </a-button>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="作者"
              name="author"
              v-bind="validateInfos.author"
            >
              <a-input
                v-model:value="formState.author"
              />
            </a-form-item>
            <a-form-item
              label="来源"
              name="source"
              v-bind="validateInfos.source"
            >
              <a-input
                v-model:value="formState.source"
              />
            </a-form-item>

            <a-form-item
              label="是否显示"
              name="isShow"
            >
              <a-switch
                v-model:checked="formState.isShow"
                name="isShow"
                :checked-value="1"
                checked-children="是"
                :un-checked-value="0"
                un-checked-children="否"
              />
            </a-form-item>

            <a-form-item
              label="推荐指数"
              name="recommendationIndex"
              v-bind="validateInfos.recommendationIndex"
            >
              <a-input-number v-model:value="formState.recommendationIndex" />
            </a-form-item>

            <a-form-item
              label="seo标题"
              name="seoTitle"
              v-bind="validateInfos.seoTitle"
            >
              <a-input
                v-model:value="formState.seoTitle"
              />
            </a-form-item>

            <a-form-item
              label="seo关键字"
              name="seoKeywords"
              v-bind="validateInfos.seoKeywords"
            >
              <a-input
                v-model:value="formState.seoKeywords"
              />
            </a-form-item>

            <a-form-item
              label="seo描述"
              name="seoDescription"
              v-bind="validateInfos.seoDescription"
            >
              <a-input
                v-model:value="formState.seoDescription"
              />
            </a-form-item>

            <a-form-item
              label="内容模板"
              name="templateId"
              v-bind="validateInfos.templateId"
            >
              <resource-template-selector
                v-model:value="formState.templateId"
                :records="templates"
              />
            </a-form-item>
          </a-col>

          <a-col :span="24">
            <a-form-item
              name="content"
              label="文章内容"
              labelAlign="left"
              :labelCol="{ span: 24 }"
              :wrapperCol="{ span: 24 }"
              v-bind="validateInfos.content"
            >
              <common-editor
                v-model:value="formState.content"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item
          :wrapper-col="{
            span: wrapperCol.span,
            offset: labelCol.span
          }"
        >
          <a-space>
            <a-button
              type="primary"
              :loading="confirmLoading"
              @click.prevent="onSubmit"
            >
              <SaveOutlined />
              提交
            </a-button>

            <a-button
              @click="resetFields"
            >
              <ReloadOutlined />
              重置
            </a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-spin>

    <resource-picture-selector-modal
      v-show="pictureSelectorVisible"
      :show="pictureSelectorVisible"
      :multiple="false"
      @change="handleSelectorChange"
      @close="pictureSelectorVisible = false"
    />
  </common-form-card>
</template>

<script setup lang="ts">
import usePostFormInit from '@/composables/usePostFormInit'
import { postMsg } from '@/config/validateMessage'
import { type SelectedPicture } from '@/types/picture'
import type { Post, PostItem } from '@/types/post'
import { error, success } from '@/utils/http'
import { useForm } from 'ant-design-vue/es/form'

const props = withDefaults(defineProps<{
  record?: PostItem
  loading?: boolean
  handler: (...args: any) => any
}>(), {
  loading: false
})

const emits = defineEmits<(e: 'success') => void>()

const labelCol = ref({ span: 6 })
const wrapperCol = ref({ span: 18 })
const confirmLoading = ref(false)

const previewItem = ref<SelectedPicture>()
const pictureSelectorVisible = ref(false)

const {
  initLoading,
  categories,
  tags,
  templates
} = usePostFormInit()

const formState = ref<Post>({
  title: '',
  summary: '',
  categoryId: 0,
  tags: [],
  coverId: 0,
  author: '细节',
  source: '原创',
  recommendationIndex: 0,
  seoTitle: '',
  seoKeywords: '',
  seoDescription: '',
  templateId: 0,
  content: '',
  isShow: 1,
  sort: 0
})

const isEdit = computed(() => !!props.record)

const rulesRef = {
  title: [
    { required: true, message: postMsg.title.required, trigger: 'blur' },
    { min: 2, message: postMsg.title.min, trigger: 'blur' },
    { max: 255, message: postMsg.title.max, trigger: 'blur' }
  ],
  summary: [
    { required: true, message: postMsg.summary.required, trigger: 'blur' },
    { min: 2, message: postMsg.summary.min, trigger: 'blur' },
    { max: 500, message: postMsg.summary.max, trigger: 'blur' }
  ],
  content: [
    {
      required: true,
      validator: (_rule: any, value: string) => {
        if (!value) {
          return Promise.reject(postMsg.content.required)
        }
        if (value.length > 65535) {
          return Promise.reject(postMsg.content.max)
        }
        return Promise.resolve()
      },
      trigger: 'change'
    }
  ],
  author: [
    { required: true, message: postMsg.author.required, trigger: 'blur' },
    { min: 1, message: postMsg.author.min, trigger: 'blur' },
    { max: 50, message: postMsg.author.max, trigger: 'blur' }
  ],
  source: [
    { required: true, message: postMsg.source.required, trigger: 'blur' },
    { min: 1, message: postMsg.source.min, trigger: 'blur' },
    { max: 255, message: postMsg.source.max, trigger: 'blur' }
  ],
  recommendationIndex: [
    { type: 'number', message: postMsg.recommendationIndex.number, trigger: 'blur' }
  ],
  categoryId: [
    {
      required: true,
      validator: (_rule: any, value: number) => {
        if (value <= 0) {
          return Promise.reject(postMsg.categoryId.required)
        }
        return Promise.resolve()
      },
      trigger: 'change'
    }
  ],
  coverId: [
    {
      required: true,
      validator: (_rule: any, value: number) => {
        if (value <= 0) {
          return Promise.reject(postMsg.coverId.required)
        }
        return Promise.resolve()
      },
      trigger: 'change'
    }
  ],
  templateId: [
    {
      required: true,
      validator: (_rule: any, value: number) => {
        if (value <= 0) {
          return Promise.reject(postMsg.templateId.required)
        }
        return Promise.resolve()
      },
      trigger: 'change'
    }
  ],
  tags: [
    {
      required: true,
      type: 'array',
      validator: (_rule: any, value: number[]) => {
        if (value.length <= 0) {
          return Promise.reject(postMsg.tags.required)
        }
        if (value.length > 5) {
          return Promise.reject(postMsg.tags.max)
        }
        return Promise.resolve()
      },
      trigger: 'change'
    }
  ],
  seoTitle: [
    { max: 255, message: postMsg.seoTitle.max, trigger: 'blur' }
  ],
  seoKeywords: [
    { max: 255, message: postMsg.seoKeywords.max, trigger: 'blur' }
  ],
  seoDescription: [
    { max: 255, message: postMsg.seoDescription.max, trigger: 'blur' }
  ]
}

const { resetFields, validate, validateInfos } = useForm(formState, rulesRef)

watch(() => props.record, record => {
  if (record) {
    const { title, summary, coverId, coverPic, categoryId, tags, templateId, author, source, recommendationIndex, seoTitle, seoKeywords, seoDescription, content = '', isShow, sort } = record
    formState.value = { title, summary, coverId, categoryId, tags: tags.map(({ id }) => id), templateId, author, source, recommendationIndex, seoTitle, seoKeywords, seoDescription, content, isShow, sort }

    previewItem.value = {
      id: coverId,
      name: '',
      url: coverPic
    }
  }
}, { immediate: true, deep: true })

const handleSelectorChange = (item: SelectedPicture) => {
  formState.value.coverId = item.id
  previewItem.value = item
  pictureSelectorVisible.value = false
}
const handleTagChange = (id: number) => {
  if (formState.value.tags.includes(id)) {
    formState.value.tags = formState.value.tags.filter(tag => tag !== id)
  } else {
    formState.value.tags.push(id)
  }
}

const onSubmit = () => {
  validate()
    .then(async () => {
      confirmLoading.value = true

      try {
        const res = await props.handler(formState.value)

        if (res?.code !== 200) {
          throw res
        }

        success(`${res?.message}` ?? '操作成功')

        emits('success')
      } catch (err) {
        error((err as Error)?.message ?? '服务器出错，请稍候再试')
      } finally {
        confirmLoading.value = false
      }
    })
}
</script>
