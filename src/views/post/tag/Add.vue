<template>
  <div class="page-post-tag-add">
    <PostTagForm
      title="新增文章标签"
      :confirm-loading="loading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { useRequest } from '@/hooks/common';
import { createPostTag } from '@/services';
import { IBaseResponse } from '@/types/common';
import { success } from '@/utils/http';
import { useRouter } from 'vue-router';

import PostTagForm from '@/components/post/tag/Form.vue';
import { IPostTag } from '@/types/postTag';

const router = useRouter();

const { loading, fetch } = useRequest<IBaseResponse<null>, [IPostTag]>(createPostTag);

const handleSubmit = async (data: IPostTag) => {
  await fetch(data);
  success('文章标签创建成功');
  router.push({ name: '文章标签管理' });
}
</script>
