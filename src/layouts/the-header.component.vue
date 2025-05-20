<template>
  <header class="header">
    <div class="left">
      <img src="https://img.logo.dev/eventify.io?token=pk_A-WHp95fSMu2y8CkFljF2g&retina=true" alt="logo de la aplicacion">
      <h2>ISO 27001:2022 certified</h2>
    </div>
    <div class="center">
      <RouterLink to="/">
        <pv-button label="Home" />
      </RouterLink>
      <RouterLink to="/login">
        <pv-button label="Check-In" />
      </RouterLink>
    </div>
    <div class="right">
      <a href="#">
        <pv-button label="ES" />
      </a>
      <a href="#">
        <pv-button label="EN" />
      </a>
    </div>
  </header>
</template>

<script setup>
// import { RouterLink } from 'vue-router'
</script>

<style scoped>
.header {
  background-color: #7a7979;
  color: white;
  padding: 10px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.left,
.center,
.right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.left img {
  height: 40px;
  margin-right: 10px;
}

.center a,
.right a {
  text-decoration: none;
}

h2 {
  font-size: 1rem;
  margin: 0;
}
</style>
