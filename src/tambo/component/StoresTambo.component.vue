<template>
  <pv-card>
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
  </pv-card>
</template>

<script>
import { computed } from "vue";

export default {
  name: "StoreSummary",
  props: {
    store: {
      type: Object,
      required: true
    },
  },
  setup(props) {
    const formattedOpenedAt = computed(() => {
      return new Date(props.store.openedAt).toLocaleDateString();
    });

    return {
      formattedOpenedAt,
    };
  },
};
</script>

<style scoped>
.store-content p {
  margin: 0.3em 0;
}
</style>
