<template>
  <v-container fluid>
    <div class="d-flex justify-space-around flex-wrap"></div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useDashboardModule } from "@/store";

import DashboardCardComponent from "@/components/dashboard/DashboardCardComponent.vue";
import DashboardCard from "@/interfaces/DashboardCard";

const moduleCard = ref<DashboardCard>({
  count: useDashboardModule().getDashboard.modules,
  title: "Total Modules",
  link: "/modules",
  color: "indigo",
  icon: "mdi-text-box-check",
});

onMounted(async () => {
  useDashboardModule().isLoading = true;
  useDashboardModule().read();
  moduleCard.value.count = useDashboardModule().getDashboard.modules;

  useDashboardModule().isLoading = false;
});
</script>
