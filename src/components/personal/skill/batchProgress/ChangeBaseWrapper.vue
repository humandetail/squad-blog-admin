<template>
  <section class="base-wrapper">
    <a-divider orientation="left">挂载点批处理</a-divider>

    <a-spin :spinning="fetchLoading">
      <BatchProgressSelector
        :selected-row-keys="selectedRowKeys"
        item-name="个人技能"
        v-model:value="formState.selectedValue"
      />

      <a-space>
        <a-select
          v-model:value="formState.baseId">
          <a-select-option :value="0">所有挂载点</a-select-option>
          <a-select-option
            v-for="item in bases"
            :key="item.id"
            :value="item.id">
            {{ item.nickname }}
          </a-select-option>
        </a-select>

        <span>改变为</span>

        <a-select v-model:value="formState.newBaseId">
          <a-select-option
            v-for="item in bases"
            :key="item.id"
            :value="item.id">
            {{ item.nickname }}
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
import { useRequest } from '@/hooks/common';
import { IBasePageParams, IBasePageResponse, IBaseResponse } from '@/types/common';
import { getPersonalBases, getPostCategories, personalSkillBatchBase, postBatchCategory } from '@/services';
import _ from 'lodash';
import { IPostBatchCategory } from '@/types/post';
import { success } from '@/utils/http';
import { Modal } from 'ant-design-vue';
import { IPersonalBaseItem } from '@/types/personalBase';
import { IPersonalSkillBatchBase } from '@/types/personalSkill';

const props = defineProps<{
  selectedRowKeys: string[]
}>();

const emit = defineEmits<{(e: 'success'): void}>();

const bases = ref<IPersonalBaseItem[]>([]);
const formState = reactive<{
  selectedValue: EBatchSelector | undefined;
  baseId: number;
  newBaseId: number;
}>({
  selectedValue: undefined,
  baseId: 0,
  newBaseId: 0
})

const {
  loading: fetchLoading,
  fetch
} = useRequest<IBasePageResponse<IPersonalBaseItem[]>, [IBasePageParams]>(getPersonalBases);

const {
  loading: confirmLoading,
  fetch: submit
} = useRequest<IBaseResponse<null>, [IPersonalSkillBatchBase]>(personalSkillBatchBase);

const disabled = computed(() => {
  return (
    _.isUndefined(formState.selectedValue) ||
    !Number.isInteger(formState.baseId) ||
    !bases.value.find(item => item.id === formState.newBaseId)
  );
});

onMounted(async () => {
  const res = await fetch({
    current: 1,
    pageSize: 100
  });

  bases.value = res.data.records || [];

  formState.newBaseId = bases.value?.[0].id;
});

const handleConfirm = () => {
  Modal.confirm({
    title: '操作确认',
    content: '你确实要执行此操作吗？',
    onOk: () => {
      const { selectedValue, baseId, newBaseId } = formState;
      const data = {
        baseId,
        newBaseId,
        ...(selectedValue === EBatchSelector.all ? { isAll: true } : { ids: props.selectedRowKeys })
      }

      submit(data)
        .then(() => {
          success('批修改个人技能挂载点成功！');
          emit('success');
        });
    }
  });
}
</script>
