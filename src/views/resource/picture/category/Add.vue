<template>
  <div class="page-resource-picture-category-add">
    <PictureCategoryForm
      title="新增图片分类"
      :confirm-loading="loading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { useRequest } from '@/hooks/common';
import { createPictureCategory } from '@/services';
import { IBaseResponse } from '@/types/common';
import { success } from '@/utils/http';
import { useRouter } from 'vue-router';

import PictureCategoryForm from '@/components/resource/picture/category/Form.vue';
import { IPictureCategory } from '@/types/pictureCategory';

const router = useRouter();

const { loading, fetch } = useRequest<IBaseResponse<null>, [IPictureCategory]>(createPictureCategory);

const handleSubmit = async (data: IPictureCategory) => {
  await fetch(data);
  success('图片分类创建成功');
  router.push({ name: '图片分类管理' });
}
</script>
