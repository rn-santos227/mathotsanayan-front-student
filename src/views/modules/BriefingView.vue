<template>
  <v-btn
    block
    color="purple-darken-3"
    variant="outlined"
    prepend-icon="mdi-lead-pencil"
  >
    Take Exam
    <v-dialog
      class="ma-auto"
      persistent
      v-model="dialog"
      activator="parent"
      :width="mdAndUp ? '50%' : '100%'"
    >
      <v-card>
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
            {{ props.module.name }}
          </span>
        </div>
        <span class="mx-auto"> </span>
        <v-divider class="mb-2 mt-6" />
        <div class="ma-6" v-if="module.description">
          <span class="h-5 font-weight-bold">Description:</span>
          <p class="ma-4">{{ props.module.description }}</p>
        </div>

        <div class="ma-6" v-if="module.objective">
          <span class="h-5 font-weight-bold">Objective:</span>
          <p class="ma-4">{{ props.module.objective }}</p>
        </div>

        <div class="ma-6" v-if="module.direction">
          <span class="h-5 font-weight-bold">Instructions:</span>
          <p class="ma-4">{{ props.module.direction }}</p>
        </div>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn variant="flat" width="100" color="error" dark @click="cancel">
            Cancel
          </v-btn>
          <v-btn
            variant="flat"
            :width="100"
            color="success"
            dark
            @click="confirm"
          >
            Proceed
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify";

import Module from "@/types/Module";

const { mdAndUp } = useDisplay();
const router = useRouter();
const dialog = ref<boolean>(false);
const props = defineProps<{
  module: Module;
}>();

const confirm = () => {
  dialog.value = false;
  const id = props.module.id;

  if (id) {
    router.push(`/exam/${id}`);
  }
};

const cancel = () => {
  dialog.value = false;
};
</script>
