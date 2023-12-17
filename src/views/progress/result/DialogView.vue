<template>
  <v-dialog class="ma-auto" persistent v-model="dialog" width="80%"> </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

const dialog = ref<boolean>(false);
</script>
