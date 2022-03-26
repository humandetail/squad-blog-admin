<template>
  <div class="page-resource-picture-edit">
    <a-spin :spinning="spinning">
      <PictureForm
        title="编辑图片"
        :confirm-loading="loading"
        :form-data="pictureInfo"
        :is-edit="true"
        @submit="handleSubmit"
      />
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import PictureForm from '@/components/resource/picture/picture/form/index.vue';
import { useRequest } from '@/hooks/common';
import { useFetchPictureInfo } from '@/hooks/resource/picture';
import { editPicture } from '@/services';
import { IBaseResponse } from '@/types/common';
import { IPicture } from '@/types/picture';
import { success } from '@/utils/http';
import { getQueryString } from '@/utils/tools';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const id = Number(getQueryString(route.params, 'id'));

const { loading: spinning, pictureInfo } = useFetchPictureInfo(id);

const { loading, fetch } = useRequest<IBaseResponse<null>, [number, IPicture]>(editPicture);

const handleSubmit = async (data: IPicture) => {
  await fetch(id, data);
  success('图片编辑成功')
  router.push({ name: '图片管理' });
}
</script>
