<template>
  <v-dialog v-model="dialog">
    <v-list-item-title class="text-button">
      <v-icon icon="mdi-help-circle-outline"></v-icon> Exan Result
    </v-list-item-title>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

import Result from "@/types/Result";

const loaded = ref<boolean>(false);
const dialog = ref<boolean>(false);
const result = ref<Result>({});

const show = (_result: Result) => {
  result.value = _result;
  loaded.value = true;
  dialog.value = true;
};

defineExpose({
  show,
});
</script>
