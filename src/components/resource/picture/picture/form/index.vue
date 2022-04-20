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
        label="图片"
        name="file">
        <PicturePreview
          v-if="isEdit"
          :url="previewUrl"
        />
        <CommonFormUpload
          v-else
          :multiple="false"
          accept="image/*"
          @update:file-list="handleFileListUpdate"
        />
      </a-form-item>

      <a-form-item
        label="图片分类"
        name="categoryId">
        <CategorySelector v-model:value="formState.categoryId" />
      </a-form-item>

      <a-form-item
        label="图片名称"
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
  </form-page-card>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { computed, ref, watch } from 'vue';

import FormPageCard from '@/components/common/card/FormPageCard.vue';
import { useFormRef } from '@/hooks/common';
import { IPicture, IPictureItem } from '@/types/picture';
import { pictureMsg } from '@/config/validateMessage';

import CommonFormUpload from '@/components/common/form/Upload.vue';
import CategorySelector from '../CategorySelector.vue';
import PicturePreview from './Preview.vue';

const props = withDefaults(defineProps<{
  title: string;
  confirmLoading?: boolean;
  formData?: IPictureItem;
  isEdit?: boolean;
}>(), {
  confirmLoading: false,
  isEdit: false
});

const emit = defineEmits<{(e: 'submit', values: IPicture): void}>();

const formState = ref<IPicture>({
  name: '',
  categoryId: 0,
  isShow: 1,
  sort: 0,
  file: null
});
watch(() => props.formData, (data) => {
  if (data) {
    formState.value = {
      name: data.name,
      categoryId: data.categoryId,
      isShow: data.isShow,
      sort: data.sort,
      file: null
    };
  }
}, { deep: true, immediate: true });

const previewUrl = computed(() => {
  const { qiniuDomain, qiniuKey } = props?.formData || {};
  if (qiniuDomain && qiniuKey) {
    return qiniuDomain + qiniuKey;
  }

  return '';
});

const { formRef, resetFields } = useFormRef();

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 }
}

const rules = computed(() => {
  const _rules = {
    name: [
      { required: true, message: pictureMsg.name.required, trigger: 'blur' },
      { min: 2, message: pictureMsg.name.min, trigger: 'blur' },
      { max: 32, message: pictureMsg.name.max, trigger: 'blur' }
    ],
    categoryId: [
      { required: true, type: 'integer', min: 1, message: pictureMsg.categoryId.required, trigger: 'change' }
    ]
  };

  const fileRule = [{
    validator (_rules: any, value: any) {
      if (!value || _.isEmpty(value)) {
        return Promise.reject(pictureMsg.file.required);
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
  formRef.value.validateFields().then((data: IPicture) => {
    handleSubmit(data);
  }).catch(() => {})
}

const handleSubmit = (values: IPicture) => {
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
</script>
