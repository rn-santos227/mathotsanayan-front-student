<template>
  <v-container fluid>
    <div class="d-flex justify-space-around flex-wrap">
      <DashboardCardComponent
        class="flex-grow-1 card-width"
        v-bind:card="moduleCard"
      />
      <div v-if="mdAndUp" class="ma-4"></div>
      <DashboardCardComponent
        class="flex-grow-1 card-width"
        v-bind:card="resultCard"
      />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useDashboardModule } from "@/store";
import { useDisplay } from "vuetify";

import DashboardCardComponent from "@/components/dashboard/DashboardCardComponent.vue";
import DashboardCard from "@/interfaces/DashboardCard";

const { mdAndUp } = useDisplay();

const moduleCard = ref<DashboardCard>({
  count: useDashboardModule().getDashboard.modules,
  title: "Total Modules",
  link: "/modules",
  color: "indigo",
  icon: "mdi-text-box-check",
});

const resultCard = ref<DashboardCard>({
  count: useDashboardModule().getDashboard.results,
  title: "Total Results",
  link: "/progress",
  color: "light-green",
  icon: "mdi-sticker-check-outline",
});

onMounted(async () => {
  useDashboardModule().isLoading = true;
  await useDashboardModule().read();
  moduleCard.value.count = useDashboardModule().getDashboard.modules;
  resultCard.value.count = useDashboardModule().getDashboard.results;
  useDashboardModule().isLoading = false;
});
</script>

<style scoped>
.card-width {
  width: 180px;
}
</style>
