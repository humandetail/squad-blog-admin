<template>
  <div class="page-sys-role-add">
    <RoleForm
      title="新增角色"
      :confirm-loading="loading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { useRequest } from '@/hooks/common';
import { createRole } from '@/services';
import { IBaseResponse } from '@/types/common';
import { IRole } from '@/types/role';
import { success } from '@/utils/http';
import { useRouter } from 'vue-router';

import RoleForm from '@/components/sys/role/Form.vue';

const router = useRouter();

const { loading, fetch } = useRequest<IBaseResponse<null>, [IRole]>(createRole);

const handleSubmit = async (data: IRole) => {
  await fetch(data);
  success('角色创建成功');
  router.push({ name: '角色管理' });
}
</script>
