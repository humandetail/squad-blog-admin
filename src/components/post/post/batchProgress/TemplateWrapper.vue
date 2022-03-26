<template>
  <section class="template-wrapper">
    <a-divider orientation="left">模板批处理</a-divider>

    <a-spin :spinning="fetchLoading">
      <BatchProgressSelector
        :selected-row-keys="selectedRowKeys"
        item-name="文章"
        v-model:value="formState.selectedValue"
      />

      <a-space>
        <a-select
          v-model:value="formState.templateId">
          <a-select-option :value="0">所有模板</a-select-option>
          <a-select-option
            v-for="item in categories"
            :key="item.id"
            :value="item.id">
            {{ item.name }}
          </a-select-option>
        </a-select>

        <span>改变为</span>

        <a-select v-model:value="formState.newTemplateId">
          <a-select-option
            v-for="item in categories"
            :key="item.id"
            :value="item.id">
            {{ item.name }}
          </a-select-option>
        </a-select>

        <a-button
          type="primary"
          :disabled="disabled"
          :loading="confirmLoading"
          @click="handleConfirm">
          <SaveOutlined />
          确认操作
        </a-button>
      </a-space>
    </a-spin>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { EBatchSelector } from '@/config/constants';

import { BatchProgressSelector } from '@/components/common/queryList';
import { ITemplateItem } from '@/types/template';
import { useRequest } from '@/hooks/common';
import { IBasePageParams, IBasePageResponse, IBaseResponse } from '@/types/common';
import { getTemplates, postBatchTemplate } from '@/services';
import _ from 'lodash';
import { IPostBatchTemplate } from '@/types/post';
import { success } from '@/utils/http';
import { Modal } from 'ant-design-vue';

const props = defineProps<{
  selectedRowKeys: string[]
}>();

const emit = defineEmits<{(e: 'success'): void}>();

const categories = ref<ITemplateItem[]>([]);
const formState = reactive<{
  selectedValue: EBatchSelector | undefined;
  templateId: number;
  newTemplateId: number;
}>({
  selectedValue: undefined,
  templateId: 0,
  newTemplateId: 0
})

const {
  loading: fetchLoading,
  fetch
} = useRequest<IBasePageResponse<ITemplateItem[]>, [IBasePageParams]>(getTemplates);

const {
  loading: confirmLoading,
  fetch: submit
} = useRequest<IBaseResponse<null>, [IPostBatchTemplate]>(postBatchTemplate);

const disabled = computed(() => {
  return (
    _.isUndefined(formState.selectedValue) ||
    !Number.isInteger(formState.templateId) ||
    !categories.value.find(item => item.id === formState.newTemplateId)
  );
});

onMounted(async () => {
  const res = await fetch({
    current: 1,
    pageSize: 100
  });

  categories.value = res.data.records || [];

  formState.newTemplateId = categories.value?.[0].id;
});

const handleConfirm = () => {
  Modal.confirm({
    title: '操作确认',
    content: '你确实要执行此操作吗？',
    onOk: () => {
      const { selectedValue, templateId, newTemplateId } = formState;
      const data = {
        templateId,
        newTemplateId,
        ...(selectedValue === EBatchSelector.all ? { isAll: true } : { ids: props.selectedRowKeys })
      }

      submit(data)
        .then(() => {
          success('批修改文章模板成功！');
          emit('success');
        });
    }
  });
}
</script>
