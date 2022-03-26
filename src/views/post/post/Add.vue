<template>
  <div class="page-post-post-add">
    <PostForm
      title="新增文章"
      :confirm-loading="loading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { useRequest } from '@/hooks/common';
import { createPost } from '@/services';
import { IBaseResponse } from '@/types/common';
import { success } from '@/utils/http';
import { useRouter } from 'vue-router';

import PostForm from '@/components/post/post/Form.vue';
import { IPost } from '@/types/post';

const router = useRouter();

const { loading, fetch } = useRequest<IBaseResponse<null>, [IPost]>(createPost);

const handleSubmit = async (data: IPost) => {
  await fetch(data);
  success('文章创建成功');
  router.push({ name: '所有文章' });
}
</script>
