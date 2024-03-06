<template>
  <div class="form-container">
    <a-form
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :colon="colon"
    >
      <slot
        name="form-items"
        :form-items="formItems"
        :validate-infos="validateInfos"
        :on-submit="onSubmit"
        :reset-fields="resetFields"
      >
        <a-form-item
          v-for="formItem of formItems"
          :key="formItem.name"
          :label="formItem.label"
          :label-col="formItem.labelCol"
          :label-align="formItem.labelAlign"
          :wrapper-col="formItem.wrapperCol"
          v-bind="!mergeErrorInfos ? validateInfos[formItem.name as string] : {}"
        >
          <slot
            :name="formItem.customRender"
            :item="formItem"
            :model-ref="modelRef"
          >
            <component
              :is="`a-${formItem.type}`"
              allow-clear
              :placeholder="`请${formItem.type === 'select' ? '选择' : '填写'}${formItem.label ?? ''}`"
              v-bind="(formItem as any)"
              v-on="formItem.on ?? {}"
              v-model:value="modelRef[formItem.name as string]"
            />
          </slot>
        </a-form-item>
        <a-form-item
          :wrapper-col="{
            span: wrapperCol.span,
            offset: labelCol.span
          }"
        >
          <slot
            name="footer"
            :confirm-loading="confirmLoading"
            :on-submit="onSubmit"
            :reset-fields="resetFields"
          >
            <a-space>
              <a-button
                type="primary"
                :loading="confirmLoading"
                @click.prevent="onSubmit"
              >
                <SaveOutlined />
                提交
              </a-button>

              <a-button
                @click="resetFields"
              >
                <ReloadOutlined />
                重置
              </a-button>
            </a-space>
          </slot>
        </a-form-item>
      </slot>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash'
import { useForm } from 'ant-design-vue/es/form'
import type { FormItem, Col } from '@/types/common'
import { error, success } from '@/utils/http'

const props = withDefaults(defineProps<{
  formItems: FormItem[]
  formData?: Record<string, any>
  labelCol?: Col
  wrapperCol?: Col
  mergeErrorInfos?: boolean
  colon?: boolean
  submitHandler?: (data?: Record<string, any>) => Promise<any>
}>(), {
  formData: () => ({}),
  formItems: () => [],
  labelCol: () => ({ span: 6 }),
  wrapperCol: () => ({ span: 18 }),
  colon: true,
  mergeErrorInfos: false,
  submitHandler: () => async () => {}
})

const emits = defineEmits<{
  (e: 'success', value: any): void
  (e: 'error', value: any): void
}>()

const modelRef = ref<Record<string, any>>(
  {
    ...props.formItems.reduce((rules: Record<string, any>, item) => {
      rules[item.name as string] = item.value ?? item.initialValue
      return rules
    }, {}),
    ...props.formData
  }
)
const confirmLoading = ref(false)

const rulesRef = computed(() => props.formItems.reduce((rules: any, item) => {
  if (item.rules) {
    rules[item.name as string] = item.rules
  }
  return rules
}, {}))

const { resetFields, validate, validateInfos, mergeValidateInfo } = useForm(modelRef, rulesRef)

const errorInfos = computed(() => {
  return mergeValidateInfo(_.toArray(validateInfos))
})

watch(() => props.formData, val => {
  modelRef.value = { ...val }
}, { deep: true })

const onSubmit = () => {
  validate()
    .then(async () => {
      confirmLoading.value = true

      try {
        const res = await props.submitHandler(modelRef.value)

        if (res?.code !== 200) {
          throw res
        }

        success(`${res?.message}` ?? '操作成功')

        emits('success', res?.data)
      } catch (err) {
        error((err as Error)?.message ?? '服务器出错，请稍候再试')

        emits('error', err)
      } finally {
        confirmLoading.value = false
      }
    })
}

defineExpose({
  modelRef,
  errorInfos,
  confirmLoading,
  resetFields,
  validate
})
</script>
