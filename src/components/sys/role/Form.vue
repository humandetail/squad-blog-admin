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
        label="角色名"
        name="name">
        <a-input
          v-model:value="formState.name"
        />
      </a-form-item>

      <a-form-item
        label="备注"
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
import { roleMsg } from '@/config/validateMessage';
import { IRole } from '@/types/role';

const props = withDefaults(defineProps<{
  title: string;
  confirmLoading?: boolean;
  formData?: IRole
}>(), {
  confirmLoading: false,
  formData: () => ({
    name: '',
    remarks: '',
    isShow: 1,
    sort: 0
  })
});

const formState = ref<IRole>(props.formData);
watch(() => props.formData, () => {
  formState.value = props.formData;
})

const emit = defineEmits<{(e: 'submit', values: IRole): void}>();

const { formRef, resetFields } = useFormRef();

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 }
}

const rules = {
  name: [
    { required: true, message: roleMsg.name.required, trigger: 'blur' }
  ]
};

const handlePageCardSubmit = () => {
  formRef.value.validateFields().then((data: IRole) => {
    handleSubmit(data);
  }).catch(() => {})
}

const handleSubmit = (values: IRole) => {
  emit('submit', values);
}
</script>
