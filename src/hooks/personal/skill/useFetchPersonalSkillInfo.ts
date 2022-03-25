import { ref, onMounted } from 'vue';
import { getPersonalSkillInfo, getPostCategoryInfo } from '@/services';
import { useRequest } from '@/hooks/common';
import { IBaseResponse } from '@/types/common';
import { IPersonalSkillItem } from '@/types/personalSkill';

const useFetchPersonalSkillInfo = (id: number) => {
  const personalSkillInfo = ref<IPersonalSkillItem>();
  const { loading, fetch } = useRequest<IBaseResponse<IPersonalSkillItem>, [number]>(getPersonalSkillInfo);

  onMounted(async () => {
    const res = await fetch(id);
    personalSkillInfo.value = res.data;
  });

  return {
    loading,
    personalSkillInfo
  }
}

export default useFetchPersonalSkillInfo;
