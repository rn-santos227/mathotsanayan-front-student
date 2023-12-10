<template>
  <v-dialog v-model="dialog">
    <v-sheet
      class="ma-auto"
      elevation="12"
      max-width="650"
      rounded="lg"
      width="100%"
    >
      <v-card class="rounded-0 rounded-t mb-3" color="purple-darken-3" flat>
        <v-card-text class="text-left">
          <span class="text-subtitle-1 font-weight-bold">
            <v-icon class="mr-2" icon="mdi-information-outline"></v-icon>
            Exam Information
          </span>
        </v-card-text>
      </v-card>
      <div class="ma-3">
        <span class="text-h4 font-weight-bold mb-6 text-purple-darken-3">
          {{ module.name }}
        </span>
      </div>
      <span class="mx-auto"> </span>
      <v-divider class="mb-2 mt-6" />
      <div class="ma-6" v-if="module.description">
        <span class="h-5 font-weight-bold">Description/Notes:</span>
        <p class="ma-4">{{ module.description }}</p>
      </div>

      <div class="ma-6" v-if="module.objective">
        <span class="h-5 font-weight-bold">Objective:</span>
        <p class="ma-4">{{ module.objective }}</p>
      </div>

      <div class="ma-6" v-if="module.direction">
        <span class="h-5 font-weight-bold">Instruction:</span>
        <p class="ma-4">{{ module.direction }}</p>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="flat" width="100" color="error" dark @click="cancel">
          Cancel
        </v-btn>
        <v-btn variant="flat" width="100" color="success" dark @click="confirm">
          Proceed
        </v-btn>
      </v-card-actions>
    </v-sheet>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useExamModule } from "@/store";
import { useRouter } from "vue-router";

import Module from "@/types/Module";
const router = useRouter();

const dialog = ref<boolean>(false);
const module = ref<Module>({} as Module);

const confirm = () => {
  dialog.value = false;
  const id = module.value.id;

  if (id) {
    useExamModule().isTakingExam = true;
    router.push(`/exam/${id}`);
  }
};

const cancel = () => {
  dialog.value = false;
};

const show = (payload: Module) => {
  module.value = payload;
  dialog.value = true;
};

defineExpose({
  show,
});
</script>
