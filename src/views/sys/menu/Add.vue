<template>
  <div class="page-sys-menu-add">
    <MenuForm
      title="新增菜单"
      :confirm-loading="loading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import MenuForm from '@/components/sys/menu/Form.vue';
import { useRequest } from '@/hooks/common';
import { createMenu } from '@/services';
import { IMenu } from '@/types/menu';
import { IBaseResponse } from '@/types/common';
import { success } from '@/utils/http';

const { loading, fetch } = useRequest<IBaseResponse<null>, [IMenu]>(createMenu);

const handleSubmit = async (data: IMenu) => {
  await fetch(data);
  success('菜单创建成功');
  // TODO: 创建成功后跳转到菜单列表页面
}
</script>
