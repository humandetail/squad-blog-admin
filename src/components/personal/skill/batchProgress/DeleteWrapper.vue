<template>
  <section class="delete-wrapper">
    <a-divider orientation="left">批删除</a-divider>

      <BatchProgressSelector
        :selected-row-keys="selectedRowKeys"
        :all="false"
        item-name="个人技能"
        v-model:value="formState.selectedValue"
      />

      <a-space>
        <a-button
          type="danger"
          :disabled="disabled"
          :loading="confirmLoading"
          @click="handleConfirm">
          <DeleteOutlined />
          批删除
        </a-button>
      </a-space>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { EBatchSelector } from '@/config/constants';

import { BatchProgressSelector } from '@/components/common/queryList';
import { useRequest } from '@/hooks/common';
import { IBaseResponse } from '@/types/common';
import { personalSkillBatchDelete } from '@/services';
import _ from 'lodash';
import { success } from '@/utils/http';
import { Modal } from 'ant-design-vue';
import { IPersonalSkillBatchDelete } from '@/types/personalSkill';

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
} = useRequest<IBaseResponse<null>, [IPersonalSkillBatchDelete]>(personalSkillBatchDelete);

const disabled = computed(() => {
  return (
    _.isUndefined(formState.selectedValue)
  );
});

const handleConfirm = () => {
  Modal.confirm({
    title: '你确实要执行此操作吗？',
    content: '此操作会将个人技能永久删除，无法恢复！',
    onOk: () => {
      const data = {
        ids: props.selectedRowKeys
      }

      submit(data)
        .then(() => {
          success('批删除个人技能成功！');
          emit('success');
        });
    }
  });
}
</script>
