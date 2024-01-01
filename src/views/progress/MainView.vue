<template>
  <v-container class="mt-6" fluid>
    <v-card class="mt-8 mx-auto" width="100%">
      <v-card
        class="rounded-0 rounded-t mb-3 py-2"
        color="purple-darken-3"
        variant="flat"
      >
        <v-card-actions class="mx-4">
          <span class="text-h5 font-weight-bold"> My Progress / Result </span>
        </v-card-actions>
      </v-card>
      <v-card-text>
        <TableView />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import TableView from "./TableView.vue";
</script>
