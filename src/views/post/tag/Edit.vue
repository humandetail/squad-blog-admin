<template>
  <div class="page-post-tag-edit">
    <a-spin :spinning="spinning">
      <PostTag
        title="编辑文章标签"
        :confirm-loading="loading"
        :form-data="postTagInfo"
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

import PostTag from '@/components/post/tag/Form.vue';
import { getQueryString } from '@/utils/tools';
import { editPostTag } from '@/services';
import { IPostTag } from '@/types/postTag';
import { useFetchPostTagInfo } from '@/hooks/post/tag';

const router = useRouter();
const route = useRoute();

const id = Number(getQueryString(route.params, 'id'));

const { loading: spinning, postTagInfo } = useFetchPostTagInfo(id);

const { loading, fetch } = useRequest<IBaseResponse<null>, [number, IPostTag]>(editPostTag);

const handleSubmit = async (data: IPostTag) => {
  await fetch(id, data);
  success('文章标签编辑成功')
  router.push({ name: '文章标签管理' });
}
</script>
