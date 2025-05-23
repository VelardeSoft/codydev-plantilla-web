<template>
  <pv-card style="border: 1px solid #716f6f; padding: 20px; margin: 14px">
    <template #header>
      <h3>{{ store.name }}</h3>
    </template>

    <div class="store-content">
      <p><strong>Schedule:</strong></p>
      <pv-listbox :options="store.schedule" :multiple="true" :disabled="true" style="width: 100%" />

      <p><strong>Address:</strong> {{ store.address }}</p>
      <p><strong>Description:</strong> {{ store.description }}</p>
      <p><strong>Opened At:</strong> {{ formattedOpenedAt }}</p>
    </div>

    <template #footer>
      <div class="stats-grid">
        <div>
          <strong>Registered Customers:</strong> {{ registeredCustomers }}
        </div>
        <div>
          <strong>Customer %:</strong> {{ customerPercent }}%
        </div>
        <div>
          <strong>Average Products:</strong> {{ averageProducts.toFixed(2) }}
        </div>
        <div>
          <strong>Total Amount:</strong> ${{ totalAmount.toFixed(2) }}
        </div>
      </div>
    </template>
  </pv-card>
</template>

<script>
import { computed } from "vue";

export default {
  name: "StoreSummary",
  props: {
    store: {
      type: Object,
      required: true,
    },
    customers: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const storeCustomers = computed(() =>
        props.customers.filter(c => c.storeId == props.store.id)
    );
    const registeredCustomers = computed(() => storeCustomers.value.length);

    const customersWithPayments = computed(() =>
        storeCustomers.value.filter(c => c.payedAt !== null)
    );
    const customerPercent = computed(() => {
      if (registeredCustomers.value === 0) return 0;
      return ((customersWithPayments.value.length / registeredCustomers.value) * 100).toFixed(2);
    });
    const averageProducts = computed(() => {
      if (registeredCustomers.value === 0) return 0;
      const totalProducts = storeCustomers.value.reduce((sum, c) => sum + c.products, 0);
      return totalProducts / registeredCustomers.value;
    });
    const totalAmount = computed(() => {
      return storeCustomers.value.reduce((sum, c) => sum + c.amount, 0);
    });
    const formattedOpenedAt = computed(() => {
      return props.store.openedAt.toLocaleDateString();
    });
    return {
      registeredCustomers,
      customerPercent,
      averageProducts,
      totalAmount,
      formattedOpenedAt,
    };
  },
};
</script>

<style scoped>
.store-content p {
  margin: 0.3em 0;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5em;
}
</style>
