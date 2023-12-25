<template>
  <v-container class="base fill-height" fluid>
    <v-card class="ma-4 pb-12" width="100%">
      <v-card
        class="rounded-0 rounded-t mb-3 py-2"
        color="purple-darken-3"
        flat
      >
        <v-card-actions class="mx-4">
          <span class="text-h5 font-weight-bold"> My Student Profile </span>
        </v-card-actions>
      </v-card>
      <v-card-text>
        <ProfileView />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import ProfileView from "./ProfileView.vue";
</script>
