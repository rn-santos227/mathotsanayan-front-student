<template>
  <v-container class="base fill-height" fluid>
    <v-card class="mt-8 mx-4" width="100%" height="90%">
      <v-card
        class="rounded-0 rounded-t mb-3 py-2"
        color="purple-darken-3"
        flat
      >
        <v-card-title>
          <v-row>
            <v-col>
              <span class="text-h5 font-weight-bold">
                List of Available Modules
              </span>
            </v-col>
            <v-col class="d-flex">
              <v-spacer />
            </v-col>
          </v-row>
        </v-card-title>
      </v-card>
      <v-card-text class="auto-scroll">
        <v-row>
          <v-col>
            <v-select
              class="mx-4"
              v-model="subject"
              prepend-inner-icon="mdi-book"
              label="Select Subject"
              density="compact"
              variant="outlined"
              item-title="name"
              item-value="id"
              :items="useSubjectModule().getSubjects"
              @update:modelValue="handleUpdateModule($event)"
            />
          </v-col>
        </v-row>
        <TableViewVue />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useSubjectModule, useAuthModule, useModuleModule } from "@/store";

import TableViewVue from "./TableView.vue";

const subject = ref<number | string>("");

onMounted(async () => {
  await useSubjectModule().read();
});

const handleUpdateModule = async (subject_id: number | string) => {
  const student_id = useAuthModule().student.id;
  if (student_id && typeof subject_id === "number") {
    await useModuleModule().read(subject_id, student_id);
  }
};
</script>

<style scoped>
.auto-scroll {
  overflow-y: auto;
}
</style>
