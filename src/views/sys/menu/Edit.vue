<template>
  <div class="page-sys-menu-edit">
    <!-- :confirm-loading="loading" -->
    <a-spin :spinning="spinning">
      <MenuForm
        title="编辑菜单"
        :confirm-loading="loading"
        :form-data="menuInfo"
        @submit="handleSubmit"
      />
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useRequest } from '@/hooks/common';
import { IMenu, IMenuItem } from '@/types/menu';
import { IBaseResponse } from '@/types/common';
import { success } from '@/utils/http';

import MenuForm from '@/components/sys/menu/Form.vue';
import { getQueryString } from '@/utils/tools';
import { useFetchMenuInfo } from '@/hooks/sys/menu';
import { editMenu } from '@/services/sys/menu';

const router = useRouter();
const route = useRoute();

const id = Number(getQueryString(route.params, 'id'));

const { loading: spinning, menuInfo } = useFetchMenuInfo(id);

const { loading, fetch } = useRequest<IBaseResponse<null>, [IMenuItem]>(editMenu);

const handleSubmit = async (data: IMenu) => {
  await fetch(({ id, ...data }) as IMenuItem);
  success('菜单编辑成功')
  router.push({ name: '菜单管理' });
}
</script>
