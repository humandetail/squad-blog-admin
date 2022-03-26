<template>
  <div class="page-personal-base-add">
    <PersonalBaseForm
      title="新增基本信息"
      :confirm-loading="loading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { useRequest } from '@/hooks/common';
import { createPersonalBase } from '@/services';
import { IBaseResponse } from '@/types/common';
import { success } from '@/utils/http';
import { useRouter } from 'vue-router';

import PersonalBaseForm from '@/components/personal/base/Form.vue';
import { IPersonalBase } from '@/types/personalBase';

const router = useRouter();

const { loading, fetch } = useRequest<IBaseResponse<null>, [IPersonalBase]>(createPersonalBase);

const handleSubmit = async (data: IPersonalBase) => {
  await fetch(data);
  success('基本信息创建成功');
  router.push({ name: '基本信息' });
}
</script>
