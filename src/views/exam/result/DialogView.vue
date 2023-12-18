<template>
  <v-dialog class="ma-auto" persistent v-model="dialog" width="80%">
    <v-card v-if="loaded">
      <v-card
        absolute
        class="rounded-0 rounded-t py-2"
        color="purple-darken-3"
        flat
      >
        <v-card-title>
          <v-row>
            <v-col>
              <span class="text-h6">
                <v-icon icon="mdi-help-circle-outline" />
                Exam Result
              </span>
            </v-col>
          </v-row>
        </v-card-title>
      </v-card>
      <v-card-text class="text--primary">
        <v-row>
          <v-col cols="2">
            <span class="text-h2">
              {{ examModule.getResult.total_score }} /
              {{ examModule.getQuestions.length }}
            </span>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider class="mb-2 mt-auto" />
      <v-card-actions class="text-right">
        <v-spacer />
        <v-btn
          class="mb-3"
          @click.prevent="proceed"
          variant="elevated"
          width="200"
          dark
          color="success"
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

import Result from "@/types/Result";

const loaded = ref<boolean>(false);
const dialog = ref<boolean>(false);
const result = ref<Result>({});

const examModule = useExamModule();
const router = useRouter();

const show = () => {
  result.value = useExamModule().getResult;
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
.result-height {
  height: calc(100vh - 200px);
  overflow-y: auto;
}
</style>
