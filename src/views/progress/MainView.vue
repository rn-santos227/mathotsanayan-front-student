<template>
  <v-container class="fill-height" fluid>
    <v-card class="mt-8 mx-4" width="100%" height="90%">
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
