<template>
  <v-dialog
    class="ma-auto"
    persistent
    v-model="dialog"
    :width="mdAndUp ? '80%' : '100%'"
  >
    <v-card v-if="loaded">
      <v-card
        absolute
        class="rounded-0 rounded-t py-2"
        color="purple-darken-3"
        variant="flat"
      >
        <v-card-title>
          <v-row>
            <v-col>
              <span class="text-h6"> Examination Result </span>
            </v-col>
          </v-row>
        </v-card-title>
      </v-card>
      <v-card-text class="answers-height">
        <FormView v-bind:result="examModule.getResult" />
        <v-divider class="my-4" />
        <div class="d-flex justify-space-around flex-wrap">
          <div class="ma-2">
            <ResultComponent
              v-bind:color="'cyan'"
              v-bind:title="'Score'"
              v-bind:data="`${examModule.getResult.total_score} / ${examModule.getResult.items}`"
              v-bind:value="grade(examModule.getResult)"
            />
          </div>
          <div class="ma-2">
            <ResultComponent
              v-bind:color="'teal'"
              v-bind:title="'Grade'"
              v-bind:data="`${grade(examModule.getResult).toFixed(2)}%`"
              v-bind:value="grade(examModule.getResult)"
            />
          </div>
          <div class="ma-2">
            <ResultComponent
              v-bind:color="'green'"
              v-bind:title="'Total Attempts'"
              v-bind:data="`${examModule.getResult.answers?.length}`"
              v-bind:value="accuracy(examModule.getResult)"
            />
          </div>
          <div class="ma-2">
            <ResultComponent
              v-bind:color="'light-green'"
              v-bind:title="'Accuracy'"
              v-bind:data="`${accuracy(examModule.getResult).toFixed(2)}%`"
              v-bind:value="accuracy(examModule.getResult)"
            />
          </div>
        </div>
        <v-divider class="mt-4" />
        <div>
          <TableView v-bind:answers="examModule.getResult.answers" />
        </div>
      </v-card-text>
      <v-divider class="mb-2 mt-auto" />
      <v-card-actions class="text-right">
        <v-spacer />
        <v-btn
          @click.prevent="proceed"
          variant="elevated"
          width="100%"
          dark
          color="success"
          height="65"
          prepend-icon="mdi-check"
        >
          Return to Module
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useExamModule } from "@/store";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify";

import { grade, accuracy } from "@/helpers/evaluation";

import ResultComponent from "@/components/ResultComponent.vue";

import FormView from "./FormView.vue";
import TableView from "./TableView.vue";

const { mdAndUp } = useDisplay();
const loaded = ref<boolean>(false);
const dialog = ref<boolean>(false);

const examModule = useExamModule();
const router = useRouter();

const show = () => {
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

<style scoped>
.answers-height {
  height: calc(100vh - 200px);
  overflow-y: auto;
}
</style>
