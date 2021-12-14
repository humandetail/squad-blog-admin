<template>
  <div class="page-login">
    <section class="login-form">
      <header class="login-form-header">
        <h1>博客后台管理中心</h1>
      </header>
      <a-form @submit.prevent="onSubmit">
        <a-form-item v-bind="validateInfos.username">
          <a-input
            v-model:value="modelRef.username"
            allow-clear>
            <template #prefix>
              <user-outlined />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item v-bind="validateInfos.password">
          <a-input-password
            v-model:value="modelRef.password"
            allow-clear>
            <template #prefix>
              <lock-outlined />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-button
            class="btn-submit"
            type="primary"
            html-type="submit"
            :loading="loading">
            <template #icon>
              <login-outlined />
            </template>
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from '@/hooks/common';
import LoginBg from '@assets/imgs/login-bg.jpg'
import { ILoginParams, login } from '@/services';
import { error } from '@/utils/http';
import { useUserStore } from '@/store/user';
import { useRoute, useRouter } from 'vue-router';
import { getQueryString } from '@/utils/tools';
import { passwordReg, usernameReg } from '@/utils/regexp';

const loginBgStyle = `url(${LoginBg})`; // 背景图片

const loading = ref(false);

const useStore = useUserStore();
const router = useRouter();
const route = useRoute();

const validateSuccess = async (data: ILoginParams) => {
  try {
    loading.value = true;

    const res = await login(data);
    if (res.code !== 200) {
      throw res;
    }

    useStore.setToken(res.data);

    router.push(getQueryString(route.query, 'redirect') || '/');
  } catch (err: any) {
    error(err.message);
  } finally {
    loading.value = false;
  }
}

const { modelRef, onSubmit, validateInfos } = useForm<ILoginParams>({
  username: '',
  password: ''
}, {
  username: [
    { required: true, pattern: usernameReg, message: '用户名只能由字母或数字组成，长度为4-20' }
  ],
  password: [
    { required: true, pattern: passwordReg, message: '密码必须包含英文字母、数字和特殊符号（!@#$%^&*_），长度为6-20' }
  ]
}, validateSuccess);

</script>

<style lang="less" scoped>
.page-login {
  height: 100%;
  background-image: v-bind(loginBgStyle);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

  .login-form {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 300px;

    .login-form-header {
      h1 {
        text-align: center;
      }
    }

    .btn-submit {
      width: 100%;
    }
  }
}
</style>
