import { ref } from 'vue';
import { NamePath } from 'ant-design-vue/lib/form/interface';

type ScrollBehavior = 'smooth' | 'auto';

interface ScrollOptions {
  behavior?: ScrollBehavior;
}

export default function useFormRef () {
  const formRef = ref();

  const validate = async (nameList?: NamePath[]) => {
    return await formRef.value.validate(nameList);
  }

  const scrollToField = (name: NamePath, options?: ScrollOptions[]) => {
    formRef.value.scrollToField(name, options);
  }

  const resetFields = () => {
    formRef.value.resetFields();
  }

  const clearValidate = (name?: string | NamePath[]) => {
    formRef.value.clearValidate(name)
  }

  return {
    formRef,
    validate,
    scrollToField,
    resetFields,
    clearValidate
  }
}
