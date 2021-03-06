import { reactive, toRaw } from 'vue';
import { Form } from 'ant-design-vue';
import { Props, ValidateInfo, validateOptions } from 'ant-design-vue/lib/form/useForm';
import { isFunction } from 'lodash';
import { UnwrapNestedRefs } from '@vue/reactivity';
import { RuleError } from 'ant-design-vue/lib/form/interface';

interface IReturn<T> {
  modelRef: UnwrapNestedRefs<T>;
  resetFields: (newValues?: Props | undefined) => void;
  submit: () => void;
  validateField: (name: string, value: any, rules: Record<string, unknown>[], option?: validateOptions | undefined) => Promise<RuleError[]>
  validateInfos: {
    [key: string]: ValidateInfo
  };
}

function useForm<T extends Props> (data: T, handleSuccess: (value: T) => any): IReturn<T>
// eslint-disable-next-line no-redeclare
function useForm<T extends Props> (data: T, handleSuccess: (value: T) => any, handleError: (value: any) => any): IReturn<T>
// eslint-disable-next-line no-redeclare
function useForm<T extends Props> (data: T, rules: Props, handleSuccess: (value: T) => any): IReturn<T>
// eslint-disable-next-line no-redeclare
function useForm<T extends Props> (data: T, rules: Props, handleSuccess: (value: T) => any, handleError: (value: any) => any): IReturn<T>
// eslint-disable-next-line no-redeclare
function useForm<T extends Props> (data: T, rules?: Props, handleSuccess?: (value: T) => any, handleError?: (value: any) => any): IReturn<T> {
  const modelRef = reactive(data);

  let _rules: Props | undefined;
  let success: ((value: T) => any) | undefined;
  let error: ((value: any) => any) | undefined;

  if (isFunction(rules)) {
    success = rules;
    error = handleSuccess;
  } else {
    _rules = rules;
    success = handleSuccess;
    error = handleError;
  }

  const { resetFields, validate, validateField, validateInfos } = Form.useForm(modelRef, _rules);

  const submit = () => {
    validate().then(() => {
      success && success(toRaw(modelRef));
    }).catch((err) => {
      error && error(err);
    });
  }

  return {
    // @ts-ignore
    modelRef,
    resetFields,
    submit,
    validateField,
    validateInfos
  }
};

export default useForm;
