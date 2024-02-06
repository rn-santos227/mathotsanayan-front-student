<template>
  <v-container fluid>
    <div class="d-flex justify-space-around flex-wrap">
      <DashboardPieGraphComponent class="flex-grow-0 card-width-pie" />
      <div v-if="mdAndUp" class="ma-2"></div>
      <DashboardTableComponent class="flex-grow-1 card-width" />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useDashboardModule } from "@/store";
import { useDisplay } from "vuetify";

import DashboardPieGraphComponent from "@/components/dashboard/DashboardPieGraphComponent.vue";
import DashboardTableComponent from "@/components/dashboard/DashboardTableComponent.vue";

const { mdAndUp } = useDisplay();

onMounted(async () => {
  useDashboardModule().isLoading = true;
  await Promise.all([
    useDashboardModule().modules(),
    useDashboardModule().ratio(),
  ]);
  useDashboardModule().isLoading = false;
});
</script>

<style scoped>
.card-width {
  width: 180px;
}

.card-width-pie {
  width: 490px;
}
</style>
