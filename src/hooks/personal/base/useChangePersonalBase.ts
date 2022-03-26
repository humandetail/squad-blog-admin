import { ref } from 'vue';
import { IPersonalBaseItem } from '@/types/personalBase';
import { editPersonalSkill } from '@/services';
import { IPersonalSkill, IPersonalSkillItem } from '@/types/personalSkill';
import { IBaseResponse } from '@/types/common';
import { useRequest } from '@/hooks/common';
import { success } from '@/utils/http';

const useChangePersonalBase = (callback: () => void) => {
  const baseSelectorVisible = ref(false);
  const currentRow = ref<IPersonalSkillItem | null>(null);

  const { loading, fetch } = useRequest<IBaseResponse<null>, [number, IPersonalSkill]>(editPersonalSkill);

  const handleChangeBase = (row: IPersonalSkillItem) => {
    currentRow.value = row;
    baseSelectorVisible.value = true;
  }

  const handleCloseBaseSelector = () => {
    baseSelectorVisible.value = false;
    currentRow.value = null;
  }

  const handleBaseSelect = async (item: IPersonalBaseItem) => {
    if (!currentRow.value) {
      return;
    }
    const { id, name, iconId, description, sort, isShow } = currentRow.value;
    await fetch(id, {
      name,
      iconId,
      description,
      sort,
      isShow,
      baseId: item.id
    });

    handleCloseBaseSelector();
    success('操作成功');
    callback();
  }

  return {
    loading,
    baseSelectorVisible,
    currentRow,
    handleChangeBase,
    handleCloseBaseSelector,
    handleBaseSelect
  }
}

export default useChangePersonalBase;
