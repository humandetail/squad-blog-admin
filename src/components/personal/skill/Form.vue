<template>
  <common-form-card
    :title="`${!isEdit ? '新增' : '编辑'}个人技能`"
    :loading="commonFormRef?.confirmLoading"
    :reset="commonFormRef?.resetFields"
    :submit="commonFormRef?.submit"
  >
    <a-spin :spinning="loading">
      <common-form
        ref="commonFormRef"
        :form-data="formData"
        :form-items="formItems"
        :submit-handler="handler"
        @success="emits('success')"
      >
        <template #iconId="{ modelRef, item }">
          <a-avatar
            v-if="modelRef[item.name]"
            :src="previewItem?.url"
            :size="64"
            shape="square"
          />

          <a-button
            type="primary"
            @click="pictureSelectorVisible = true"
            style="display: block; margin-top: 8px;"
          >
            选择图片
          </a-button>
        </template>

        <template #baseId="{ modelRef, item }">
          <span
            v-if="modelRef[item.name]"
            class="ant-form-text"
          >
            {{ selectedBaseItem?.baseNickname }}
          </span>
          <a-button
            type="primary"
            success
            @click="baseSelectorVisible = true"
          >
            选择挂载点
          </a-button>
        </template>
      </common-form>
    </a-spin>

    <resource-picture-selector-modal
      v-show="pictureSelectorVisible"
      :show="pictureSelectorVisible"
      :multiple="false"
      @change="handleSelectorChange"
      @close="pictureSelectorVisible = false"
    />

    <personal-base-selector
      v-if="baseSelectorVisible"
      @close="baseSelectorVisible = false"
      @select="handleBaseSelect"
    />
  </common-form-card>
</template>

<script setup lang="ts">
import { personalSkillMsg } from '@/config/validateMessage'
import { type FormItem } from '@/types/common'
import type { PersonalBaseItem, PersonalSkill, PersonalSkillItem, SelectedPersonalBase } from '@/types/personal'
import type { SelectedPicture } from '@/types/picture'

const props = withDefaults(defineProps<{
  record?: PersonalSkillItem
  loading?: boolean
  handler: (...args: any) => any
}>(), {
  loading: false
})

const emits = defineEmits<(e: 'success') => void>()

const commonFormRef = ref()
const previewItem = ref<SelectedPicture>()
const selectedBaseItem = ref<SelectedPersonalBase>()
const pictureSelectorVisible = ref(false)
const baseSelectorVisible = ref(false)

const formData = ref<PersonalSkill>({
  iconId: 0,
  baseId: 0,
  name: '',
  description: '',
  isShow: 1,
  sort: 0
})

const isEdit = computed(() => !!props.record)

const formItems: FormItem[] = [
  {
    label: '图标',
    name: 'iconId',
    type: 'custom',
    customRender: 'iconId',
    rules: [
      {
        required: true,
        validator: (_rule: any, value: number) => {
          if (value <= 0) {
            return Promise.reject(personalSkillMsg.iconId.required)
          }
          return Promise.resolve()
        },
        trigger: 'change'
      }
    ]
  },
  {
    label: '挂载点',
    name: 'baseId',
    type: 'custom',
    customRender: 'baseId',
    rules: [
      {
        required: true,
        validator: (_rule: any, value: number) => {
          if (value <= 0) {
            return Promise.reject(personalSkillMsg.baseId.required)
          }
          return Promise.resolve()
        },
        trigger: 'change'
      }
    ]
  },
  {
    label: '技能名称',
    name: 'name',
    type: 'input',
    rules: [
      { required: true, message: personalSkillMsg.name.required, trigger: 'blur' },
      { min: 2, message: personalSkillMsg.name.min, trigger: 'blur' },
      { max: 32, message: personalSkillMsg.name.max, trigger: 'blur' }
    ]
  },
  {
    label: '技能说明',
    name: 'description',
    type: 'textarea',
    rules: [
      { required: true, message: personalSkillMsg.description.required, trigger: 'blur' },
      { max: 255, message: personalSkillMsg.description.max, trigger: 'blur' }
    ]
  },
  {
    label: '是否显示',
    name: 'isShow',
    type: 'switch'
  },
  {
    label: '排序',
    name: 'sort',
    type: 'input-number',
    min: 0,
    precision: 0
  }
]

watch(() => props.record, record => {
  if (record) {
    const { iconId, iconPic, baseId, baseNickname, name, description, isShow, sort } = record
    formData.value = { iconId, baseId, name, description, isShow, sort }

    previewItem.value = {
      id: iconId,
      name: '',
      url: iconPic
    }

    selectedBaseItem.value = {
      baseId,
      baseNickname
    }
  }
}, { immediate: true, deep: true })

const handleSelectorChange = (item: SelectedPicture) => {
  commonFormRef.value.modelRef.iconId = item.id
  previewItem.value = item
  pictureSelectorVisible.value = false
}

const handleBaseSelect = (item: PersonalBaseItem) => {
  commonFormRef.value.modelRef.baseId = item.id
  selectedBaseItem.value = {
    baseId: item.id,
    baseNickname: item.nickname
  }
  baseSelectorVisible.value = false
}
</script>
