<template>
  <div ref="wrapperRef" class="squad-editor">
    <div class="toolbars">
      <a-space>
        <a-button
          type="primary"
          @click="pictureSelectorModalVisible = true"
        >
          <PictureOutlined />
          批量替换图片
        </a-button>
      </a-space>
    </div>
    <div class="container">
      <div
        ref="containerRef"
        :style="{ width, height: '400px' }"
      ></div>
    </div>

    <resource-picture-selector-modal
      :show="pictureSelectorModalVisible"
      :multiple="true"
      @close="pictureSelectorModalVisible = false"
      @change="handlePictureChange"
    />
  </div>
</template>

<script setup lang="ts">
import { theme } from 'ant-design-vue'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

import { type SelectedPicture } from '@/types/picture'
import { useCommonStore } from '@/store/common'

const props = defineProps<{
  value: string
}>()

const emits = defineEmits<(e: 'update:value', val: string) => void>()

const commonStore = useCommonStore()
const { token } = theme.useToken()

const wrapperRef = ref()
const containerRef = ref<HTMLElement | null>(null)
const width = ref('100%')

const pictureSelectorModalVisible = ref(false)

let editor: monaco.editor.IStandaloneCodeEditor

onMounted(() => {
  width.value = wrapperRef.value!.getBoundingClientRect().width + 'px'

  editor = monaco.editor.create(containerRef.value!, {
    value: undefined,
    language: 'markdown',
    minimap: {
      enabled: false
    },
    tabSize: 2,
    theme: commonStore.themeMode === 'dark' ? 'vs-dark' : 'vs'
  })

  editor.onDidBlurEditorText(() => {
    emits('update:value', editor.getValue())
  })

  watch(() => props.value, (val) => {
    editor.setValue(val)
  }, { immediate: true })

  watch(() => commonStore.themeMode, () => {
    editor.updateOptions({
      theme: commonStore.themeMode === 'dark' ? 'vs-dark' : 'vs'
    })
  })
})

const handlePictureChange = (pic: SelectedPicture | SelectedPicture[]): void => {
  if (editor) {
    if (Array.isArray(pic) && pic.length > 0) {
      let val: string = editor.getValue()
      pic.forEach(item => {
        const reg = new RegExp(`!\\[(.*?)\\]\\((.*?${item.name})\\)`)

        val = val.replace(reg, () => {
          return `![${item.name}](${item.url})`
        })
      })

      editor.setValue(val)
    }

    setTimeout(() => {
      editor.focus()
    })
  }

  pictureSelectorModalVisible.value = false
}
</script>

<style lang="scss" scoped>
.squad-editor {
  width: 100%;
  border-radius: 8px;
  border: 1px solid v-bind('token.colorBorder');
  overflow: hidden;

  .toolbars {
    padding: 16px;
  }
}
</style>
