<template>
  <v-btn
    block
    color="purple-darken-3"
    variant="outlined"
    prepend-icon="mdi-magnify"
  >
    View Details
    <v-dialog
      class="ma-auto"
      persistent
      v-model="dialog"
      activator="parent"
      width="60%"
    >
      <v-card>
        <v-card
          absolute
          class="rounded-0 rounded-t py-2"
          color="purple-darken-3"
          flat
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

        <v-card-text>
          <div class="d-flex justify-center flex-wrap">
            <div class="ma-2 pa-2">
              <ResultComponent
                v-bind:color="'cyan'"
                v-bind:title="'Score'"
                v-bind:data="`${props.result.total_score} / ${props.result.items}`"
                v-bind:value="grade()"
              />
            </div>
            <div class="ma-2 pa-2">
              <ResultComponent
                v-bind:color="'teal'"
                v-bind:title="'Total Answers'"
                v-bind:data="`${props.result.answers?.length}`"
                v-bind:value="accuracy()"
              />
            </div>
            <div class="ma-2 pa-2">
              <ResultComponent
                v-bind:color="'green'"
                v-bind:title="'Accuracy'"
                v-bind:data="`${accuracy().toFixed(2)}%`"
                v-bind:value="accuracy()"
              />
            </div>
            <div class="ma-2 pa-2">
              <ResultComponent
                v-bind:color="'light-green'"
                v-bind:title="'Grade'"
                v-bind:data="`${grade().toFixed(2)}%`"
                v-bind:value="grade()"
              />
            </div>
          </div>
        </v-card-text>
        <v-divider />
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<script setup lang="ts">
import Result from "@/types/Result";
import { ref } from "vue";

import ResultComponent from "@/components/ResultComponent.vue";

const dialog = ref<boolean>(false);
const props = defineProps<{
  result: Result;
}>();

const close = () => {
  dialog.value = !dialog.value;
};

// const evaluation = () => {
//   const module = props.result.module;
//   if (typeof module != "object") return;
//   if (!(module.count && props.result.total_score)) return;

//   const average = (props.result.total_score / module.count) * 100;
//   const passing = module.passing;
//   return average >= passing ? "Passed" : "Failed";
// };

const accuracy = (): number => {
  const total_answers = props.result.answers?.length;
  if (props.result.total_score && total_answers && props.result.items) {
    const average = (props.result.total_score / total_answers) * 100;
    const grade = (props.result.total_score / props.result.items) * 100;
    const accuracy = (average + grade) / 2;

    return accuracy;
  } else {
    return 0;
  }
};

const grade = (): number => {
  if (props.result.total_score && props.result.items) {
    const grade = (props.result.total_score / props.result.items) * 100;
    return grade;
  } else {
    return 0;
  }
};
</script>

<style scoped>
.outlined-border {
  border: 2px solid #6a1b9a;
}
</style>
