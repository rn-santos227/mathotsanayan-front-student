<template>
  <v-container class="mt-6" fluid>
    <v-card class="mt-8 mx-auto" width="100%" height="80%">
      <v-card
        class="rounded-0 rounded-t mb-3 py-2"
        color="purple-darken-3"
        variant="flat"
      >
        <v-card-title>
          <v-row>
            <v-col>
              <span class="text-h5 font-weight-bold"> Audit Logs </span>
            </v-col>
            <v-col class="d-flex">
              <v-spacer />
            </v-col>
          </v-row>
        </v-card-title>
      </v-card>
      <TableView />
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import TableView from "./TableView.vue";
</script>
