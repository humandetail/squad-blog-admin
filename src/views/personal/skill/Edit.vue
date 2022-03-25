<template>
  <div class="page-personal-skill-edit">
    <a-spin :spinning="spinning">
      <PersonalSkillForm
        title="编辑个人技能"
        :confirm-loading="loading"
        :form-data="formData"
        :avatar-info="avatarInfo"
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
import { editPersonalSkill } from '@/services';

import { useFetchPersonalSkillInfo } from '@/hooks/personal/skill';
import PersonalSkillForm from '@/components/personal/skill/Form.vue';
import { IPersonalSkill } from '@/types/personalSkill';
import { computed } from 'vue';
import { SelectedPicture } from '@/types/picture';
import { SelectedPersonalBase } from '@/types/personalBase';

const router = useRouter();
const route = useRoute();

const id = Number(getQueryString(route.params, 'id'));

const { loading: spinning, personalSkillInfo } = useFetchPersonalSkillInfo(id);

const { loading, fetch } = useRequest<IBaseResponse<null>, [number, IPersonalSkill]>(editPersonalSkill);

const formData = computed<IPersonalSkill | undefined>(() => {
  if (!personalSkillInfo.value) {
    return personalSkillInfo.value;
  }

  const {
    baseNickname,
    iconPic,
    id,
    operator,
    createdTime,
    updatedTime,
    ...info
  } = personalSkillInfo.value;

  return info as IPersonalSkill;
});

const avatarInfo = computed<SelectedPicture | undefined>(() => {
  if (!personalSkillInfo.value) return;
  const { iconId, iconPic } = personalSkillInfo.value;

  return {
    id: iconId,
    name: '',
    url: iconPic
  }
});

const baseInfo = computed<SelectedPersonalBase | undefined>(() => {
  if (!personalSkillInfo.value) return;
  const { baseId, baseNickname } = personalSkillInfo.value;

  return {
    baseId,
    baseNickname
  }
});

const handleSubmit = async (data: IPersonalSkill) => {
  await fetch(id, data);
  success('个人捅编辑成功')
  router.push({ name: '个人信息' });
}
</script>
