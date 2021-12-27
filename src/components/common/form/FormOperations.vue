<template>
  <div class="form-operations">
    <a-button
      type="primary"
      html-type="submit"
      :loading="$props.loading">
      <SaveOutlined />
      提交
    </a-button>

    <a-button @click="$props.reset">
      <SyncOutlined />
      重置
    </a-button>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    reset: {
      type: Function,
      default () {
        return () => ''
      }
    }
  }
}
</script>
