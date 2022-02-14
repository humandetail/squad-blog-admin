<template>
  <div class="page-resource-picture-category-edit">
    <a-spin :spinning="spinning">
      <BlogrollForm
        title="编辑图片分类"
        :confirm-loading="loading"
        :form-data="blogrollInfo"
        @submit="handleSubmit"
      />
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useRequest } from '@/hooks/common';
import { IBaseResponse } from '@/types/common';
import { success } from '@/utils/http';

import BlogrollForm from '@/components/resource/blogroll/Form.vue';
import { getQueryString } from '@/utils/tools';
import { editBlogroll } from '@/services';
import { IBlogroll } from '@/types/blogroll';
import { useFetchBlogrollInfo } from '@/hooks/resource/blogroll';

const router = useRouter();
const route = useRoute();

const id = Number(getQueryString(route.params, 'id'));

const { loading: spinning, blogrollInfo } = useFetchBlogrollInfo(id);

const { loading, fetch } = useRequest<IBaseResponse<null>, [number, IBlogroll]>(editBlogroll);

const handleSubmit = async (data: IBlogroll) => {
  await fetch(id, data);
  success('友情链接编辑成功')
  router.push({ name: '友情链接管理' });
}
</script>
