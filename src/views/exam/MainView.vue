<template>
  <v-container class="base fill-height" fluid>
    <v-card width="100%">
      <v-card-text>
        <span class="text-h6">Question: </span>
        <p class="ma-4">
          {{ useExamModule().getQuestion.content }}
        </p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthModule, useExamModule } from "@/store";
import { useRoute } from "vue-router";

const route = useRoute();

onMounted(async () => {
  const id = route.params.id;
  const student_id = useAuthModule().student.id;
  if (typeof id === "string" && student_id) {
    await useExamModule().readQuestion(parseInt(id), student_id);
  }
});
</script>
