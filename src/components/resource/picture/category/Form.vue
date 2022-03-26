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
        label="分类名称"
        name="name">
        <a-input
          v-model:value="formState.name"
        />
      </a-form-item>

      <a-form-item
        label="分类显示名称"
        name="displayName">
        <a-input
          v-model:value="formState.displayName"
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
import { ref, watch } from 'vue';

import FormPageCard from '@/components/common/card/FormPageCard.vue';
import { useFormRef } from '@/hooks/common';
import { IPictureCategory } from '@/types/pictureCategory';
import { pictureCategoryMsg } from '@/config/validateMessage/resource/pictureCategory';

const props = withDefaults(defineProps<{
  title: string;
  confirmLoading?: boolean;
  formData?: IPictureCategory
}>(), {
  confirmLoading: false,
  formData: () => ({
    name: '',
    displayName: '',
    isShow: 1,
    sort: 0
  })
});

const formState = ref<IPictureCategory>(props.formData);
watch(() => props.formData, () => {
  formState.value = props.formData;
})

const emit = defineEmits<{(e: 'submit', values: IPictureCategory): void}>();

const { formRef, resetFields } = useFormRef();

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 }
}

const rules = {
  name: [
    { required: true, message: pictureCategoryMsg.name.required, trigger: 'blur' },
    { min: 2, message: pictureCategoryMsg.name.min, trigger: 'blur' },
    { max: 32, message: pictureCategoryMsg.name.max, trigger: 'blur' }
  ],
  displayName: [
    { required: true, message: pictureCategoryMsg.displayName.required, trigger: 'blur' },
    { min: 2, message: pictureCategoryMsg.displayName.min, trigger: 'blur' },
    { max: 64, message: pictureCategoryMsg.displayName.max, trigger: 'blur' }
  ]
};

const handlePageCardSubmit = () => {
  formRef.value.validateFields().then((data: IPictureCategory) => {
    handleSubmit(data);
  }).catch(() => {})
}

const handleSubmit = (values: IPictureCategory) => {
  emit('submit', values);
}
</script>
