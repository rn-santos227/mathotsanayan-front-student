<template>
  <v-container class="mt-8" fluid>
    <DashboardView />
    <ProfileView />
    <GraphView />
  </v-container>
</template>

<script setup lang="ts">
import ProfileView from "./ProfileView.vue";
import DashboardView from "./DashboardView.vue";
import GraphView from "./GraphView.vue";
</script>
