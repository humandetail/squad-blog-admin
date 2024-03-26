<template>
  <div class="page-home">
    <home-today-flow />
    <home-category v-model="range" />

    <home-page-view
      :range="range"
    />
    <home-unique-visitor
      :range="range"
    />

    <home-top-keywords
      :range="range"
    />
    <home-top-post
      :range="range"
    />
  </div>
</template>

<script setup lang="ts">
const range = ref(1)
</script>

<style lang="scss" scoped>
.page-home > :not(:first-child) {
  margin-top: 16px;
}
</style>
