<template>
  <section class="status-wrapper">
    <a-divider orientation="left">状态批处理</a-divider>

      <BatchProgressSelector
        :selected-row-keys="selectedRowKeys"
        item-name="作品集"
        v-model:value="formState.selectedValue"
      />

      <a-space>
        <a-button
          type="primary"
          success
          :disabled="disabled"
          :loading="confirmLoading"
          @click="handleConfirm(1)">
          <EyeOutlined />
          批显示
        </a-button>

        <a-button
          type="primary"
          :disabled="disabled"
          :loading="confirmLoading"
          @click="handleConfirm(0)">
          <EyeInvisibleOutlined />
          批隐藏
        </a-button>
      </a-space>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { EBatchSelector } from '@/config/constants';

import { BatchProgressSelector } from '@/components/common/queryList';
import { useRequest } from '@/hooks/common';
import { IBaseResponse, ZeroOrOneType } from '@/types/common';
import { personalWorkBatchStatus } from '@/services';
import _ from 'lodash';
import { success } from '@/utils/http';
import { Modal } from 'ant-design-vue';
import { IPersonalWorkBatchStatus } from '@/types/personalWork';

const props = defineProps<{
  selectedRowKeys: string[]
}>();

const emit = defineEmits<{(e: 'success'): void}>();

const formState = reactive<{
  selectedValue: EBatchSelector | undefined;
}>({
  selectedValue: undefined
})

const {
  loading: confirmLoading,
  fetch: submit
} = useRequest<IBaseResponse<null>, [IPersonalWorkBatchStatus]>(personalWorkBatchStatus);

const disabled = computed(() => {
  return (
    _.isUndefined(formState.selectedValue)
  );
});

const handleConfirm = (isShow: ZeroOrOneType) => {
  Modal.confirm({
    title: '操作确认',
    content: '你确实要执行此操作吗？',
    onOk: () => {
      const { selectedValue } = formState;
      const data = {
        isShow,
        ...(selectedValue === EBatchSelector.all ? { isAll: true } : { ids: props.selectedRowKeys })
      }

      submit(data)
        .then(() => {
          success('批修改作品集状态成功！');
          emit('success');
        });
    }
  });
}
</script>
