<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.fade || 'fade'" mode="out-in">
      <keep-alive>
        <component
          :is="Component"
          :key="route.meta.usePathKey ? route.path : undefined"
        />
      </keep-alive>
    </transition>
  </router-view>
</template>
