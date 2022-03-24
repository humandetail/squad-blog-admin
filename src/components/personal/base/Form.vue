<template>
  <form-page-card
    :title="title"
    :loading="confirmLoading"
    :handle-submit="handlePageCardSubmit"
    :handle-reset="resetFields">
    <a-form
      ref="formRef"
      class="personal-base-form"
      v-bind="layout"
      :model="formState"
      :rules="rules"
      :scrollToFirstError="true"
      @finish="handleSubmit">
      <a-form-item
        label="头像"
        name="avatarId">
        <Picturereview
          v-if="previewItem"
          :url="previewItem.url"
        />
        <a-button
          type="primary"
          success
          @click="pictureSelectorVisible = true">
          选择图片
        </a-button>
      </a-form-item>

      <a-form-item
        label="昵称"
        name="nickname">
        <a-input
          v-model:value="formState.nickname"
        />
      </a-form-item>

      <a-form-item
        label="QQ"
        name="qq">
        <a-input
          v-model:value="formState.qq"
        />
      </a-form-item>

      <a-form-item
        label="Blog"
        name="blog">
        <a-input
          v-model:value="formState.blog"
        />
      </a-form-item>

      <a-form-item
        label="GitHub"
        name="github">
        <a-input
          v-model:value="formState.github"
        />
      </a-form-item>

      <a-form-item
        label="Email"
        name="email">
        <a-input
          v-model:value="formState.email"
        />
      </a-form-item>

      <a-form-item
        label="简介"
        name="intro">
        <a-textarea
          v-model:value="formState.intro"
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
        label="是否设为默认"
        name="isDefault">
        <a-radio-group
          v-model:value="formState.isDefault"
          name="isDefault">
          <a-radio :value="1">是</a-radio>
          <a-radio :value="0">否</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item
        label="展示技能"
        name="isShowSkills">
        <a-radio-group
          v-model:value="formState.isShowSkills"
          name="isShowSkills">
          <a-radio :value="1">是</a-radio>
          <a-radio :value="0">否</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item
        label="展示作品集"
        name="isShowWorks">
        <a-radio-group
          v-model:value="formState.isShowWorks"
          name="isShowWorks">
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
  </form-page-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import FormPageCard from '@/components/common/card/FormPageCard.vue';
import { useDefineAsyncComponent, useFormRef } from '@/hooks/common';
import { personalBaseMsg } from '@/config/validateMessage';
import { IPersonalBase } from '@/types/personalBase';

import Picturereview from '@/components/resource/picture/picture/form/Preview.vue';
import { SelectedPicture } from '@/types/picture';

const PictureSelectorModal = useDefineAsyncComponent('/components/resource/picture/picture/PictureSelectorModal.vue')

const props = withDefaults(defineProps<{
  title: string;
  confirmLoading?: boolean;
  formData?: IPersonalBase;
  avatarInfo?: SelectedPicture
}>(), {
  confirmLoading: false,
  formData: () => ({
    nickname: '',
    qq: '',
    blog: '',
    github: '',
    email: '',
    isDefault: 0,
    isShowSkills: 0,
    isShowWorks: 0,
    isShow: 1,
    avatarId: 0,
    intro: '',
    sort: 0
  })
});

const previewItem = ref<SelectedPicture>();
const pictureSelectorVisible = ref(false);

const formState = ref<IPersonalBase>(props.formData);
watch(() => props.formData, () => {
  formState.value = props.formData;
})

watch(() => props.avatarInfo, (info) => {
  if (info) {
    previewItem.value = info;
  }
});

const emit = defineEmits<{(e: 'submit', values: IPersonalBase): void}>();

const { formRef, resetFields } = useFormRef();

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 }
}

const rules = {
  nickname: [
    { required: true, message: personalBaseMsg.nickname.required, trigger: 'blur' },
    { min: 2, message: personalBaseMsg.nickname.min, trigger: 'blur' },
    { max: 32, message: personalBaseMsg.nickname.max, trigger: 'blur' }
  ],
  qq: [
    { min: 5, message: personalBaseMsg.qq.min, trigger: 'blur' },
    { max: 11, message: personalBaseMsg.qq.max, trigger: 'blur' }
  ],
  blog: [
    { type: 'url', message: personalBaseMsg.blog.type, trigger: 'blur' },
    { max: 128, message: personalBaseMsg.blog.max, trigger: 'blur' }
  ],
  github: [
    { type: 'url', message: personalBaseMsg.github.type, trigger: 'blur' },
    { max: 128, message: personalBaseMsg.github.max, trigger: 'blur' }
  ],
  email: [
    { type: 'email', message: personalBaseMsg.email.type, trigger: 'blur' },
    { max: 128, message: personalBaseMsg.email.max, trigger: 'blur' }
  ]
};

const handleSelectorChange = (item: SelectedPicture) => {
  formState.value.avatarId = item.id;
  previewItem.value = item;
  pictureSelectorVisible.value = false;
}

const handlePageCardSubmit = () => {
  formRef.value.validateFields().then((data: IPersonalBase) => {
    handleSubmit(data);
  }).catch(() => {})
}

const handleSubmit = (values: IPersonalBase) => {
  emit('submit', values);
}
</script>
