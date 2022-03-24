<template>
  <div class="page-personal-base-edit">
    <a-spin :spinning="spinning">
      <PersonalBaseForm
        title="编辑基本信息"
        :confirm-loading="loading"
        :form-data="personalBaseInfo"
        :avatar-info="avatarInfo"
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
import { editPersonalBase } from '@/services';

import { useFetchPersonalBaseInfo } from '@/hooks/personal/base';
import PersonalBaseForm from '@/components/personal/base/Form.vue';
import { IPersonalBase } from '@/types/personalBase';
import { computed } from 'vue';
import { SelectedPicture } from '@/types/picture';

const router = useRouter();
const route = useRoute();

const id = Number(getQueryString(route.params, 'id'));

const { loading: spinning, personalBaseInfo } = useFetchPersonalBaseInfo(id);

const { loading, fetch } = useRequest<IBaseResponse<null>, [number, IPersonalBase]>(editPersonalBase);

const formData = computed<IPersonalBase | undefined>(() => {
  if (!personalBaseInfo.value) {
    return personalBaseInfo.value;
  }

  const {
    avatarPic,
    createdTime,
    id,
    operator,
    updatedTime,
    userId,
    username,
    ...info
  } = personalBaseInfo.value;

  return info as IPersonalBase;
});

const avatarInfo = computed<SelectedPicture | undefined>(() => {
  if (!personalBaseInfo.value) return;
  const { avatarId, avatarPic } = personalBaseInfo.value;

  return {
    id: avatarId,
    name: '',
    url: avatarPic
  }
})

const handleSubmit = async (data: IPersonalBase) => {
  await fetch(id, data);
  success('基本编辑成功')
  router.push({ name: '基本信息' });
}
</script>
