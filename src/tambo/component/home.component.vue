<template>
  <div>
    <div style="display: flex; align-items: center; gap: 1rem; padding: 40px">
      <h2>{{ t('navbar.home') }}</h2>
      <h2>{{ t('navbar.welcome') }}</h2>
    </div>
    <h2 style="text-align: center; color: #764ba2; padding: 10px">Registered Stores</h2>
    <div class="stores-grid">
      <StoreSummary
          v-for="store in stores"
          :key="store.id"
          :store="store"
          :customers="customers"
      />
    </div>
    <div style="text-align: center">
      <RouterLink to="/commerce/stores/new">
        <pv-button label="Create New Store" />
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import StoreSummary from "../component/registeredStores.component.vue";
import StoreService from "../services/stores.service.js";
import { useI18n } from "vue-i18n";

export default {
  name: "Home",
  components: { StoreSummary },
  setup() {
    const { t } = useI18n();
    const stores = ref([]);
    const customers = ref([]);
    const loadData = async () => {
      stores.value = await StoreService.getStores();
      customers.value = await StoreService.getCustomers();
    };

    onMounted(() => {
      loadData();
    });

    return { stores, customers, t };
  },
};
</script>

<style scoped>
.stores-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
</style>
