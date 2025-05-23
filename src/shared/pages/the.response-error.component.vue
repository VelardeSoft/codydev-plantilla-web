<template>
  <div class="not-found" style="justify-content: center">
    <div class="content">
      <h1>404</h1>
      <h2>Oops! Ruta no encontrada</h2>
      <p>No se encontró la ruta: <code>{{ currentPath }}</code></p>
      <RouterLink to="/">
        <pv-button label="Volver al inicio" />
      </RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
  computed: {
    currentPath() {
      return this.$route.fullPath;
    }
  }
};
</script>

<style scoped>
.not-found {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  padding: 20px;
}

h1 {
  font-size: 8rem;
  margin: 0;
  font-weight: 900;
  letter-spacing: 0.1em;
}

h2 {
  font-size: 2rem;
  margin: 0.5em 0 1em;
  font-weight: 600;
}

p {
  font-size: 1.2rem;
  margin-bottom: 1.5em;
}

code {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.2em 0.5em;
  border-radius: 4px;
  font-family: monospace;
}
</style>
