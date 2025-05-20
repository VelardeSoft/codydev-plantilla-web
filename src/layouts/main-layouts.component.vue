<template>
  <div class="layout">
    <TheHeader/>
    <div class="main-content">
      <router-view></router-view>
    </div>
    <!--<the-footer />-->
  </div>
</template>

<script setup>
import TheHeader from './the-header.component.vue'
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main-content {
  width: 100%;
  display: flex;
  flex: 1;
}
</style>
