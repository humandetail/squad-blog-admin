<template>
  <div ref="wrapperRef" class="squad-editor">
    <div class="toolbars">
      <a-space>
        <a-button
          @click="handleBtnClick"
        >
          <DynamicIcon icon="picture-outlined" />
        </a-button>

        <a-button
          @click="handleBtnClick(true)"
        >
          批量替换图片
        </a-button>
      </a-space>
    </div>
    <div
      ref="containerRef"
      class="container"
      :style="{ width, height: '400px' }"
    ></div>

    <PictureSelectorModal
      :show="pictureSelectorModalVisible"
      :multiple="pictureSelectorModalVisible"
      @close="pictureSelectorModalVisible = false"
      @change="handlePictureChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import { DynamicIcon } from '@/components/common/icons';

import PictureSelectorModal from '@/components/resource/picture/picture/PictureSelectorModal.vue';
import { SelectedPicture } from '@/types/picture';

const props = defineProps<{
  value: string
}>()

const emits = defineEmits<{(e: 'update:value', val: string): void}>()

const wrapperRef = ref()
const containerRef = ref()
const width = ref('100%')

const pictureSelectorModalVisible = ref(false)
const pictureSelectorMultiple = ref(false)

let editor: monaco.editor.IStandaloneCodeEditor

onMounted(() => {
  width.value = wrapperRef.value!.getBoundingClientRect().width + 'px'

  editor = monaco.editor.create(containerRef.value!, {
    // value: 'Hello w**o~~r~~ld**!?\n\nnew line a~~b~~c\n\nSth went wrong!',
    value: undefined,
    language: 'markdown',
    minimap: {
      enabled: false
    },
    tabSize: 2,
    theme: 'vs-dark'
  });

  editor.onDidBlurEditorText((e) => {
    console.log(editor.getValue())
    emits('update:value', editor.getValue())
  })

  watch(() => props.value, (val) => {
    editor.setValue(val)
  }, { immediate: true })
})

const handleBtnClick = (isMultiple = false) => {
  pictureSelectorMultiple.value = isMultiple
  pictureSelectorModalVisible.value = true
}

const handlePictureChange = (pic: SelectedPicture | SelectedPicture[]): void => {
  if (editor) {
    if (!pictureSelectorMultiple.value && editor.getSelection()) {
      if (Array.isArray(pic)) return
      editor.executeEdits('insert-mode', [
        {
          range: editor.getSelection()!,
          text: `![${pic.name}](${pic.url})`,
          forceMoveMarkers: false
        }
      ])
    }

    if (pictureSelectorMultiple.value) {
      if (Array.isArray(pic) && pic.length > 0) {
        let val: string = editor.getValue()
        pic.forEach(item => {
          const reg = new RegExp(`!\\[(.*?)\\]\\((.*?${item.name})\\)`)

          val = val.replace(reg, ($, $1, $2) => {
            console.log($, $1, $2)
            return `![${item.name}](${item.url})`
          })
        })

        editor.setValue(val)
      }
    }

    setTimeout(() => {
      editor.focus()
    })
  }

  pictureSelectorModalVisible.value = false
}
</script>

<style lang="less" scoped>
.squad-editor {
  width: 100%;

  .toolbars {
    margin-bottom: 16px;
  }
}
</style>
