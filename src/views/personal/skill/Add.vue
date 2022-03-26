<template>
  <div class="page-personal-skill-add">
    <PersonalSkillForm
      title="新增个人技能"
      :confirm-loading="loading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { useRequest } from '@/hooks/common';
import { createPersonalSkill } from '@/services';
import { IBaseResponse } from '@/types/common';
import { success } from '@/utils/http';
import { useRouter } from 'vue-router';

import PersonalSkillForm from '@/components/personal/skill/Form.vue';
import { IPersonalSkill } from '@/types/personalSkill';

const router = useRouter();

const { loading, fetch } = useRequest<IBaseResponse<null>, [IPersonalSkill]>(createPersonalSkill);

const handleSubmit = async (data: IPersonalSkill) => {
  await fetch(data);
  success('个人技能创建成功');
  router.push({ name: '个人技能' });
}
</script>
