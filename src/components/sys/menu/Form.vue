<template>
  <form-page-card
    :title="title"
    :loading="confirmLoading"
    :handle-submit="handlePageCardSubmit"
    :handle-reset="resetFields">
    <a-form
      ref="formRef"
      class="menu-form"
      v-bind="layout"
      :model="formState"
      :rules="rules"
      :scrollToFirstError="true"
      @finish="handleSubmit">
      <a-form-item label="上级菜单" name="parentId">
        <MenuSelect v-model:value="formState.parentId" />
        <!-- <a-select v-model:value="formState.parentId">
          <a-select-option :value="0">一级菜单</a-select-option>
          <a-select-option :value="1">一级菜单</a-select-option>
        </a-select> -->
      </a-form-item>

      <a-form-item
        label="菜单名称"
        name="name">
        <a-input v-model:value="formState.name" />
      </a-form-item>

      <a-form-item
        label="菜单类型"
        name="type">
        <a-radio-group
          v-model:value="formState.type"
          name="type">
          <a-radio :value="1">菜单</a-radio>
          <a-radio :value="2">操作</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item
        v-if="formState.type === 2"
        label="权限代码"
        name="permission">
        <a-input v-model:value="formState.permission" />
      </a-form-item>

      <template v-else>
        <a-form-item
          label="页面路由"
          name="router">
          <a-input
            prefix="/"
            v-model:value="formState.router">
            <template #addonAfter>
              <a-button
                type="success"
                @click="handleGenerateRouter">
                <setting-outlined />
                生成路由
              </a-button>
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="组件路径"
          name="path">
          <a-input
            prefix="/src/views/"
            v-model:value="formState.path"
          />
        </a-form-item>

        <a-form-item
          label="菜单图标"
          name="icon">
          <a-input v-model:value="formState.icon" />
        </a-form-item>

        <a-form-item
          label="是否缓存"
          name="isCache">
          <a-radio-group
            v-model:value="formState.isCache"
            name="isCache">
            <a-radio :value="1">是</a-radio>
            <a-radio :value="0">否</a-radio>
          </a-radio-group>
        </a-form-item>
      </template>

      <a-form-item
        label="是否显示"
        name="isShow">
        <a-radio-group
          v-model:value="formState.isShow"
          name="isShow">
          <a-radio :value="1">是</a-radio>
          <a-radio :value="0">否</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item
        label="排序"
        name="sort">
        <a-input-number v-model:value="formState.sort" />
      </a-form-item>

      <a-form-item :wrapperCol="{ span: layout.wrapperCol.span, offset: layout.labelCol.span }">
        <FormOperations
          :loading="confirmLoading"
          :reset="resetFields"
        />
      </a-form-item>
    </a-form>
  </form-page-card>
</template>

<script setup lang="ts">
import { useFormRef } from '@/hooks/common';
import { IMenu } from '@/types/menu';
import { computed, ref, watch } from 'vue';
import { getNanoId } from '@/utils/tools';
import { permissionReg } from '@/utils/regexp';

import FormPageCard from '@/components/common/card/FormPageCard.vue';
import FormOperations from '@/components/common/form/FormOperations.vue';
import MenuSelect from './MenuSelect.vue';

const props = withDefaults(defineProps<{
  title: string;
  confirmLoading?: boolean;
  formData?: IMenu
}>(), {
  confirmLoading: false,
  formData: () => ({
    parentId: 0,
    name: '',
    type: 1,
    router: '',
    permission: '',
    path: '',
    icon: '',
    isCache: 0,
    isShow: 1,
    sort: 0
  })
});

const emit = defineEmits<{(e: 'submit', data: IMenu): void}>();

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 }
}

const formState = ref<IMenu>(props.formData);
watch(() => props.formData, () => {
  formState.value = props.formData;
})

const { formRef, resetFields } = useFormRef();

const defaultRules = {
  parentId: [{ required: true, type: 'number', message: '请选择上级菜单', trigger: 'change' }],
  name: [
    { required: true, message: '请输入菜单名称', trigger: 'blur' },
    { max: 32, message: '菜单名称不能超过32个字符', trigger: 'blur' }
  ]
}
const rules = computed(() => {
  if (formState.value.type === 1) {
    return defaultRules;
    // return formState.parentId === 0
    //   ? defaultRules
    //   : {
    //       ...defaultRules,
    //       router: [{ required: true, message: '请输入路由地址', trigger: 'blur' }],
    //       path: [{ required: true, message: '请输入组件路径', trigger: 'blur' }]
    //     }
  };

  return {
    ...defaultRules,
    permission: [
      { required: true, message: '请输入操作权限代码', trigger: 'blur' },
      { pattern: permissionReg, message: '请检测权限代码的格式', trigger: 'blur' }
    ]
  };
});

const handleGenerateRouter = () => {
  formState.value.router = `pages/${getNanoId()}`;
}

const handlePageCardSubmit = () => {
  formRef.value.validateFields().then((values: IMenu) => {
    handleSubmit(values);
  }).catch(() => {})
}

const handleSubmit = (values: IMenu) => {
  emit('submit', values);
}
</script>

<style lang="less" scoped>
.menu-form {
  :deep(.ant-input-group-addon) {
    background-color: transparent;
    border: 0;
  }
}
</style>
