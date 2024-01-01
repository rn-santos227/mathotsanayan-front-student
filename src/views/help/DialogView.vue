<template>
  <v-btn density="comfortable" icon="mdi-help-circle-outline" size="x-large">
    <v-dialog
      class="ma-auto"
      persistent
      v-model="dialog"
      activator="parent"
      width="70%"
    >
    </v-dialog>
  </v-btn>
</template>

<script setup lang="ts">
import { ref } from "vue";

const dialog = ref<boolean>(false);
</script>
