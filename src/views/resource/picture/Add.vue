<template>
  <div class="page-resource-picture-add">
    <PictureForm
      title="新增图片"
      :confirm-loading="loading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { useRequest } from '@/hooks/common';
import { createPicture } from '@/services';
import { IBaseResponse } from '@/types/common';
import { success } from '@/utils/http';
import { useRouter } from 'vue-router';

import PictureForm from '@/components/resource/picture/picture/form/index.vue';
import { IPicture, IPictureItem } from '@/types/picture';

const router = useRouter();

const { loading, fetch } = useRequest<IBaseResponse<IPictureItem>, [IPicture]>(createPicture);

const handleSubmit = async (data: IPicture) => {
  await fetch(data);
  success('图片创建成功');
  router.push({ name: '图片管理' });
}
</script>
