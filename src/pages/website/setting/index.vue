<template>
  <div class="page-setting">
    <a-card>
      <a-spin :spinning="requestLoading">
        <common-form
          :form-data="formData"
          :form-items="formItems"
          :submit-handler="editSetting"
        >
          <template #logo>
            <a-image
              width="120px"
              :preview="false"
              :src="previewItem?.url"
              @click="pictureSelectorVisible = true"
            />
          </template>
        </common-form>
      </a-spin>
    </a-card>

    <resource-picture-selector-modal
      :show="pictureSelectorVisible"
      :multiple="false"
      @close="pictureSelectorVisible = false"
      @change="handlePictureChange"
    />
  </div>
</template>

<script setup lang="ts">
import useRequest from '@/composables/useRequest'
import { WebsiteStatus } from '@/config/constants'
import { settingMsg } from '@/config/validateMessage'
import { getSettingInfo, editSetting } from '@/services'
import { type FormItem } from '@/types/common'
import { type SelectedPicture } from '@/types/picture'
import { type Setting } from '@/types/setting'

const formData = ref<Setting>({
  logoId: 0,
  seoTitle: '',
  seoKeywords: '',
  seoDescription: '',
  siteName: '',
  status: 0,
  sort: 0
})

const previewItem = ref<SelectedPicture>()
const pictureSelectorVisible = ref(false)

const statusOptions = [
  { label: '正常状态', value: WebsiteStatus['正常状态'] },
  { label: '升级维护', value: WebsiteStatus['升级维护'] },
  { label: '网站已关闭', value: WebsiteStatus['网站已关闭'] },
  { label: '置灰状态', value: WebsiteStatus['置灰状态'] }
]

const formItems: FormItem[] = [
  {
    label: 'Logo',
    name: 'logoId',
    type: 'custom',
    customRender: 'logo',
    rules: [{ required: true, type: 'number', message: settingMsg.logoId.required, trigger: 'change' }]
  },
  {
    label: '网站名称',
    name: 'siteName',
    type: 'input',
    rules: [
      { required: true, message: settingMsg.siteName.required, trigger: 'blur' },
      { max: 32, message: settingMsg.siteName.max, trigger: 'blur' }
    ]
  },
  {
    label: 'seo标题',
    name: 'seoTitle',
    type: 'input',
    rules: [
      { required: true, message: settingMsg.seoTitle.required, trigger: 'blur' },
      { max: 255, message: settingMsg.seoTitle.max, trigger: 'blur' }
    ]
  },
  {
    label: 'seo关键字',
    name: 'seoKeywords',
    type: 'input',
    rules: [
      { required: true, message: settingMsg.seoKeywords.required, trigger: 'blur' },
      { max: 255, message: settingMsg.seoKeywords.max, trigger: 'blur' }
    ]
  },
  {
    label: 'seo描述',
    name: 'seoDescription',
    type: 'textarea',
    rules: [
      { required: true, message: settingMsg.seoDescription.required, trigger: 'blur' },
      { max: 255, message: settingMsg.seoDescription.max, trigger: 'blur' }
    ]
  },
  {
    label: '运行状态',
    name: 'status',
    type: 'select',
    options: statusOptions,
    rules: [{ required: true, type: 'number', message: settingMsg.status.required, trigger: 'change' }]
  }
]

const { fetch: requestFetch, loading: requestLoading } = useRequest(getSettingInfo)

onMounted(async () => {
  const res = await requestFetch()

  const {
    data: {
      siteName,
      seoTitle,
      seoKeywords,
      seoDescription,
      status,
      logoId,
      logoPic
    }
  } = res

  console.log(res)
  if (logoId && logoPic) {
    previewItem.value = {
      id: logoId,
      name: '',
      url: logoPic
    }
  }

  formData.value = {
    siteName,
    seoTitle,
    seoKeywords,
    seoDescription,
    status,
    logoId
  }
})

const handlePictureChange = (e: SelectedPicture) => {
  previewItem.value = e
  formData.value.logoId = e.id

  pictureSelectorVisible.value = false
}
</script>
