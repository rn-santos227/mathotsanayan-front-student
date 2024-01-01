<template>
  <v-container class="mt-6" fluid>
    <v-card class="outlined-border-outer" width="100%" v-if="loaded">
      <v-card-text v-if="!completed">
        <span class="text-h6 font-weight-bold"
          >Question {{ display + 1 }}:
        </span>
        <p class="ma-4">
          {{ examModule.getQuestions[display].content }}
        </p>
        <ImageComponent
          v-if="examModule.getQuestions[display].file"
          class="ma-4"
          v-bind:id="examModule.getQuestions[display].id"
          v-bind:file="examModule.getQuestions[display].file"
          v-bind:height="300"
          v-bind:width="300"
        />
        <v-divider class="my-4" />
        <v-row v-if="examModule.getQuestions[display].type == 'word problem'">
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
          v-else-if="examModule.getQuestions[display].type == 'single correct'"
        >
          <v-radio-group class="ma-6" v-model.trim="state.content">
            <div class="d-flex justify-space-around flex-wrap">
              <v-card
                width="400"
                class="outlined-border ma-4"
                v-for="(option, option_index) in examModule.getQuestions[
                  display
                ].options"
                :key="option_index"
                :color="changeColor(option.content)"
                @click.prevent="selectAnswer(option.content)"
              >
                <v-radio :value="option.content" />
                <ImageComponent
                  class="ma-auto"
                  v-if="option.file"
                  v-bind:id="state.id"
                  v-bind:file="option.file"
                  v-bind:height="200"
                  v-bind:width="250"
                />
                <v-card-text class="text-subtitle-2 mx-4 mb-4">
                  {{ option.content }}
                </v-card-text>
              </v-card>
            </div>
          </v-radio-group>
        </v-row>
      </v-card-text>
      <v-card-text v-else>
        <span class="text-h6 font-weight-bold">
          There are no more question available, you may click submit.
        </span>
      </v-card-text>
      <v-divider />
      <v-card-actions :class="mdAndUp ? '' : 'd-flex flex-wrap'">
        <v-spacer v-if="mdAndUp" />
        <v-btn
          v-if="tries > 2"
          :class="mdAndUp ? 'mb-2 mr-2' : 'mb-2 mx-auto'"
          variant="elevated"
          color="purple-darken-3"
          :width="mdAndUp ? 200 : '100%'"
          height="65"
          @click.prevent="skip"
        >
          Skip
        </v-btn>
        <v-btn
          v-if="!completed"
          :class="mdAndUp ? 'mb-2 mr-2' : 'mb-2 mx-auto'"
          variant="elevated"
          :width="mdAndUp ? 200 : '100%'"
          dark
          color="success"
          height="65"
          prepend-icon="mdi-pencil"
          @click.prevent="answer"
        >
          Answer
        </v-btn>
        <v-btn
          v-if="canSubmit"
          :class="mdAndUp ? 'mb-2 mr-2' : 'mb-2 mx-auto'"
          variant="elevated"
          :width="mdAndUp ? 200 : '100%'"
          dark
          color="teal-accent-4"
          height="65"
          prepend-icon="mdi-check"
          @click.prevent="submit"
        >
          Submit
        </v-btn>
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
import { useDisplay } from "vuetify";
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

const { mdAndUp } = useDisplay();
const examModule = useExamModule();
const router = useRouter();
const route = useRoute();
const index = ref<number>(0);
const display = ref<number>(0);
const timer = ref<number>(0);
const tries = ref<number>(0);
const randomIndex = ref<number>(0);
const loaded = ref<boolean>(false);

const skipped = ref<number[]>([]);
const completed = ref<boolean>(false);
const canSubmit = ref<boolean>(false);
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
    display.value = index.value;
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

const selectAnswer = (answer: string) => {
  state.content = answer;
};

const skip = () => {
  state.content = "Skipped Question";
  useExamModule()
    .skipQuestion(state)
    .then(() => {
      tries.value = 0;
      state.content = "";
      if (index.value < examModule.getQuestions.length - 1) {
        index.value += 1;
        display.value = index.value;
        skipped.value.push(index.value);
      } else if (skipped.value.length > 0) {
        randomIndex.value = Math.floor(Math.random() * skipped.value.length);
        display.value = skipped.value[randomIndex.value];
      }
    });
};

const handleConfirm = () => {
  if (index.value < examModule.getQuestions.length - 1) {
    index.value += 1;
    display.value = index.value;
  } else {
    canSubmit.value = true;
    if (skipped.value.length > 0) {
      randomIndex.value = Math.floor(Math.random() * skipped.value.length);
      display.value = skipped.value[randomIndex.value];
      skipped.value.splice(randomIndex.value, 1);
    } else {
      completed.value = true;
    }
  }
  tries.value = 0;
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
  state.module = examModule.getQuestions[display.value].module_id;
  state.attempts = tries.value + 1;
  state.question = examModule.getQuestions[display.value].id;
  state.result = examModule.getResult.id;

  useExamModule()
    .answerQuestion(state)
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
