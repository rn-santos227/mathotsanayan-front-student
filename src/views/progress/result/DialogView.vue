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
          <div class="d-flex flex-wrap">
            <div class="flex-1 ma-2 pa-2">
              <v-card
                class="outlined-border pa-3 rounded-lg"
                variant="outlined"
              >
                <p class="text-h5 font-weight-bold">Score:</p>
                <p class="mt-4 text-h2 font-weight-bold text-center">
                  {{ props.result.total_score }} /
                  {{ props.result.items }}
                </p>
              </v-card>
              <v-card
                class="outlined-border pa-3 rounded-lg mt-4"
                variant="outlined"
              >
                <p class="text-h5 font-weight-bold">Total Answers:</p>
                <p class="mt-4 text-h2 font-weight-bold text-center">
                  {{ props.result.answers?.length }}
                </p>
              </v-card>
            </div>
            <div class="flex-1-0 ma-2 pa-2">
              <v-card
                fluid
                class="outlined-border pa-3 rounded-lg"
                variant="outlined"
              >
                <p class="text-h5 font-weight-bold">Status:</p>
                <p class="mt-2">Module Name: {{ props.result.module?.name }}</p>
                <p class="mt-2">
                  Result:
                  <span
                    :class="`font-weight-bold text-${
                      evaluation() === 'Passed' ? 'green' : 'red'
                    }`"
                  >
                    {{ evaluation() }}</span
                  >
                </p>
                <p class="mt-2">Total Time: {{ props.result.timer }}</p>
                <p class="mt-2">Grade: {{ grade() }}</p>
                <p class="mt-2">Accuracy: {{ accuracy() }}</p>
              </v-card>
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

const dialog = ref<boolean>(false);
const props = defineProps<{
  result: Result;
}>();

const close = () => {
  dialog.value = !dialog.value;
};

const evaluation = () => {
  const module = props.result.module;
  if (typeof module != "object") return;
  if (!(module.count && props.result.total_score)) return;

  const average = (props.result.total_score / module.count) * 100;
  const passing = module.passing;
  return average >= passing ? "Passed" : "Failed";
};

const accuracy = () => {
  const total_answers = props.result.answers?.length;
  if (props.result.total_score && total_answers && props.result.items) {
    const average = (props.result.total_score / total_answers) * 100;
    const grade = (props.result.total_score / props.result.items) * 100;
    const accuracy = (average + grade) / 2;

    return `${accuracy.toFixed(2)}%`;
  } else {
    return "Undefined Data";
  }
};

const grade = () => {
  if (props.result.total_score && props.result.items) {
    const grade = (props.result.total_score / props.result.items) * 100;
    return `${grade.toFixed(2)}%`;
  } else {
    return "Undefined Data";
  }
};
</script>

<style scoped>
.outlined-border {
  border: 2px solid #6a1b9a;
}
</style>
