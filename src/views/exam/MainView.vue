<template>
  <v-container class="base fill-height" fluid>
    <v-card class="outlined-border-outer" width="100%">
      <v-card-text>
        <span class="text-h6">Question: </span>
        <p class="ma-4">
          {{ useExamModule().getQuestions[index].content }}
        </p>
        <ImageComponent
          v-if="useExamModule().getQuestions[index].file"
          class="ma-4"
          v-bind:id="useExamModule().getQuestions[index].id"
          v-bind:file="useExamModule().getQuestions[index].file"
          v-bind:height="300"
          v-bind:width="300"
        />
        <v-divider class="my-4" />
        <v-row
          v-if="useExamModule().getQuestions[index].type == 'word problem'"
        >
          <v-col>
            <v-text-field
              class="mx-4"
              v-model.trim="state.content"
              label="Provide your answer here."
              density="compact"
              variant="outlined"
            />
          </v-col>
        </v-row>
        <v-row
          v-else-if="
            useExamModule().getQuestions[index].type == 'single correct'
          "
        >
          <v-radio-group class="ma-6" v-model.trim="state.content">
            <v-card
              class="outlined-border ma-2"
              v-for="(option, option_index) in useExamModule().getQuestions[
                index
              ].options"
              :key="option_index"
              :color="changeColor(option.content)"
            >
              <v-card-text>
                <v-row>
                  <v-col v-if="option.file" cols="1"></v-col>
                  <v-col>
                    <v-radio :label="option.content" :value="option.content"
                  /></v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-radio-group>
        </v-row>
      </v-card-text>
      <v-divider />
      <v-card-actions class="text-right">
        <v-row>
          <v-col>
            <v-btn
              class="mb-1 mr-4"
              variant="elevated"
              width="200"
              dark
              color="success"
              prepend-icon="mdi-check"
              @click.prevent="submit"
            >
              Submit
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-container>
  <InformationDialogComponent ref="info" />
  <LoadingDialogComponent v-bind:activate="useExamModule().isLoading" />
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, reactive, ref } from "vue";
import { useAuthModule, useExamModule, useModuleModule } from "@/store";
import { useRoute, useRouter } from "vue-router";
import {
  encryptAndStoreToLocalStorage,
  retrieveAndDecryptFromLocalStorage,
} from "@/helpers/local_storage";

import LoadingDialogComponent from "@/components/dialogs/LoadingDialogComponent.vue";
import InformationDialogComponent from "@/components/dialogs/InformationDialogComponent.vue";
import ImageComponent from "@/components/ImageComponent.vue";

import Answer from "@/types/Answer";

const router = useRouter();
const route = useRoute();
const index = ref<number>(0);
const timer = ref<number>(0);
let intervalId: ReturnType<typeof setInterval>;

const state = reactive<Answer>({
  content: "",
  timer: 0,
  module: useExamModule().getQuestions[index.value].module_id,
  question: useExamModule().getQuestions[index.value].id,
});

const info = ref({
  show: (message: string) => {
    return message;
  },
});

onMounted(async () => {
  useExamModule().isTakingExam = true;
  useExamModule().isLoading = true;

  const decryptedData = await retrieveAndDecryptFromLocalStorage(
    "encryptedData"
  );

  if (decryptedData) {
    const parsedData = JSON.parse(decryptedData);
    timer.value = parsedData.seconds || 0;
  }

  await useAuthModule().fetchUserData();
  const id = route.params.id;
  const student_id = useAuthModule().student.id;
  if (typeof id === "string" && student_id) {
    const exists = await useModuleModule().check(parseInt(id));
    if (!exists) router.push(`/modules`);
    await useExamModule().fetchQuestion(parseInt(id), student_id);
    intervalId = setInterval(tickSeconds, 1000);
  }
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});

const tickSeconds = async () => {
  timer.value += 1;
  await encryptAndStoreToLocalStorage(
    "encryptedData",
    JSON.stringify({ seconds: timer.value })
  );
};

const changeColor = (content: string) => {
  return content === state.content ? "purple-darken-3" : "white";
};

const submit = async () => {
  if (state.content) {
    const module_id = route.params.id;
    const student_id = useAuthModule().student.id;
    useExamModule().isLoading = true;
    if (typeof module_id === "string" && student_id) {
      state.timer = timer.value;
      timer.value = 0;
      await useExamModule().fetchQuestion(parseInt(module_id), student_id);
    }
  } else {
    info.value.show("You have not provided an answer.");
  }
};
</script>

<style scoped>
.outlined-border {
  border: 1px solid #6a1b9a;
}

.outlined-border-outer {
  border: 2px solid #6a1b9a;
}
</style>
