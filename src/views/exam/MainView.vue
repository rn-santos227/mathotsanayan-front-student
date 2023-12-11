<template>
  <v-container class="base fill-height" fluid>
    <v-card width="100%">
      <v-card-text>
        <span class="text-h6">Question: </span>
        <p class="ma-4">
          {{ useExamModule().getQuestion?.content }}
        </p>
      </v-card-text>
    </v-card>
  </v-container>
  <LoadingDialogComponent v-bind:activate="useExamModule().isLoading" />
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import { useAuthModule, useExamModule, useModuleModule } from "@/store";
import { useRoute, useRouter } from "vue-router";

import LoadingDialogComponent from "@/components/dialogs/LoadingDialogComponent.vue";

const router = useRouter();
const route = useRoute();
const timer = ref<number>(0);
let intervalId: ReturnType<typeof setInterval>;

onMounted(async () => {
  useExamModule().isTakingExam = true;
  useExamModule().isLoading = true;
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

const tickSeconds = () => {
  timer.value += 1;
};
</script>
