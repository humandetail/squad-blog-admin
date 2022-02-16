import { ref, onMounted } from 'vue';
import { getTemplateInfo } from '@/services';
import { useRequest } from '@/hooks/common';
import { IBaseResponse } from '@/types/common';
import { ITemplateItem } from '@/types/template';

const useFetchTemplateInfo = (id: number) => {
  const templateInfo = ref<ITemplateItem>();
  const { loading, fetch } = useRequest<IBaseResponse<ITemplateItem>, [number]>(getTemplateInfo);

  onMounted(async () => {
    const res = await fetch(id);
    templateInfo.value = res.data;
  });

  return {
    loading,
    templateInfo
  }
}

export default useFetchTemplateInfo;
