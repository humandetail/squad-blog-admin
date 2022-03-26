<template>
  <div class="page-resource-picture-category-edit">
    <a-spin :spinning="spinning">
      <PictureCategory
        title="编辑图片分类"
        :confirm-loading="loading"
        :form-data="pictureCategoryInfo"
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

import PictureCategory from '@/components/resource/picture/category/Form.vue';
import { getQueryString } from '@/utils/tools';
import { editPictureCategory } from '@/services';
import { IPictureCategory } from '@/types/pictureCategory';
import useFetchPictureCategoryInfo from '@/hooks/resource/picture/category/useFetchPictureCategoryInfo';

const router = useRouter();
const route = useRoute();

const id = Number(getQueryString(route.params, 'id'));

const { loading: spinning, pictureCategoryInfo } = useFetchPictureCategoryInfo(id);

const { loading, fetch } = useRequest<IBaseResponse<null>, [number, IPictureCategory]>(editPictureCategory);

const handleSubmit = async (data: IPictureCategory) => {
  await fetch(id, data);
  success('图片分类编辑成功')
  router.push({ name: '图片分类管理' });
}
</script>
