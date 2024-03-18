<template>
  <common-form-card
    :title="`${!isEdit ? '新增' : '编辑'}作品集`"
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
        <template #pictures>
          <div class="work-pictures-wrapper">
            <resource-picture-preview
              v-for="item in workPictures"
              :key="item.id"
              :url="item.url"
              width="160px"
              height="160px"
              removable
              @remove="handleRemovePicture(item.id)"
            />

            <a-button
              class="btn-add-pictures"
              @click="pictureSelectorVisible = true"
            >
              <PlusOutlined />
            </a-button>
          </div>
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
      :multiple="true"
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
import { personalWorkMsg } from '@/config/validateMessage'
import { type FormItem } from '@/types/common'
import type { PersonalBaseItem, PersonalWork, PersonalWorkItem, PersonalWorkPicture, SelectedPersonalBase } from '@/types/personal'
import type { SelectedPicture } from '@/types/picture'

const props = withDefaults(defineProps<{
  record?: PersonalWorkItem
  loading?: boolean
  handler: (...args: any) => any
}>(), {
  loading: false
})

const emits = defineEmits<(e: 'success') => void>()

const commonFormRef = ref()
const workPictures = ref<PersonalWorkPicture[]>([])
const selectedBaseItem = ref<SelectedPersonalBase>()
const pictureSelectorVisible = ref(false)
const baseSelectorVisible = ref(false)

const formData = ref<PersonalWork>({
  name: '',
  baseId: 0,
  pictures: [],
  description: '',
  link: '',
  isShow: 1,
  sort: 0
})

const isEdit = computed(() => !!props.record)

const formItems: FormItem[] = [
  {
    label: '作品名称',
    name: 'name',
    type: 'input',
    rules: [
      { required: true, message: personalWorkMsg.name.required, trigger: 'blur' },
      { min: 2, message: personalWorkMsg.name.min, trigger: 'blur' },
      { max: 32, message: personalWorkMsg.name.max, trigger: 'blur' }
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
            return Promise.reject(personalWorkMsg.baseId.required)
          }
          return Promise.resolve()
        },
        trigger: 'change'
      }
    ]
  },
  {
    label: '作品图片',
    name: 'pictures',
    type: 'custom',
    customRender: 'pictures',
    rules: [
      {
        required: true,
        validator: (_rule: any, value: number[]) => {
          if (value.length <= 0) {
            return Promise.reject(personalWorkMsg.pictures.required)
          }
          return Promise.resolve()
        },
        trigger: 'change'
      }
    ]
  },
  {
    label: '作品链接',
    name: 'link',
    type: 'textarea',
    placeholder: '多个链接使用逗号隔开',
    rules: [
      { required: true, message: personalWorkMsg.link.required, trigger: 'blur' },
      { max: 255, message: personalWorkMsg.link.max, trigger: 'blur' }
    ]
  },
  {
    label: '作品简介',
    name: 'description',
    type: 'textarea',
    rules: [
      { required: true, message: personalWorkMsg.description.required, trigger: 'blur' },
      { max: 255, message: personalWorkMsg.description.max, trigger: 'blur' }
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
    const { pictures, baseId, baseNickname, name, description, link, isShow, sort } = record
    formData.value = { pictures: pictures.map(({ id }) => id), baseId, name, description, link, isShow, sort }

    workPictures.value = pictures

    selectedBaseItem.value = {
      baseId,
      baseNickname
    }
  }
}, { immediate: true, deep: true })

const handleSelectorChange = (items: SelectedPicture[]) => {
  if (!workPictures.value) {
    workPictures.value = items.map(({ id, url }) => ({ id, url }))
  } else {
    workPictures.value = [
      ...workPictures.value,
      ...items.filter(i => !workPictures.value.find(s => s.id === i.id))
    ]
  }
  commonFormRef.value.modelRef.pictures = workPictures.value.map(({ id }) => id)
  pictureSelectorVisible.value = false
}

const handleRemovePicture = (id: number) => {
  if (!workPictures.value) return
  workPictures.value = workPictures.value.filter(item => item.id !== id)
  commonFormRef.value.modelRef.pictures = workPictures.value.map(({ id }) => id)
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

<style lang="scss" scoped>
.work-pictures-wrapper {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;

  .btn-add-pictures {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 160px;

    .anticon {
      font-size: 32px;
    }
  }
}
</style>
