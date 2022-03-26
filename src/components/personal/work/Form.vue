<template>
  <form-page-card
    :title="title"
    :loading="confirmLoading"
    :handle-submit="handlePageCardSubmit"
    :handle-reset="resetFields">
    <a-form
      ref="formRef"
      class="personal-work-form"
      v-bind="layout"
      :model="formState"
      :rules="rules"
      :scrollToFirstError="true"
      @finish="handleSubmit">
      <a-form-item
        label="作品名称"
        name="name">
        <a-input
          v-model:value="formState.name"
        />
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
        label="作品图"
        name="pictures">
        <div class="work-pictures-wrapper">
          <Picturereview
            v-for="item in workPictures"
            :key="item.id"
            :url="item.url"
            width="160px"
            height="160px"
            removable
            @remove="handleRemovePicture(item.id)"
          />
          <a
            class="btn-add-pictures"
            href=":;"
            @click.prevent="pictureSelectorVisible = true">
            <DynamicIcon
              icon="PlusOutlined"
              class="icon"
            />
          </a>
        </div>
      </a-form-item>

      <a-form-item
        label="作品链接"
        placeholder="多个链接用逗号隔开"
        name="link">
        <a-input
          v-model:value="formState.link"
        />
      </a-form-item>

      <a-form-item
        label="作品简介"
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
      :multiple="true"
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
import { personalWorkMsg } from '@/config/validateMessage';
import { IPersonalWork, PersonalWorkPicture } from '@/types/personalWork';

import Picturereview from '@/components/resource/picture/picture/form/Preview.vue';
import FormOperations from '@/components/common/form/FormOperations.vue';
import { DynamicIcon } from '@/components/common/icons';

import { SelectedPicture } from '@/types/picture';
import { IPersonalBaseItem, SelectedPersonalBase } from '@/types/personalBase';

const PictureSelectorModal = useDefineAsyncComponent('/components/resource/picture/picture/PictureSelectorModal.vue');
const BaseSelectorModal = useDefineAsyncComponent('/components/personal/base/BaseSelector.vue');

const props = withDefaults(defineProps<{
  title: string;
  confirmLoading?: boolean;
  formData?: IPersonalWork;
  pictures?: PersonalWorkPicture[];
  baseInfo?: SelectedPersonalBase;
}>(), {
  confirmLoading: false,
  formData: () => ({
    name: '',
    link: '',
    baseId: 0,
    description: '',
    pictures: [],
    isShow: 1,
    sort: 0
  }),
  pictures: () => []
});

const workPictures = ref<PersonalWorkPicture[]>();
const selectedBaseItem = ref<SelectedPersonalBase>();
const pictureSelectorVisible = ref(false);
const baseSelectorVisible = ref(false);

const formState = ref<IPersonalWork>(props.formData);
watch(() => props.formData, () => {
  formState.value = props.formData;
})

watch(() => props.pictures, (info) => {
  workPictures.value = info;
}, { deep: true });

watch(() => props.baseInfo, (info) => {
  if (info) {
    selectedBaseItem.value = info;
  }
});

const emit = defineEmits<{(e: 'submit', values: IPersonalWork): void}>();

const { formRef, resetFields } = useFormRef();

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 }
}

const rules = {
  name: [
    { required: true, message: personalWorkMsg.name.required, trigger: 'blur' },
    { min: 2, message: personalWorkMsg.name.min, trigger: 'blur' },
    { max: 32, message: personalWorkMsg.name.max, trigger: 'blur' }
  ],
  description: [
    { required: true, message: personalWorkMsg.description.required, trigger: 'blur' },
    { max: 255, message: personalWorkMsg.description.max, trigger: 'blur' }
  ],
  link: [
    { required: true, message: personalWorkMsg.link.required, trigger: 'blur' },
    { max: 255, message: personalWorkMsg.link.max, trigger: 'blur' }
  ],
  pictures: [
    {
      required: true,
      validator: (_rule: any, value: number[]) => {
        if (value.length <= 0) {
          return Promise.reject(personalWorkMsg.pictures.required)
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
          return Promise.reject(personalWorkMsg.baseId.required)
        }
        return Promise.resolve();
      },
      trigger: 'change'
    }
  ]
};

const handleSelectorChange = (item: SelectedPicture[]) => {
  if (!workPictures.value) {
    workPictures.value = item.map(({ id, url }) => ({ id, url }));
  } else {
    workPictures.value = [
      ...workPictures.value,
      ...item.filter(i => !workPictures.value!.find(s => s.id === i.id))
    ];
  }
  formState.value.pictures = workPictures.value.map(({ id }) => id);
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
  formRef.value.validateFields().then((data: IPersonalWork) => {
    handleSubmit(data);
  }).catch(() => {})
}

const handleRemovePicture = (id: number) => {
  if (!workPictures.value) return;
  workPictures.value = workPictures.value.filter(item => item.id !== id);
  formState.value.pictures = workPictures.value.map(({ id }) => id);
}

const handleSubmit = (values: IPersonalWork) => {
  emit('submit', values);
}
</script>

<style lang="less" scoped>
.ant-form-text {
  line-height: 32px;
  color: @primary-color;
}

.work-pictures-wrapper {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  > * {
    margin: 0 16px 16px 0;
  }

  .btn-add-pictures {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 160px;
    border: 1px solid #434343;

    .icon {
      color: #434343;
      font-size: 32px;
    }

    &:hover {
      border-color: #1a5c9a;
      .icon {
        color: #1a5c9a;
      }
    }
  }
}
</style>
