<template>
  <section class="change-password">
    <a-form
      v-bind="layout"
      @submit.prevent="submit">
      <a-form-item label="原密码" v-bind="validateInfos.password">
        <a-input-password
          v-model:value="modelRef.password"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="新密码" v-bind="validateInfos.newPassword">
        <a-input-password
          v-model:value="modelRef.newPassword"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="确认新密码" v-bind="validateInfos.newPassword2">
        <a-input-password
          v-model:value="modelRef.newPassword2"
          allow-clear
        />
      </a-form-item>

      <a-form-item :wrapperCol="{ span: layout.wrapperCol.span, offset: layout.labelCol.span }">
        <a-button
          type="primary"
          html-type="submit"
          class="btn-submit"
          :loading="loading">
          确认
        </a-button>

        <a-button>取消</a-button>
      </a-form-item>
    </a-form>
  </section>
</template>

<script setup lang="ts">
import { useForm, useRequest } from '@/hooks/common';
import { changePassword } from '@/services';
import { useUserStore } from '@/store/user';
import { IChangePasswordParams } from '@/types/user';
import { success } from '@/utils/http';
import { passwordReg } from '@/utils/regexp';
import { encryptPassword } from '@/utils/tools';
import { RuleObject } from 'ant-design-vue/lib/form';
import { useRoute, useRouter } from 'vue-router';

const userStore = useUserStore();
const userInfo = userStore.userInfo!;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

// 校验成功处理
const handleValidateSuccess = async ({ password, newPassword }: IChangePasswordParams & { newPassword2: string }) => {
  fetch(userInfo.id, {
    password: encryptPassword(password),
    newPassword: encryptPassword(newPassword)
  })
    .then(() => {
      success('修改密码成功，请重新登录');
      return userStore.logout();
    })
    .then(() => {
      useRouter().push({
        path: '/login',
        query: { redirect: useRoute().fullPath }
      })
    });
}

const validatePassword = (_rule: RuleObject, value: string) => {
  if (value === '') {
    return Promise.reject(new Error('请输入新密码!'));
  }

  if (!passwordReg.test(value)) {
    return Promise.reject(new Error('密码必须包含英文字母、数字和特殊符号（!@#$%^&*_），长度为6-20'));
  }

  if (value === modelRef.password) {
    return Promise.reject(new Error('新密码不能和旧密码相同'));
  }

  if (modelRef.newPassword2 !== '') {
    validateField('newPassword2', modelRef.newPassword2, rules.newPassword2);
  }

  return Promise.resolve();
}

const validatePassword2 = (_rule: RuleObject, value: string) => {
  if (value === '') {
    return Promise.reject(new Error('请再次输入新密码!'));
  }

  if (value !== modelRef.newPassword) {
    return Promise.reject(new Error('两次密码不一致!'));
  }

  return Promise.resolve();
}

const rules = {
  password: [{ required: true, pattern: passwordReg, message: '密码必须包含英文字母、数字和特殊符号（!@#$%^&*_），长度为6-20' }],
  newPassword: [{ required: true, validator: validatePassword }],
  newPassword2: [{ required: true, validator: validatePassword2 }]
}

const { loading, fetch } = useRequest<null, [string, IChangePasswordParams]>(changePassword);
const { modelRef, submit, validateField, validateInfos } = useForm<IChangePasswordParams & { newPassword2: string }>({
  password: '',
  newPassword: '',
  newPassword2: ''
}, rules, handleValidateSuccess);
</script>

<style lang="less" scoped>
.change-password {
  padding: 16px 48px;

  .btn-submit {
    margin-right: 16px;
  }

  .ant-form-item:last-child {
    margin-bottom: 0;
  }
}
</style>
