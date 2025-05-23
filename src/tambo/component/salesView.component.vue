<template>
  <div class="sales-container">
    <h2>Broker Sales</h2>

    <section class="payment-validation">
      <h3>Payment Validation</h3>

      <form @submit.prevent="validatePayment" class="payment-form">
        <label for="customerId">Customer Identifier</label>
        <input
            id="customerId"
            v-model="customerId"
            type="text"
            placeholder="Enter Customer ID"
            required
            autocomplete="off"
        />
        <pv-button label="Validate Payment" type="submit" />
      </form>

      <div class="validation-result" v-if="validationMessage">
        <p :class="{'error': isError, 'success': !isError}">
          {{ validationMessage }}
        </p>
      </div>

      <div v-if="paymentData" class="payment-details">
        <h4>Ticket and Store Details</h4>
        <ul>
          <li><strong>Store Id:</strong> {{ paymentData.store.id }}</li>
          <li><strong>Store Name:</strong> {{ paymentData.store.name }}</li>
          <li><strong>Store Schedule:</strong> {{ paymentData.store.schedule.join(", ") }}</li>
          <li><strong>Store Description:</strong> {{ paymentData.store.description }}</li>
          <li><strong>Customer First Name:</strong> {{ paymentData.customer.firstName }}</li>
          <li><strong>Customer Last Name:</strong> {{ paymentData.customer.lastName }}</li>
          <li><strong>Sales (Products):</strong> {{ paymentData.customer.products }}</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from "vue";
import CustomerService from "../services/customer.service.js";
import StoreService from "../services/stores.service.js";

export default {
  name: "SalesView",
  setup() {
    const customerId = ref("");
    const validationMessage = ref("");
    const isError = ref(false);
    const paymentData = ref(null);

    // Datos cacheados para stores y customers
    const stores = ref([]);
    const customers = ref([]);

    // Cargar stores y customers al montar (opcional para mejorar performance)
    const loadData = async () => {
      stores.value = await StoreService.getStores();
      customers.value = await CustomerService.getCustomers();
    };
    loadData();

    const validatePayment = async () => {
      validationMessage.value = "";
      isError.value = false;
      paymentData.value = null;

      // Buscar customer por id
      const customer = customers.value.find(c => c.id === customerId.value.trim());

      if (!customer) {
        validationMessage.value = "Invalid Id Identifier";
        isError.value = true;
        return;
      }

      if (customer.payedAt) {
        validationMessage.value = "Already Payed";
        isError.value = true;
        return;
      }

      // Actualizar payedAt con fecha y hora actual ISO
      const now = new Date().toISOString();

      try {
        const updatedCustomer = await CustomerService.updatePayment(customer.id, now);

        // Actualizar localmente para evitar recarga
        const index = customers.value.findIndex(c => c.id === customer.id);
        if (index !== -1) customers.value[index] = updatedCustomer;

        // Obtener store asociado
        const store = stores.value.find(s => s.id === updatedCustomer.storeId.toString());

        paymentData.value = {
          customer: updatedCustomer,
          store: store || {
            id: updatedCustomer.storeId,
            name: "Unknown Store",
            schedule: [],
            description: "",
          },
        };

        validationMessage.value = "Payment validated successfully!";
        isError.value = false;
      } catch (error) {
        validationMessage.value = "Error updating payment. Please try again.";
        isError.value = true;
        console.error(error);
      }
    };

    return {
      customerId,
      validationMessage,
      isError,
      paymentData,
      validatePayment,
    };
  },
};
</script>

<style scoped>
.sales-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
}

.payment-validation {
  margin-top: 1.5rem;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 6px;
  background-color: #fafafa;
}

.payment-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.payment-form label {
  font-weight: 600;
}

.payment-form input[type="text"] {
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.validation-result p {
  font-weight: 600;
  font-size: 1.1rem;
}

.validation-result p.error {
  color: #d9534f; /* rojo */
}

.validation-result p.success {
  color: #28a745; /* verde */
}

.payment-details ul {
  list-style: none;
  padding-left: 0;
}

.payment-details li {
  margin-bottom: 0.5rem;
}
</style>
