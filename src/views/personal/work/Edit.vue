<template>
  <div class="page-personal-work-edit">
    <a-spin :spinning="spinning">
      <PersonalWorkForm
        title="编辑作品集"
        :confirm-loading="loading"
        :form-data="formData"
        :pictures="workPictures"
        :base-info="baseInfo"
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

import { getQueryString } from '@/utils/tools';
import { editPersonalWork } from '@/services';

import { useFetchPersonalWorkInfo } from '@/hooks/personal/work';
import PersonalWorkForm from '@/components/personal/work/Form.vue';
import { IPersonalWork, PersonalWorkPicture } from '@/types/personalWork';
import { computed } from 'vue';
import { SelectedPicture } from '@/types/picture';
import { SelectedPersonalBase } from '@/types/personalBase';

const router = useRouter();
const route = useRoute();

const id = Number(getQueryString(route.params, 'id'));

const { loading: spinning, personalWorkInfo } = useFetchPersonalWorkInfo(id);

const { loading, fetch } = useRequest<IBaseResponse<null>, [number, IPersonalWork]>(editPersonalWork);

const formData = computed<IPersonalWork | undefined>(() => {
  if (!personalWorkInfo.value) {
    return personalWorkInfo.value;
  }

  const {
    baseNickname,
    id,
    operator,
    createdTime,
    updatedTime,
    pictures,
    ...info
  } = personalWorkInfo.value;

  return {
    ...info,
    pictures: pictures.map(({ id }) => id)
  } as IPersonalWork;
});

const workPictures = computed<PersonalWorkPicture[] | undefined>(() => {
  if (!personalWorkInfo.value) return;
  const { pictures } = personalWorkInfo.value;

  return pictures;
});

const baseInfo = computed<SelectedPersonalBase | undefined>(() => {
  if (!personalWorkInfo.value) return;
  const { baseId, baseNickname } = personalWorkInfo.value;

  return {
    baseId,
    baseNickname
  }
});

const handleSubmit = async (data: IPersonalWork) => {
  await fetch(id, data);
  success('作品集编辑成功')
  router.push({ name: '作品集' });
}
</script>
