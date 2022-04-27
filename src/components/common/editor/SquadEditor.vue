<template>
  <div class="squad-editor-input-wrapper">
    <div class="toolsbar">
      <div
        class="toolsbar-item"
        @click="pictureSelectorVisible = true"
      >
        <DynamicIcon icon="PictureOutlined" style="font-size: 16px" />
      </div>
    </div>
    <textarea
      ref="editor"
      class="squad-editor__editor"
      :value="value"
      id="J_squad-editor-input-wrapper"
      @focus="handleFocus"
      @blur="handleBlur"
      @select="handleSelect"
      @input="handleInput"
    />
  </div>

  <Teleport to="body">
    <PictureSelectorModal
      v-show="pictureSelectorVisible"
      :show="pictureSelectorVisible"
      :multiple="false"
      @change="handlePictureSelect"
      @close="pictureSelectorVisible = false"
    />
  </Teleport>
</template>

<script setup lang="ts">
// TODO: 暂时使用这处编辑器，日后替换
import { nextTick, ref, watch } from 'vue';
import { useDefineAsyncComponent } from '../../../hooks/common';
import { SelectedPicture } from '../../../types/picture';
import { DynamicIcon } from '../icons';

const PictureSelectorModal = useDefineAsyncComponent('/components/resource/picture/picture/PictureSelectorModal.vue');

const props = withDefaults(defineProps<{
  value: string;
}>(), {
  value: ''
})

const emit = defineEmits<{(e: 'update:value', value: string): void}>()

const editor = ref()
// const inputValue = ref(props.value);
const selection = ref<[number, number]>([0, 0]);

const pictureSelectorVisible = ref(false)

const handleInput = (e: any) => {
  const target = e.target as HTMLTextAreaElement;
  emit('update:value', target.value)
}
const handleFocus = (e: any) => {
  const target = e.target as HTMLTextAreaElement;
  setTimeout(() => {
    selection.value = [target.selectionStart, target.selectionEnd]
  }, 0);
}
const handleBlur = (e: FocusEvent) => {
  const target = e.target as HTMLTextAreaElement;
  selection.value = [target.selectionStart, target.selectionEnd]
}
const handleSelect = (e: any) => {
  const target = e.target as HTMLTextAreaElement;
  selection.value = [target.selectionStart, target.selectionEnd]
}

const handlePictureSelect = (item: SelectedPicture) => {
  console.log(item)
  replaceText(`\n![${item.name}](${item.url})\n`, 'end');
  pictureSelectorVisible.value = false;
}

// eslint-disable-next-line no-undef
const replaceText = (text: string, selectMode: SelectionMode = 'preserve', newSelection?: [number, number]) => {
  editor.value?.focus();
  editor.value?.setRangeText(text, ...selection.value, selectMode);
  emit('update:value', editor.value?.value ?? '');
  nextTick().then(() => {
    if (newSelection) {
      selection.value = newSelection
      editor.value?.setSelectionRange(...newSelection);
    } else {
      // 重新获取 selection
      editor.value?.blur();
      editor.value?.focus();
    }
  });
}

// watch(inputValue, (value) => {
//   console.log('value', value)
//   emit('update:value', value)
// })
</script>

<style lang="less" scoped>
.squad-editor__editor {
  width: 100%;
  min-height: 300px;
  padding: 16px;
  background-color: transparent;
  border-radius: 4px;
  outline: none;
}

.toolsbar {
  .toolsbar-item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    cursor: pointer;
  }
}
</style>
