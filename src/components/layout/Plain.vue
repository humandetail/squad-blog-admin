<template>
  <router-view v-slot="{ Component, route }">
    <transition>
      <keep-alive>
        <component
          :is="Component"
          :key="route.meta.usePathKey ? route.path : undefined"
        />
      </keep-alive>
    </transition>
  </router-view>
</template>
