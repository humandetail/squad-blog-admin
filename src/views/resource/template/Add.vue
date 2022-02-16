<template>
  <div class="page-resource-template-add">
    <TemplateForm
      title="新增文章模板"
      :confirm-loading="loading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { useRequest } from '@/hooks/common';
import { createTemplate } from '@/services';
import { IBaseResponse } from '@/types/common';
import { success } from '@/utils/http';
import { useRouter } from 'vue-router';

import TemplateForm from '@/components/resource/template/Form.vue';
import { ITemplate } from '@/types/template';

const router = useRouter();

const { loading, fetch } = useRequest<IBaseResponse<null>, [ITemplate]>(createTemplate);

const handleSubmit = async (data: ITemplate) => {
  await fetch(data);
  success('文章模板创建成功');
  router.push({ name: '文章模板管理' });
}
</script>
