<template>
  <div class="page-sys-role-edit">
    <a-spin :spinning="spinning">
      <RoleForm
        title="编辑角色"
        :confirm-loading="loading"
        :form-data="roleInfo"
        @submit="handleSubmit"
      />
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useRequest } from '@/hooks/common';
import { IRole } from '@/types/role';
import { IBaseResponse } from '@/types/common';
import { success } from '@/utils/http';

import RoleForm from '@/components/sys/role/Form.vue';
import { getQueryString } from '@/utils/tools';
import { useFetchRoleInfo } from '@/hooks/sys/role';
import { editRole } from '@/services';

const router = useRouter();
const route = useRoute();

const id = Number(getQueryString(route.params, 'id'));

const { loading: spinning, roleInfo } = useFetchRoleInfo(id);

const { loading, fetch } = useRequest<IBaseResponse<null>, [IRole]>(editRole);

const handleSubmit = async (data: IRole) => {
  await fetch({ id, ...data } as IRole);
  success('角色编辑成功')
  router.push({ name: '角色管理' });
}
</script>
