<template>
  <div class="page-sys-user-add">
    <RegisterForm
      :confirm-loading="loading"
      @submit="handleRegister"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import RegisterForm from '@/components/sys/user/RegisterForm.vue';
import { RegisterUserType } from '@/types/user';
import { success } from '@/utils/http';
import { useRequest } from '@/hooks/common';
import { IBaseResponse } from '@/types/common';
import { registerUser } from '@/services';
import { encryptPassword } from '@/utils/tools';

const router = useRouter();

const { loading, fetch } = useRequest<IBaseResponse<null>, [RegisterUserType]>(registerUser);

const handleRegister = async ({ username, password }: RegisterUserType) => {
  await fetch({
    username,
    password: encryptPassword(password)
  });
  success('注册成功');
  router.push({ name: '用户管理' });
}
</script>
