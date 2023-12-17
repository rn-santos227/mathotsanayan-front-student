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
          <BriefingView v-bind:module="item" />
        </td>
      </tr>
    </template>
  </v-data-table>
  <LoadingDialogComponent v-bind:activate="useModuleModule().isLoading" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useModuleModule } from "@/store";
import { getSubjectName } from "@/helpers/instance";

import BriefingView from "./BriefingView.vue";
import LoadingDialogComponent from "@/components/dialogs/LoadingDialogComponent.vue";

import headers from "@/helpers/headers/header_modules";
import Module from "@/types/Module";

const moduleModule = useModuleModule();
const modules = computed<Module[]>(() => moduleModule.getModules);
</script>
