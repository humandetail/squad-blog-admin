<template>
  <div class="page-resource-blogroll-add">
    <BlogrollForm
      title="新增友情链接"
      :confirm-loading="loading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { useRequest } from '@/hooks/common';
import { createBlogroll } from '@/services';
import { IBaseResponse } from '@/types/common';
import { success } from '@/utils/http';
import { useRouter } from 'vue-router';

import BlogrollForm from '@/components/resource/blogroll/Form.vue';
import { IBlogroll } from '@/types/blogroll';

const router = useRouter();

const { loading, fetch } = useRequest<IBaseResponse<null>, [IBlogroll]>(createBlogroll);

const handleSubmit = async (data: IBlogroll) => {
  await fetch(data);
  success('友情链接创建成功');
  router.push({ name: '友情链接管理' });
}
</script>
