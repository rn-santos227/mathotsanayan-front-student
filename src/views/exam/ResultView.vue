<template>
  <v-dialog
    class="ma-auto"
    persistent
    v-model="dialog"
    activator="parent"
    width="80%"
  >
    <v-card>
      <v-card
        absolute
        class="rounded-0 rounded-t py-2"
        color="purple-darken-3"
        flat
      >
        <v-list-item-title class="text-button">
          <v-icon icon="mdi-help-circle-outline"></v-icon> Exan Result
        </v-list-item-title>
      </v-card>
      <v-card-actions class="text-right">
        <v-row>
          <v-col>
            <v-btn
              class="mb-3"
              @click.prevent="proceed"
              variant="elevated"
              width="200"
              dark
              color="success"
              prepend-icon="mdi-check"
            >
              Return to Module
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useExamModule } from "@/store";
import { useRouter } from "vue-router";

import Result from "@/types/Result";

const loaded = ref<boolean>(false);
const dialog = ref<boolean>(false);
const result = ref<Result>({});

const router = useRouter();

const show = () => {
  result.value = useExamModule().getResult;
  loaded.value = true;
  dialog.value = true;
};

const proceed = () => {
  loaded.value = false;
  dialog.value = false;
  router.push("/modules");
};

defineExpose({
  show,
});
</script>
