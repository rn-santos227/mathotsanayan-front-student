<template>
  <v-container class="base fill-height" fluid>
    <v-card class="outlined-border-outer" width="100%" v-if="loaded">
      <v-card-text>
        <span class="text-h6">Question: </span>
        <p class="ma-4">
          {{ examModule.getQuestions[index].content }}
        </p>
        <ImageComponent
          v-if="examModule.getQuestions[index].file"
          class="ma-4"
          v-bind:id="examModule.getQuestions[index].id"
          v-bind:file="examModule.getQuestions[index].file"
          v-bind:height="300"
          v-bind:width="300"
        />
        <v-divider class="my-4" />
        <v-row v-if="examModule.getQuestions[index].type == 'word problem'">
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
          v-else-if="examModule.getQuestions[index].type == 'single correct'"
        >
          <v-radio-group class="ma-6" v-model.trim="state.content">
            <v-card
              class="outlined-border ma-2"
              v-for="(option, option_index) in examModule.getQuestions[index]
                .options"
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
              v-if="tries > 2"
              class="mb-2"
              variant="elevated"
              @click.prevent="skip"
              color="purple-darken-3"
              width="200"
              size="x-large"
            >
              Skip
            </v-btn>
            <v-btn
              v-if="!completed"
              class="mb-1 mr-4"
              variant="elevated"
              width="200"
              dark
              color="success"
              prepend-icon="mdi-pencil"
              size="x-large"
              @click.prevent="answer"
            >
              Answer
            </v-btn>
            <v-btn
              v-if="completed"
              class="mb-1 mr-4"
              variant="elevated"
              width="200"
              dark
              color="success"
              prepend-icon="mdi-check"
              size="x-large"
              @click.prevent="submit"
            >
              Submit
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-container>
  <CorrectDialogComponent ref="correct" @confirm="handleConfirm" />
  <InformationDialogComponent ref="info" />
  <LoadingDialogComponent v-bind:activate="useExamModule().isLoading" />
  <WrongDialogComponent ref="wrong" @confirm="timerReset" />
  <ResultView ref="openResult" />
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, reactive, ref, watch } from "vue";
import { useAuthModule, useExamModule, useModuleModule } from "@/store";
import { useRoute, useRouter } from "vue-router";
import {
  encryptAndStoreToLocalStorage,
  retrieveAndDecryptFromLocalStorage,
  removeDataFromLocalStorage,
} from "@/helpers/local_storage";
import { shuffleOptions } from "@/helpers/utils";

import ResultView from "./result/DialogView.vue";

import CorrectDialogComponent from "@/components/dialogs/CorrectDialogComponent.vue";
import LoadingDialogComponent from "@/components/dialogs/LoadingDialogComponent.vue";
import InformationDialogComponent from "@/components/dialogs/InformationDialogComponent.vue";
import WrongDialogComponent from "@/components/dialogs/WrongDialogComponent.vue";
import ImageComponent from "@/components/ImageComponent.vue";

import Answer from "@/types/Answer";

const examModule = useExamModule();
const router = useRouter();
const route = useRoute();
const index = ref<number>(0);
const timer = ref<number>(0);
const tries = ref<number>(0);
const loaded = ref<boolean>(false);

const skipped = ref<number[]>([]);
const completed = ref<boolean>(false);
let intervalId: ReturnType<typeof setInterval>;

const info = ref({
  show: (message: string) => {
    return message;
  },
});

const correct = ref({
  show: (message: string) => {
    return message;
  },
});

const wrong = ref({
  show: (message: string) => {
    return message;
  },
});

const openResult = ref({
  show: () => {
    return true;
  },
});

const state = reactive<Answer>({
  content: "",
  timer: 0,
  attempts: 0,
  module: 0,
  question: 0,
});

onMounted(async () => {
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
    examModule.getQuestions[index.value].options = shuffleOptions(
      examModule.getQuestions[index.value].options
    );
    loaded.value = true;
  }
});

watch(
  () => index.value,
  (val: number) => {
    if (val >= examModule.getQuestions.length - 1) return;
    examModule.getQuestions[index.value].options = shuffleOptions(
      examModule.getQuestions[index.value].options
    );
  }
);

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

const skip = () => {
  if (index.value < examModule.getQuestions.length - 1) {
    skipped.value.push(index.value);
    index.value += 1;
    tries.value = 0;
  } else {
    if (skipped.value.length > 0) {
      //
    }
  }
};

const handleConfirm = () => {
  if (index.value < examModule.getQuestions.length - 1) {
    tries.value = 0;
    index.value += 1;
  } else {
    completed.value = true;
  }
  timerReset();
};

const timerReset = () => {
  removeDataFromLocalStorage("encryptedData");
  timer.value = 0;
  intervalId = setInterval(tickSeconds, 1000);
};

const answer = async () => {
  if (!state.content) info.value.show("You have not provided an answer.");
  clearInterval(intervalId);
  state.timer = timer.value;
  state.module = examModule.getQuestions[index.value].module_id;
  state.attempts = tries.value + 1;
  state.question = examModule.getQuestions[index.value].id;
  state.result = examModule.getResult.id;

  useExamModule()
    .submitAnswer(state)
    .then((response) => {
      state.content = "";
      if (response?.correct) {
        correct.value.show(response?.solution);
      } else {
        wrong.value.show(response?.solution);
        tries.value += 1;
      }
    });
};

const submit = async () => {
  if (!completed.value) return;
  const id = examModule.getResult.id;
  if (id) {
    await useExamModule()
      .finishExam(id)
      .then(() => {
        openResult.value.show();
      });
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
