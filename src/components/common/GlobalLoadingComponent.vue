<template>
  <a-spin
    :spinning="true"
    size="large"
    tip="玩命加载中...">
    <div class="global-loading"></div>
  </a-spin>
</template>

<style>
.global-loading {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  background-color: rgba(0,0,0,.5);
}
</style>
