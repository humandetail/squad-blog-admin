<template>
  <form-page-card
    title="注册用户"
    :loading="confirmLoading"
    :handle-submit="handlePageCardSubmit"
    :handle-reset="resetFields">
    <a-form
      ref="formRef"
      class="register-form"
      v-bind="layout"
      :model="formState"
      :rules="rules"
      :scrollToFirstError="true"
      @finish="handleSubmit">
      <a-form-item
        label="用户名"
        name="username">
        <a-input
          v-model:value="formState.username"
          autocomplete="off"
        />
      </a-form-item>

      <a-form-item
        label="密码"
        name="password">
        <a-input
          v-model:value="formState.password"
          type="password"
          autocomplete="off"
        />
      </a-form-item>
      <a-form-item
        label="确认密码"
        name="password2">
        <a-input
          v-model:value="formState.password2"
          type="password"
          autocomplete="off"
        />
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
import { ref } from 'vue';

import FormPageCard from '@/components/common/card/FormPageCard.vue';
import { RegisterUserType } from '@/types/user';
import { useFormRef } from '@/hooks/common';
import { RuleObject } from 'ant-design-vue/lib/form';
import { passwordReg, usernameReg } from '@/utils/regexp';
import { userMsg } from '@/utils/validateMessage';

type RegisterUserWithConfirmType = RegisterUserType & { password2: string };

const props = withDefaults(defineProps<{
  confirmLoading?: boolean;
}>(), {
  confirmLoading: false
});

const formState = ref<RegisterUserWithConfirmType>({
  username: '',
  password: '',
  password2: ''
});

const emit = defineEmits<{(e: 'submit', values: RegisterUserType): void}>();

const { formRef, resetFields } = useFormRef();

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 }
}

const validatePassword = (_rule: RuleObject, value: string) => {
  if (!passwordReg.test(value)) {
    return Promise.reject(userMsg.password.pattern);
  }
  if (formState.value.password2) {
    formRef.value.validateFields('password2');
  }
  return Promise.resolve();
}

const validatePassword2 = (_rule: RuleObject, value: string) => {
  if (value !== formState.value.password) {
    return Promise.reject(userMsg.password2.inconformity);
  }
  return Promise.resolve();
}

const rules = {
  username: [
    { required: true, message: userMsg.username.required, trigger: 'blur' },
    { pattern: usernameReg, message: userMsg.username.pattern, trigger: 'blur' }
  ],
  password: [
    { required: true, message: userMsg.password.required, trigger: 'blur' },
    { validator: validatePassword, trigger: 'blur' }
  ],
  password2: [
    { required: true, message: userMsg.password2.required, trigger: 'blur' },
    { validator: validatePassword2, trigger: 'blur' }
  ]
};

const handlePageCardSubmit = () => {
  formRef.value.validateFields().then((data: RegisterUserWithConfirmType) => {
    handleSubmit(data);
  }).catch(() => {})
}

const handleSubmit = ({ password2, ...values }: RegisterUserWithConfirmType) => {
  emit('submit', values);
}
</script>
