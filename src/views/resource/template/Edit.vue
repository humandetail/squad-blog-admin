<template>
  <div class="page-resource-template-edit">
    <a-spin :spinning="spinning">
      <TemplateForm
        title="编辑图片"
        :confirm-loading="loading"
        :form-data="templateInfo"
        :is-edit="true"
        @submit="handleSubmit"
      />
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import { useRequest } from '@/hooks/common';
import { useFetchPictureInfo } from '@/hooks/resource/picture';
import { editPicture, editTemplate } from '@/services';
import { IBaseResponse } from '@/types/common';
import { IPicture } from '@/types/picture';
import { success } from '@/utils/http';
import { getQueryString } from '@/utils/tools';
import { useRoute, useRouter } from 'vue-router';
import TemplateForm from '@/components/resource/template/Form.vue';
import { ITemplate } from '@/types/template';
import { useFetchTemplateInfo } from '@/hooks/resource/template';

const route = useRoute();
const router = useRouter();

const id = Number(getQueryString(route.params, 'id'));

const { loading: spinning, templateInfo } = useFetchTemplateInfo(id);

const { loading, fetch } = useRequest<IBaseResponse<null>, [number, ITemplate]>(editTemplate);

const handleSubmit = async (data: ITemplate) => {
  await fetch(id, data);
  success('文章模板编辑成功')
  router.push({ name: '文章模板管理' });
}
</script>
