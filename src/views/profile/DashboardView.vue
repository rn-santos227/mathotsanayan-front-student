<template>
  <v-container fluid>
    <div class="d-flex justify-space-around flex-wrap">
      <DashboardCardComponent
        class="flex-grow-1 card-width"
        v-bind:card="moduleCard"
      />
      <div v-if="mdAndUp" class="ma-2"></div>
      <DashboardCardComponent
        class="flex-grow-1 card-width"
        v-bind:card="subjectCard"
      />
      <div v-if="mdAndUp" class="ma-2"></div>
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
  color: "purple-darken-3",
  icon: "mdi-text-box-check",
});

const subjectCard = ref<DashboardCard>({
  count: useDashboardModule().getDashboard.results,
  title: "Total Subjects",
  link: "/modules",
  color: "purple-darken-3",
  icon: "mdi-book",
});

const resultCard = ref<DashboardCard>({
  count: useDashboardModule().getDashboard.results,
  title: "Total Results",
  link: "/progress",
  color: "purple-darken-3",
  icon: "mdi-sticker-check-outline",
});

onMounted(async () => {
  useDashboardModule().isLoading = true;
  await useDashboardModule().read();
  moduleCard.value.count = useDashboardModule().getDashboard.modules;
  subjectCard.value.count = useDashboardModule().getDashboard.subjects;
  resultCard.value.count = useDashboardModule().getDashboard.results;
  useDashboardModule().isLoading = false;
});
</script>

<style scoped>
.card-width {
  width: 180px;
}
</style>
