<template>
  <div class="page-post-category-add">
    <PostCategoryForm
      title="新增文章分类"
      :confirm-loading="loading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { useRequest } from '@/hooks/common';
import { createPostCategory } from '@/services';
import { IBaseResponse } from '@/types/common';
import { success } from '@/utils/http';
import { useRouter } from 'vue-router';

import PostCategoryForm from '@/components/post/category/Form.vue';
import { IPostCategory } from '@/types/postCategory';

const router = useRouter();

const { loading, fetch } = useRequest<IBaseResponse<null>, [IPostCategory]>(createPostCategory);

const handleSubmit = async (data: IPostCategory) => {
  await fetch(data);
  success('文章分类创建成功');
  router.push({ name: '文章分类管理' });
}
</script>
