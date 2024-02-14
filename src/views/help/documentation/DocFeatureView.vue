<template>
  <v-card-text>
    <span class="text-h5 font-weight-bold">
      MatHOTSanayan Student Features
    </span>
    <v-divider class="my-2" />
    <p class="ma-6">
      {{ docs[0] }}
    </p>
  </v-card-text>
</template>

<script setup lang="ts">
import docs from "@/helpers/documentation/doc_feature";
</script>
