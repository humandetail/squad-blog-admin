<template>
  <form-page-card
    :title="title"
    :loading="confirmLoading"
    :handle-submit="handlePageCardSubmit"
    :handle-reset="resetFields">
    <a-spin :spinning="initLoading">
      <a-form
        ref="formRef"
        class="post-form"
        v-bind="layout"
        :model="formState"
        :rules="rules"
        :scrollToFirstError="true"
        @finish="handleSubmit">
        <a-row>
          <a-col :span="12">
            <a-form-item
              label="标题"
              name="title">
              <a-input
                v-model:value="formState.title"
              />
            </a-form-item>

            <a-form-item
              label="摘要"
              name="summary">
              <a-textarea
                v-model:value="formState.summary"
                :auto-size="{ minRows: 3, maxRows: 5 }"
              />
            </a-form-item>

            <a-form-item
              label="分类"
              name="categoryId">
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
              name="tags">
              <a-checkable-tag
                v-for="item in tags"
                :key="item.id"
                :checked="formState.tags.includes(item.id)"
                @change="handleTagChange(item.id)">
                {{ item.displayName }}
              </a-checkable-tag>
            </a-form-item>

            <a-form-item
              label="封面图"
              name="coverId">
              <Picturereview
                v-if="previewItem"
                :url="previewItem.url"
              />
              <a-button
                type="primary"
                success
                @click="pictureSelectorVisible = true">
                选择图片
              </a-button>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="作者"
              name="author">
              <a-input
                v-model:value="formState.author"
              />
            </a-form-item>
            <a-form-item
              label="来源"
              name="source">
              <a-input
                v-model:value="formState.source"
              />
            </a-form-item>

            <a-form-item
              label="是否显示"
              name="isShow">
              <a-radio-group
                v-model:value="formState.isShow"
                name="isShow">
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>

            <a-form-item
              label="推荐指数"
              name="recommendationIndex">
              <a-input-number v-model:value="formState.recommendationIndex" />
            </a-form-item>

            <a-form-item
              label="seo标题"
              name="seoTitle">
              <a-input
                v-model:value="formState.seoTitle"
              />
            </a-form-item>

            <a-form-item
              label="seo关键字"
              name="seoKeywords">
              <a-input
                v-model:value="formState.seoKeywords"
              />
            </a-form-item>

            <a-form-item
              label="seo描述"
              name="seoDescription">
              <a-input
                v-model:value="formState.seoDescription"
              />
            </a-form-item>

            <a-form-item
              label="内容模板"
              name="templateId">
              <TemplateSelector
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
              :wrapperCol="{ span: 24 }">
              <MilkdownEditor
                :value="defaultEditorValue"
                @update:value="formState.content = $event"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-form-item :wrapperCol="{ span: layout.wrapperCol.span, offset: layout.labelCol.span }">
          <FormOperations
            :loading="confirmLoading"
            :reset="resetFields"
          />
        </a-form-item>
      </a-form>
    </a-spin>

    <PictureSelectorModal
      v-show="pictureSelectorVisible"
      :show="pictureSelectorVisible"
      :multiple="false"
      @change="handleSelectorChange"
      @close="pictureSelectorVisible = false"
    />
  </form-page-card>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { computed, ref, watch } from 'vue';

import FormPageCard from '@/components/common/card/FormPageCard.vue';
import { useDefineAsyncComponent, useFormRef } from '@/hooks/common';
import { IPost } from '@/types/post';
import { postMsg } from '@/config/validateMessage';
import { usePostFormInit } from '@/hooks/post/post';
import TemplateSelector from '@/components/resource/template/TemplateSelector.vue';
// import PictureSelectorModal from '@/components/resource/picture/picture/PictureSelectorModal.vue';
import { SelectedPicture } from '@/types/picture';
import Picturereview from '@/components/resource/picture/picture/form/Preview.vue';
import MilkdownEditor from '@/components/common/editor/MilkEditor';

const props = withDefaults(defineProps<{
  title: string;
  confirmLoading?: boolean;
  formData?: IPost;
  coverInfo?: SelectedPicture
}>(), {
  confirmLoading: false,
  formData: () => ({
    title: '',
    summary: '',
    content: '',
    author: '细节',
    source: '原创',
    recommendationIndex: 0,
    seoTitle: '',
    seoKeywords: '',
    seoDescription: '',
    categoryId: 0,
    coverId: 0,
    templateId: 0,
    tags: [],
    isShow: 1,
    sort: 0
  })
});

const PictureSelectorModal = useDefineAsyncComponent('/components/resource/picture/picture/PictureSelectorModal.vue')

const formState = ref<IPost>(props.formData);
watch(() => props.formData, () => {
  formState.value = props.formData;
});

watch(() => props.coverInfo, (info) => {
  if (info) {
    previewItem.value = info;
  }
});

const defaultEditorValue = computed(() => props.formData.content || '')

const {
  initLoading,
  categories,
  tags,
  templates
} = usePostFormInit();

const pictureSelectorVisible = ref(false);
const previewItem = ref<SelectedPicture | null>(null);

const emit = defineEmits<{(e: 'submit', values: IPost): void}>();

const { formRef, resetFields } = useFormRef();

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
}

const rules = {
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
        return Promise.resolve();
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
        return Promise.resolve();
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
        return Promise.resolve();
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
        return Promise.resolve();
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
        return Promise.resolve();
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
};

const handlePageCardSubmit = () => {
  formRef.value.validateFields().then((data: IPost) => {
    handleSubmit(data);
  }).catch(() => {})
}

const handleSubmit = (values: IPost) => {
  emit('submit', values);
}

const handleSelectorChange = (item: SelectedPicture | SelectedPicture[]) => {
  if (_.isArray(item)) return;
  formState.value.coverId = item.id;
  previewItem.value = item;
  pictureSelectorVisible.value = false;
}

const handleTagChange = (id: number) => {
  if (formState.value.tags.includes(id)) {
    formState.value.tags = formState.value.tags.filter(tag => tag !== id);
  } else {
    formState.value.tags.push(id);
  }
}
</script>

<style lang="less" scoped>
.post-form {
  :deep(.milkdown-menu) {
    position: sticky;
    top: 50px; // card head;
    z-index: 1;
  }
}
</style>
