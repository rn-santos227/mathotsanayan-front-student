<template>
  <v-data-table
    class="w-100"
    :items="results"
    :headers="headers"
    :loading="resultModule.isTableLoading"
  >
    <template v-slot:item="{ item }">
      <tr>
        <td class="text-left">
          {{ getModuleName(item.module) }}
        </td>
        <td class="text-left">Stage {{ getModuleStage(item.module) }}</td>
        <td class="text-center">
          {{ item.total_score }} /
          {{ item.items }}
        </td>
        <td class="text-left">
          <span
            :class="`font-weight-bold text-${
              evaluateExam(item) === 'Passed' ? 'green' : 'red'
            }`"
          >
            {{ evaluateExam(item) }}</span
          >
        </td>
        <td class="text-center">
          {{ secondsToMinutes(item.timer) }}
        </td>
        <td class="text-left">
          <ResultView v-bind:result="item" />
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useResultModule, useAuthModule } from "@/store";
import { getModuleName, getModuleStage } from "@/helpers/instance";
import { evaluateExam } from "@/helpers/evaluation";
import { secondsToMinutes } from "@/helpers/evaluation";

import ResultView from "./result/DialogView.vue";

import headers from "@/helpers/headers/header_results";
import Result from "@/types/Result";

const resultModule = useResultModule();
const results = computed<Result[]>(() => resultModule.getResults);

watch(
  () => useAuthModule().student,
  async () => {
    const id = useAuthModule().student.id;
    if (id) {
      await useResultModule().read(id);
    }
  }
);

onMounted(async () => {
  const id = useAuthModule().student.id;
  if (id) {
    await useResultModule().read(id);
  }
});
</script>
