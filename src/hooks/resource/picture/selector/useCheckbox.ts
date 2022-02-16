import { RecordType } from '@/types/common';
import { watch } from 'fs';
import _ from 'lodash';
import { ref } from 'vue';

const useCheckbox = () => {
  const checkedKeys = ref<Array<number | string>>([]);

  const handleCheckboxChange = (id: number | string) => {
    if (checkedKeys.value.includes(id)) {
      checkedKeys.value = checkedKeys.value.filter((key) => key !== id);
    } else {
      checkedKeys.value.push(id);
    }
  }

  const handleCheckAll = (list: Array<{ id: number | string } & RecordType>, e: any) => {
    if (!_.isEmpty(checkedKeys.value)) {
      if (list.length === checkedKeys.value.length) {
        checkedKeys.value = [];
      } else {
        checkedKeys.value = list.map(({ id }) => id);
      }
    } else {
      checkedKeys.value = list.map(({ id }) => id);
    }
  }

  return {
    checkedKeys,
    handleCheckboxChange,
    handleCheckAll
  }
}

export default useCheckbox;
