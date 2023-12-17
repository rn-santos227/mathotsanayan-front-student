<template>
  <v-data-table
    class="w-100"
    :items="results"
    :headers="headers"
    :loading="resultModule.isTableLoading"
  >
    <template v-slot:item="{ item }">
      <tr>
        <td class="text-xs-left">
          {{ getModuleName(item.module) }}
        </td>
        <td class="text-xs-left">Stage {{ getModuleStage(item.module) }}</td>
        <td class="text-xs-left">
          {{ item.total_score }} /
          {{ item.items }}
        </td>
        <td class="text-xs-left">{{ evaluation(item) }}</td>
        <td class="text-xs-left">
          <v-btn
            block
            color="purple-darken-3"
            variant="outlined"
            prepend-icon="mdi-magnify"
            @click.prevent="details(item)"
          >
            Details
          </v-btn>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useResultModule, useAuthModule } from "@/store";
import { getModuleName, getModuleStage } from "@/helpers/instance";

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

const evaluation = (result: Result) => {
  const module = result.module;
  if (typeof module != "object") return;
  if (!(module.count && result.total_score)) return;

  const average = (result.total_score / module.count) * 100;
  const passing = module.passing;
  return average >= passing ? "Passed" : "Failed";
};

const details = (result: Result) => {
  console.log(result);
};
</script>
