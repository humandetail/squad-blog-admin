<template>
  <form-page-card
    :title="title"
    :loading="confirmLoading"
    :handle-submit="handlePageCardSubmit"
    :handle-reset="resetFields">
    <a-form
      ref="formRef"
      class="personal-skill-form"
      v-bind="layout"
      :model="formState"
      :rules="rules"
      :scrollToFirstError="true"
      @finish="handleSubmit">
      <a-form-item
        label="图标"
        name="iconId">
        <Picturereview
          v-if="previewItem"
          :url="previewItem.url"
          width="80px"
          height="80px"
        />
        <a-button
          type="primary"
          success
          @click="pictureSelectorVisible = true">
          选择图片
        </a-button>
      </a-form-item>

      <a-form-item
        label="挂载点"
        name="baseId">
        <span
          v-if="selectedBaseItem"
          class="ant-form-text">
          {{ selectedBaseItem.baseNickname }}
        </span>
        <a-button
          type="primary"
          success
          @click="baseSelectorVisible = true">
          选择挂载点
        </a-button>
      </a-form-item>

      <a-form-item
        label="技能名称"
        name="name">
        <a-input
          v-model:value="formState.name"
        />
      </a-form-item>

      <a-form-item
        label="技能说明"
        name="description">
        <a-textarea
          v-model:value="formState.description"
        />
      </a-form-item>

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

    <PictureSelectorModal
      v-show="pictureSelectorVisible"
      :show="pictureSelectorVisible"
      :multiple="false"
      @change="handleSelectorChange"
      @close="pictureSelectorVisible = false"
    />

    <BaseSelectorModal
      v-if="baseSelectorVisible"
      @close="baseSelectorVisible = false"
      @select="handleBaseSelect"
    />
  </form-page-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import FormPageCard from '@/components/common/card/FormPageCard.vue';
import { useDefineAsyncComponent, useFormRef } from '@/hooks/common';
import { personalSkillMsg } from '@/config/validateMessage';
import { IPersonalSkill } from '@/types/personalSkill';

import Picturereview from '@/components/resource/picture/picture/form/Preview.vue';
import FormOperations from '@/components/common/form/FormOperations.vue';

import { SelectedPicture } from '@/types/picture';
import { IPersonalBaseItem, SelectedPersonalBase } from '@/types/personalBase';

const PictureSelectorModal = useDefineAsyncComponent('/components/resource/picture/picture/PictureSelectorModal.vue');
const BaseSelectorModal = useDefineAsyncComponent('/components/personal/base/BaseSelector.vue');

const props = withDefaults(defineProps<{
  title: string;
  confirmLoading?: boolean;
  formData?: IPersonalSkill;
  avatarInfo?: SelectedPicture;
  baseInfo?: SelectedPersonalBase;
}>(), {
  confirmLoading: false,
  formData: () => ({
    name: '',
    iconId: 0,
    baseId: 0,
    description: '',
    isShow: 1,
    sort: 0
  })
});

const previewItem = ref<SelectedPicture>();
const selectedBaseItem = ref<SelectedPersonalBase>();
const pictureSelectorVisible = ref(false);
const baseSelectorVisible = ref(false);

const formState = ref<IPersonalSkill>(props.formData);
watch(() => props.formData, () => {
  formState.value = props.formData;
})

watch(() => props.avatarInfo, (info) => {
  if (info) {
    previewItem.value = info;
  }
});

watch(() => props.baseInfo, (info) => {
  if (info) {
    selectedBaseItem.value = info;
  }
});

const emit = defineEmits<{(e: 'submit', values: IPersonalSkill): void}>();

const { formRef, resetFields } = useFormRef();

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 }
}

const rules = {
  name: [
    { required: true, message: personalSkillMsg.name.required, trigger: 'blur' },
    { min: 2, message: personalSkillMsg.name.min, trigger: 'blur' },
    { max: 32, message: personalSkillMsg.name.max, trigger: 'blur' }
  ],
  description: [
    { required: true, message: personalSkillMsg.description.required, trigger: 'blur' },
    { max: 255, message: personalSkillMsg.description.max, trigger: 'blur' }
  ],
  iconId: [
    {
      required: true,
      validator: (_rule: any, value: number) => {
        if (value <= 0) {
          return Promise.reject(personalSkillMsg.iconId.required)
        }
        return Promise.resolve();
      },
      trigger: 'change'
    }
  ],
  baseId: [
    {
      required: true,
      validator: (_rule: any, value: number) => {
        if (value <= 0) {
          return Promise.reject(personalSkillMsg.baseId.required)
        }
        return Promise.resolve();
      },
      trigger: 'change'
    }
  ]
};

const handleSelectorChange = (item: SelectedPicture) => {
  formState.value.iconId = item.id;
  previewItem.value = item;
  pictureSelectorVisible.value = false;
}

const handleBaseSelect = (item: IPersonalBaseItem) => {
  formState.value.baseId = item.id;
  selectedBaseItem.value = {
    baseId: item.id,
    baseNickname: item.nickname
  }
  baseSelectorVisible.value = false;
}

const handlePageCardSubmit = () => {
  formRef.value.validateFields().then((data: IPersonalSkill) => {
    handleSubmit(data);
  }).catch(() => {})
}

const handleSubmit = (values: IPersonalSkill) => {
  emit('submit', values);
}
</script>

<style lang="less" scoped>
.ant-form-text {
  line-height: 32px;
  color: @primary-color;
}
</style>
