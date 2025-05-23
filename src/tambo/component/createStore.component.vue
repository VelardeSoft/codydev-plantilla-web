<template>
  <div class="store-new-container">
    <h2>Nuevo Store</h2>

    <form @submit.prevent="saveStore" class="store-form">
      <div class="form-group">
        <label for="id">ID</label>
        <input id="id" v-model="store.id" type="text" required />
      </div>

      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" v-model="store.name" type="text" required />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input id="description" v-model="store.description" type="text" required />
      </div>

      <div class="form-group">
        <label for="address">Address</label>
        <input id="address" v-model="store.address" type="text" required />
      </div>

      <div class="form-group">
        <label for="schedule">Schedule (comma separated times)</label>
        <input
            id="schedule"
            v-model="scheduleInput"
            type="text"
            placeholder="Ej: 07:00,23:00"
            required
        />
      </div>

      <pv-button label="Save" type="submit" />
    </form>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import StoreService from "../services/stores.service.js";

export default {
  name: "StoreNew",
  setup() {
    const store = reactive({
      id: "",
      name: "",
      description: "",
      address: "",
      schedule: [],
      openedAt: null,
    });

    const scheduleInput = ref("");
    const errorMessage = ref("");
    const successMessage = ref("");
    const existingStoreIds = ref(new Set());

    // Cargar IDs existentes para validación
    const loadExistingStoreIds = async () => {
      try {
        const stores = await StoreService.getStores();
        existingStoreIds.value = new Set(stores.map(s => s.id));
      } catch (error) {
        errorMessage.value = "Error cargando stores existentes.";
        console.error(error);
      }
    };

    onMounted(() => {
      loadExistingStoreIds();
    });

    const saveStore = async () => {
      errorMessage.value = "";
      successMessage.value = "";

      // Validar que id no exista
      if (existingStoreIds.value.has(store.id.trim())) {
        errorMessage.value = `El ID '${store.id}' ya existe. Por favor usa otro.`;
        return;
      }

      // Validar y convertir schedule
      const scheduleArray = scheduleInput.value
          .split(",")
          .map(s => s.trim())
          .filter(s => s.length > 0);

      if (scheduleArray.length === 0) {
        errorMessage.value = "El campo Schedule debe contener al menos un horario válido.";
        return;
      }

      // Preparar objeto para enviar
      const newStore = {
        id: store.id.trim(),
        name: store.name.trim(),
        description: store.description.trim(),
        address: store.address.trim(),
        schedule: scheduleArray,
        openedAt: null,
      };

      try {
        await StoreService.createStore(newStore);
        successMessage.value = "Store creado exitosamente.";
        // Limpiar formulario
        store.id = "";
        store.name = "";
        store.description = "";
        store.address = "";
        scheduleInput.value = "";
        // Actualizar lista de IDs
        existingStoreIds.value.add(newStore.id);
      } catch (error) {
        errorMessage.value = "Error al crear el Store. Intenta nuevamente.";
        console.error(error);
      }
    };

    return {
      store,
      scheduleInput,
      errorMessage,
      successMessage,
      saveStore,
    };
  },
};
</script>

<style scoped>
.store-new-container {
  max-width: 500px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #fafafa;
}

.store-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 0.3rem;
}

.form-group input {
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.error-message {
  color: #d9534f;
  font-weight: 600;
  margin-top: 1rem;
}

.success-message {
  color: #28a745;
  font-weight: 600;
  margin-top: 1rem;
}
</style>
