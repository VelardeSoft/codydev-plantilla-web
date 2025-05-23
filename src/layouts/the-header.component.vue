<template>
  <header class="header">
    <div class="left">
      <img src="https://img.logo.dev/tambo.pe?token=pk_A-WHp95fSMu2y8CkFljF2g&retina=true" alt="logo de Tambo">
      <h2>{{ t('navbar.title') }}</h2>
    </div>
    <div class="center">
      <RouterLink to="/">
        <pv-button label="Home" />
      </RouterLink>
      <RouterLink to="/commerce/store-sales/new">
        <pv-button label="Sales" />
      </RouterLink>
    </div>
    <div class="right">
      <pv-button label="ES" @click="changeLocale('es')" />
      <pv-button label="EN" @click="changeLocale('en')" />
    </div>
  </header>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { locale, t } = useI18n();

function changeLocale(lang) {
  locale.value = lang;
}
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
