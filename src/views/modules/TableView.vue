<template>
  <v-data-table
    class="w-100"
    :items="modules"
    :headers="headers"
    :loading="moduleModule.isTableLoading"
    item-value="name"
  >
    <template v-slot:item="{ item }">
      <tr>
        <td class="text-xs-left">
          {{ item.name }}
        </td>
        <td class="text-xs-left">Stage {{ item.step }}</td>
        <td class="text-xs-left">
          {{ item?.questions?.length }}
        </td>
        <td class="text-xs-left">
          {{ getSubjectName(item?.subject) }}
        </td>

        <td>
          <v-btn
            block
            color="purple-darken-3"
            variant="outlined"
            prepend-icon="mdi-lead-pencil"
            @click.prevent="takeExam(item)"
          >
            Take Exam
          </v-btn>
        </td>
      </tr>
    </template>
  </v-data-table>
  <LoadingDialogComponent v-bind:activate="useModuleModule().isLoading" />
  <BriefingView ref="briefing" />
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useModuleModule } from "@/store";
import { getSubjectName } from "@/helpers/instance";

import BriefingView from "./BriefingView.vue";
import LoadingDialogComponent from "@/components/dialogs/LoadingDialogComponent.vue";

import headers from "@/helpers/headers/header_modules";
import Module from "@/types/Module";

const briefing = ref({
  show: (module: Module) => {
    return module;
  },
});

const moduleModule = useModuleModule();
const modules = computed<Module[]>(() => moduleModule.getModules);

const takeExam = (module: Module) => {
  briefing.value.show(module);
};
</script>
