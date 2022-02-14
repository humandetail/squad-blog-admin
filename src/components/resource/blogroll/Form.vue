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
        label="友链名称"
        name="name">
        <a-input
          v-model:value="formState.name"
        />
      </a-form-item>

      <a-form-item
        label="链接地址"
        name="link">
        <a-input
          v-model:value="formState.link"
        />
      </a-form-item>

      <a-form-item
        label="备注信息"
        name="remarks">
        <a-textarea
          v-model:value="formState.remarks"
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
import { IBlogroll } from '@/types/blogroll';
import { blogrollMsg } from '@/config/validateMessage';

const props = withDefaults(defineProps<{
  title: string;
  confirmLoading?: boolean;
  formData?: IBlogroll
}>(), {
  confirmLoading: false,
  formData: () => ({
    name: '',
    link: '',
    remarks: '',
    isShow: 1,
    sort: 0
  })
});

const formState = ref<IBlogroll>(props.formData);
watch(() => props.formData, () => {
  formState.value = props.formData;
})

const emit = defineEmits<{(e: 'submit', values: IBlogroll): void}>();

const { formRef, resetFields } = useFormRef();

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 }
}

const rules = {
  name: [
    { required: true, message: blogrollMsg.name.required, trigger: 'blur' },
    { min: 2, message: blogrollMsg.name.min, trigger: 'blur' },
    { max: 32, message: blogrollMsg.name.max, trigger: 'blur' }
  ],
  link: [
    { required: true, message: blogrollMsg.link.required, trigger: 'blur' },
    { type: 'url', message: blogrollMsg.link.type, trigger: 'blur' },
    { max: 128, message: blogrollMsg.link.max, trigger: 'blur' }
  ],
  remarks: [
    { required: true, message: blogrollMsg.remarks.required, trigger: 'blur' },
    { max: 255, message: blogrollMsg.remarks.max, trigger: 'blur' }
  ]
};

const handlePageCardSubmit = () => {
  formRef.value.validateFields().then((data: IBlogroll) => {
    handleSubmit(data);
  }).catch(() => {})
}

const handleSubmit = (values: IBlogroll) => {
  emit('submit', values);
}
</script>
