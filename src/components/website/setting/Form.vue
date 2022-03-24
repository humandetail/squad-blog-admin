<template>
  <a-card>
    <a-spin :spinning="requestLoading">
      <a-form
        ref="formRef"
        class="setting-form"
        v-bind="layout"
        :model="formState"
        :rules="rules"
        :scrollToFirstError="true"
        @finish="handleSubmit">
        <a-form-item
          label="Logo"
          name="logoId">
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
          label="网站名称"
          name="siteName">
          <a-input
            v-model:value="formState.siteName"
          />
        </a-form-item>

        <a-form-item
          label="seo标题"
          name="seoTitle">
          <a-input
            v-model:value="formState.seoTitle"
          />
        </a-form-item>

        <a-form-item
          label="seo关键字"
          name="seoKeywords">
          <a-input
            v-model:value="formState.seoKeywords"
          />
        </a-form-item>

        <a-form-item
          label="seo描述"
          name="seoDescription">
          <a-textarea
            v-model:value="formState.seoDescription"
          />
        </a-form-item>

        <a-form-item
          label="运行状态"
          name="status">
          <a-select v-model:value="formState.status">
            <a-select-option
              v-for="item in websiteStatus"
              :key="item.value"
              :value="item.value">
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item :wrapperCol="{ span: layout.wrapperCol.span, offset: layout.labelCol.span }">
          <FormOperations
            :loading="confirmLoading"
            :reset="resetFields"
          />
        </a-form-item>
      </a-form>
    </a-spin>

    <PictureSelectorModal
      v-show="pictureSelectorVisible"
      :show="pictureSelectorVisible"
      :multiple="false"
      @change="handleSelectorChange"
      @close="pictureSelectorVisible = false"
    />
  </a-card>
</template>

<script setup lang="ts">
import { useDefineAsyncComponent, useFormRef, useRequest } from '@/hooks/common';
import { IMenu } from '@/types/menu';
import { onMounted, ref } from 'vue';
import FormOperations from '@/components/common/form/FormOperations.vue';
import { settingMsg } from '@/config/validateMessage';
import { ISetting, ISettingItem } from '@/types/setting';
import { editSetting, getSettingInfo } from '@/services';
import { SelectedPicture } from '@/types/picture';
import { EWebsiteStatus } from '@/config/constants';

import Picturereview from '@/components/resource/picture/picture/form/Preview.vue';
import { success } from '@/utils/http';

const PictureSelectorModal = useDefineAsyncComponent('/components/resource/picture/picture/PictureSelectorModal.vue')

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 }
}

const formState = ref<ISetting>({
  logoId: 0,
  seoTitle: '',
  seoKeywords: '',
  seoDescription: '',
  siteName: '',
  status: 0,
  sort: 0
});

const websiteStatus = ref<Array<{ label: string; value: EWebsiteStatus }>>([
  { label: '正常状态', value: EWebsiteStatus['正常状态'] },
  { label: '升级维护', value: EWebsiteStatus['升级维护'] },
  { label: '网站已关闭', value: EWebsiteStatus['网站已关闭'] }
])

const previewItem = ref<SelectedPicture>();
const pictureSelectorVisible = ref(false);

const { formRef, resetFields } = useFormRef();

const { loading: requestLoading, fetch: requestFetch } = useRequest(getSettingInfo);
const { loading: confirmLoading, fetch: confirmFetch } = useRequest(editSetting);

const rules = {
  logoId: [{ required: true, type: 'number', message: settingMsg.logoId.required, trigger: 'change' }],
  status: [{ required: true, type: 'number', message: settingMsg.status.required, trigger: 'change' }],
  siteName: [
    { required: true, message: settingMsg.siteName.required, trigger: 'blur' },
    { max: 32, message: settingMsg.siteName.max, trigger: 'blur' }
  ],
  seoTitle: [
    { required: true, message: settingMsg.seoTitle.required, trigger: 'blur' },
    { max: 255, message: settingMsg.seoTitle.max, trigger: 'blur' }
  ],
  seoKeywords: [
    { required: true, message: settingMsg.seoKeywords.required, trigger: 'blur' },
    { max: 255, message: settingMsg.seoKeywords.max, trigger: 'blur' }
  ],
  seoDescription: [
    { required: true, message: settingMsg.seoDescription.required, trigger: 'blur' },
    { max: 255, message: settingMsg.seoDescription.max, trigger: 'blur' }
  ]
}

const handleSelectorChange = (item: SelectedPicture) => {
  formState.value.logoId = item.id;
  previewItem.value = item;
  pictureSelectorVisible.value = false;
}

const handleSubmit = async (values: ISetting) => {
  await confirmFetch(values);
  success('保存成功');
}

onMounted(async () => {
  const res = await requestFetch();
  const { siteName, seoTitle, seoDescription, seoKeywords, status, logoId, logoPic } = res.data;

  if (logoId && logoPic) {
    previewItem.value = {
      id: 0,
      name: '',
      url: logoPic
    };
  }

  formState.value = {
    ...formState.value,
    siteName,
    seoTitle,
    seoKeywords,
    seoDescription,
    status,
    logoId
  }
})
</script>
