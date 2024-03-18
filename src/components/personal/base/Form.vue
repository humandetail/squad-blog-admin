<template>
  <common-form-card
    :title="`${!isEdit ? '新增' : '编辑'}基本信息`"
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
        <template #avatarId="{ modelRef, item }">
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
      </common-form>
    </a-spin>

    <PictureSelectorModal
      v-show="pictureSelectorVisible"
      :show="pictureSelectorVisible"
      :multiple="false"
      @change="handleSelectorChange"
      @close="pictureSelectorVisible = false"
    />
  </common-form-card>
</template>

<script setup lang="ts">
import { personalBaseMsg } from '@/config/validateMessage'
import { type FormItem } from '@/types/common'
import type { PersonalBase, PersonalBaseItem } from '@/types/personal'
import { type SelectedPicture } from '@/types/picture'

const props = withDefaults(defineProps<{
  record?: PersonalBaseItem
  loading?: boolean
  handler: (...args: any) => any
}>(), {
  loading: false
})

const emits = defineEmits<(e: 'success') => void>()

const PictureSelectorModal = defineAsyncComponent(() => import('@/components/resource/picture/SelectorModal.vue'))

const commonFormRef = ref()
const previewItem = ref<SelectedPicture>()
const pictureSelectorVisible = ref(false)

const formData = ref<PersonalBase>({
  avatarId: 0,
  nickname: '',
  qq: '',
  email: '',
  blog: '',
  github: '',
  intro: '',
  isDefault: 0,
  isShowSkills: 0,
  isShowWorks: 0,
  isShow: 1,
  sort: 0
})

const isEdit = computed(() => !!props.record)

const formItems: FormItem[] = [
  {
    label: '头像',
    name: 'avatarId',
    type: 'custom',
    customRender: 'avatarId'
  },
  {
    label: '昵称',
    name: 'nickname',
    type: 'input',
    rules: [
      { required: true, message: personalBaseMsg.nickname.required, trigger: 'blur' },
      { min: 2, message: personalBaseMsg.nickname.min, trigger: 'blur' },
      { max: 32, message: personalBaseMsg.nickname.max, trigger: 'blur' }
    ]
  },
  {
    label: 'QQ',
    name: 'qq',
    type: 'input',
    rules: [
      { min: 5, message: personalBaseMsg.qq.min, trigger: 'blur' },
      { max: 11, message: personalBaseMsg.qq.max, trigger: 'blur' }
    ]
  },
  {
    label: 'Blog',
    name: 'blog',
    type: 'input',
    rules: [
      { type: 'url', message: personalBaseMsg.blog.type, trigger: 'blur' },
      { max: 128, message: personalBaseMsg.blog.max, trigger: 'blur' }
    ]
  },
  {
    label: 'GitHub',
    name: 'github',
    type: 'input',
    rules: [
      { type: 'url', message: personalBaseMsg.github.type, trigger: 'blur' },
      { max: 128, message: personalBaseMsg.github.max, trigger: 'blur' }
    ]
  },
  {
    label: 'E-mail',
    name: 'email',
    type: 'input',
    rules: [
      { type: 'email', message: personalBaseMsg.email.type, trigger: 'blur' },
      { max: 128, message: personalBaseMsg.email.max, trigger: 'blur' }
    ]
  },
  {
    label: '简介',
    name: 'intro',
    type: 'textarea'
  },
  {
    label: '是否显示',
    name: 'isShow',
    type: 'switch'
  },
  {
    label: '是否设为默认',
    name: 'isDefault',
    type: 'switch'
  },
  {
    label: '展示技能',
    name: 'isShowSkills',
    type: 'switch'
  },
  {
    label: '展示作品集',
    name: 'isShowWorks',
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
    const { avatarId, avatarPic, nickname, qq, blog, github, email, intro, isDefault, isShowSkills, isShowWorks, isShow, sort } = record
    formData.value = { avatarId, nickname, qq, blog, github, email, intro, isDefault, isShowSkills, isShowWorks, isShow, sort }

    previewItem.value = {
      id: avatarId,
      name: '',
      url: avatarPic
    }
  }
}, { immediate: true, deep: true })

const handleSelectorChange = (item: SelectedPicture) => {
  commonFormRef.value.modelRef.avatarId = item.id
  previewItem.value = item
  pictureSelectorVisible.value = false
}
</script>
