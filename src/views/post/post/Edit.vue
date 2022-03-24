<template>
  <div class="page-post-tag-edit">
    <a-spin :spinning="spinning">
      <PostForm
        title="编辑文章"
        :confirm-loading="loading"
        :form-data="formData"
        :cover-info="coverInfo"
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

import PostForm from '@/components/post/post/Form.vue';
import { getQueryString } from '@/utils/tools';
import { editPost } from '@/services';
import { useFetchPostInfo } from '@/hooks/post/post';
import { IPost } from '@/types/post';
import { computed } from 'vue';
import { SelectedPicture } from '@/types/picture';

const router = useRouter();
const route = useRoute();

const id = getQueryString(route.params, 'id');

const { loading: spinning, postInfo } = useFetchPostInfo(id);

const formData = computed<IPost | undefined>(() => {
  if (!postInfo.value) {
    return postInfo.value;
  }

  const {
    title,
    summary,
    content,
    author,
    source,
    recommendationIndex,
    seoTitle,
    seoDescription,
    seoKeywords,
    categoryId,
    coverId,
    templateId,
    tags,
    isShow
  } = postInfo.value;

  return {
    title,
    summary,
    content: content || '',
    author,
    source,
    recommendationIndex,
    seoTitle,
    seoKeywords,
    seoDescription,
    categoryId,
    coverId,
    templateId,
    tags: tags.map(({ id }) => id),
    isShow,
    sort: 0
  } as IPost;
});

const coverInfo = computed<SelectedPicture | undefined>(() => {
  if (!postInfo.value) return;
  const { coverId, coverPic } = postInfo.value;

  return {
    id: coverId,
    name: '',
    url: coverPic
  }
})

const { loading, fetch } = useRequest<IBaseResponse<null>, [string, IPost]>(editPost);

const handleSubmit = async (data: IPost) => {
  await fetch(id, data);
  success('文章编辑成功')
  router.push({ name: '所有文章' });
}
</script>
