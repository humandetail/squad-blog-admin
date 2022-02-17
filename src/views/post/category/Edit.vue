<template>
  <div class="page-post-category-edit">
    <a-spin :spinning="spinning">
      <PostCategory
        title="编辑文章分类"
        :confirm-loading="loading"
        :form-data="postCategoryInfo"
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

import PostCategory from '@/components/post/category/Form.vue';
import { getQueryString } from '@/utils/tools';
import { editPostCategory } from '@/services';
import { IPostCategory } from '@/types/postCategory';
import { useFetchPostCategoryInfo } from '@/hooks/post/category';

const router = useRouter();
const route = useRoute();

const id = Number(getQueryString(route.params, 'id'));

const { loading: spinning, postCategoryInfo } = useFetchPostCategoryInfo(id);

const { loading, fetch } = useRequest<IBaseResponse<null>, [number, IPostCategory]>(editPostCategory);

const handleSubmit = async (data: IPostCategory) => {
  await fetch(id, data);
  success('文章分类编辑成功')
  router.push({ name: '文章分类管理' });
}
</script>
