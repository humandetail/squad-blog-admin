<template>
  <form-page-card
    :title="title"
    :loading="confirmLoading"
    :handle-submit="handlePageCardSubmit"
    :handle-reset="resetFields">
    <a-form
      ref="formRef"
      class="role-form"
      v-bind="layout"
      :model="formState"
      :rules="rules"
      :scrollToFirstError="true"
      @finish="handleSubmit">
      <a-form-item
        v-if="!isEdit"
        label="模板文件"
        name="file">
        <CommonFormUpload
          :multiple="false"
          accept=".css"
          @update:file-list="handleFileListUpdate"
        />
      </a-form-item>

      <a-form-item
        label="封面图"
        name="coverId">
        <PicturePreview
          v-if="previewItem"
          :url="previewItem.url"
        />
        <a-button @click="pictureSelectorVisible = true">选择图片</a-button>
      </a-form-item>

      <a-form-item
        label="模板名称"
        name="name">
        <a-input
          v-model:value="formState.name"
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
        label="排序"
        name="sort">
        <a-input-number v-model:value="formState.sort" />
      </a-form-item>

      <a-form-item :wrapperCol="{ span: layout.wrapperCol.span, offset: layout.labelCol.span }">
        <FormOperations
          :loading="confirmLoading"
          :reset="resetFields"
        />
      </a-form-item>
    </a-form>

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
import { ITemplate, ITemplateItem } from '@/types/template';
import { templateMsg } from '@/config/validateMessage';

import CommonFormUpload from '@/components/common/form/Upload.vue';
import PicturePreview from '@/components/resource/picture/picture/form/Preview.vue';
import { SelectedPicture } from '@/types/picture';

const PictureSelectorModal = useDefineAsyncComponent('/components/resource/picture/picture/PictureSelectorModal.vue');

const props = withDefaults(defineProps<{
  title: string;
  confirmLoading?: boolean;
  formData?: ITemplateItem;
  isEdit?: boolean;
}>(), {
  confirmLoading: false,
  isEdit: false
});

const emit = defineEmits<{(e: 'submit', values: ITemplate): void}>();

const pictureSelectorVisible = ref<boolean>(false);
const previewItem = ref<SelectedPicture | null>(null);

const formState = ref<ITemplate>({
  name: '',
  coverId: 0,
  isShow: 1,
  sort: 0,
  file: null
});
watch(() => props.formData, (data) => {
  if (data) {
    formState.value = {
      name: data.name,
      coverId: data.coverId,
      isShow: data.isShow,
      sort: data.sort,
      file: null
    };

    // 填充预览图
    previewItem.value = {
      id: data.coverId,
      name: '',
      url: data.coverPic
    };
  }
}, { deep: true, immediate: true });

const { formRef, resetFields } = useFormRef();

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 }
}

const rules = computed(() => {
  const _rules = {
    name: [
      { required: true, message: templateMsg.name.required, trigger: 'blur' },
      { min: 2, message: templateMsg.name.min, trigger: 'blur' },
      { max: 32, message: templateMsg.name.max, trigger: 'blur' }
    ],
    coverId: [
      { required: true, type: 'integer', min: 1, message: templateMsg.coverId.required, trigger: 'change' }
    ]
  };

  const fileRule = [{
    validator (_rules: any, value: any) {
      if (!value || _.isEmpty(value)) {
        return Promise.reject(templateMsg.file.required);
      }
      return Promise.resolve();
    },
    trigger: 'blur'
  }];

  return !props.isEdit
    ? { ..._rules, ...({ file: fileRule }) }
    : _rules;
})

const handlePageCardSubmit = () => {
  formRef.value.validateFields().then((data: ITemplate) => {
    handleSubmit(data);
  }).catch(() => {})
}

const handleSubmit = (values: ITemplate) => {
  emit('submit', values);
}

const handleFileListUpdate = (fileList: File[]) => {
  const list = fileList;
  if (list.length > 0) {
    const [file] = list;
    formState.value.file = file;
    formState.value.name = file.name;
  } else {
    formState.value.file = null;
  }
}

const handleSelectorChange = (item: SelectedPicture) => {
  formState.value.coverId = item.id;
  previewItem.value = item;
  pictureSelectorVisible.value = false;
}
</script>
