<template>
  <div class="page-personal-work-add">
    <PersonalWorkForm
      title="新增作品集"
      :confirm-loading="loading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { useRequest } from '@/hooks/common';
import { createPersonalWork } from '@/services';
import { IBaseResponse } from '@/types/common';
import { success } from '@/utils/http';
import { useRouter } from 'vue-router';

import PersonalWorkForm from '@/components/personal/work/Form.vue';
import { IPersonalWork } from '@/types/personalWork';

const router = useRouter();

const { loading, fetch } = useRequest<IBaseResponse<null>, [IPersonalWork]>(createPersonalWork);

const handleSubmit = async (data: IPersonalWork) => {
  await fetch(data);
  success('作品集创建成功');
  router.push({ name: '作品集' });
}
</script>
