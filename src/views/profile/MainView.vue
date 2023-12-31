<template>
  <v-container class="mt-16" fluid>
    <v-card>
      <v-card
        class="rounded-0 rounded-t mb-3 py-2"
        color="purple-darken-3"
        variant="flat"
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
