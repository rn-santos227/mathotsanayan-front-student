<template>
  <v-btn
    block
    color="purple-darken-3"
    variant="outlined"
    prepend-icon="mdi-magnify"
  >
    View Details
    <v-dialog class="ma-auto" persistent v-model="dialog" activator="parent">
      <v-card>
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
              <v-col class="d-flex">
                <v-spacer />
                <v-btn
                  density="comfortable"
                  variant="outlined"
                  icon="mdi-close"
                  @click="close"
                >
                </v-btn>
              </v-col>
            </v-row>
          </v-card-title>
        </v-card>

        <v-card-text class="answers-height">
          <p>Module Name: {{ props.result.module?.name }}</p>
          <p class="mt-2">
            Result:
            <span
              :class="`font-weight-bold text-${
                evaluateExam(props.result) === 'Passed' ? 'green' : 'red'
              }`"
            >
              {{ evaluateExam(props.result) }}</span
            >
          </p>
          <p class="mt-2">Total Time: {{ props.result.timer }}</p>
          <v-divider class="my-4" />
          <div class="d-flex justify-space-around flex-wrap">
            <div class="ma-2">
              <ResultComponent
                v-bind:color="'cyan'"
                v-bind:title="'Score'"
                v-bind:data="`${props.result.total_score} / ${props.result.items}`"
                v-bind:value="grade(props.result)"
              />
            </div>
            <div class="ma-2">
              <ResultComponent
                v-bind:color="'teal'"
                v-bind:title="'Grade'"
                v-bind:data="`${grade(props.result).toFixed(2)}%`"
                v-bind:value="grade(props.result)"
              />
            </div>
            <div class="ma-2">
              <ResultComponent
                v-bind:color="'green'"
                v-bind:title="'Total Attempts'"
                v-bind:data="`${props.result.answers?.length}`"
                v-bind:value="accuracy(props.result)"
              />
            </div>
            <div class="ma-2">
              <ResultComponent
                v-bind:color="'light-green'"
                v-bind:title="'Accuracy'"
                v-bind:data="`${accuracy(props.result).toFixed(2)}%`"
                v-bind:value="accuracy(props.result)"
              />
            </div>
          </div>
          <v-divider class="mt-4" />
          <div>
            <TableView v-bind:answers="result.answers" />
          </div>
        </v-card-text>
        <v-divider />
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { grade, accuracy, evaluateExam } from "@/helpers/evaluation";

import ResultComponent from "@/components/ResultComponent.vue";
import TableView from "./TableView.vue";

import Result from "@/types/Result";

const dialog = ref<boolean>(false);
const props = defineProps<{
  result: Result;
}>();

const close = () => {
  dialog.value = !dialog.value;
};
</script>

<style scoped>
.answers-height {
  height: calc(100vh - 200px);
  overflow-y: auto;
}
</style>
