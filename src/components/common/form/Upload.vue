<template>
  <a-upload-dragger
    :fileList="fileList"
    :multiple="multiple"
    :accept="accept"
    :before-upload="onBeforeUpload"
    @change="handleChange">
    <DynamicIcon icon="PlusOutlined" />

    <p class="text">Upload</p>
  </a-upload-dragger>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DynamicIcon } from '../icons';

const props = withDefaults(defineProps<{
  multiple: boolean;
  accept: string;
}>(), {
  multiple: false,
  accept: '*'
});

const emit = defineEmits<{(e: 'update:fileList', fileList: File[]): void}>();

const fileList = ref<File[]>([]);

const onBeforeUpload = () => {
  return false;
}

const handleChange = (info: { file: File, fileList: File[] }) => {
  fileList.value = !props.multiple && info.fileList.length > 1
    ? info.fileList.slice(-1)
    : [...info.fileList];

  emit('update:fileList', fileList.value);
}
</script>
