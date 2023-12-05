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
        <td class="text-xs-left">
          {{ item?.questions?.length }}
        </td>
        <td class="text-xs-left">
          {{ getSubjectName(item?.subject) }}
        </td>

        <td>
          <v-btn block color="purple-darken-3" variant="outlined">
            <v-icon size="large">mdi-dots-horizontal</v-icon>
            <v-menu activator="parent">
              <v-list density="compact" variant="plain"> </v-list>
            </v-menu>
          </v-btn>
        </td>
      </tr>
    </template>
  </v-data-table>
  <LoadingComponent v-bind:activate="useModuleModule().isLoading" />
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useModuleModule } from "@/store";
import { getSubjectName } from "@/helpers/instance";

import LoadingComponent from "@/components/dialogs/LoadingComponent.vue";

import headers from "@/helpers/headers/header_modules";
import Module from "@/types/Module";

const moduleModule = useModuleModule();
const modules = computed<Module[]>(() => moduleModule.getModules);

onMounted(async () => {
  await useModuleModule().read();
});
</script>
