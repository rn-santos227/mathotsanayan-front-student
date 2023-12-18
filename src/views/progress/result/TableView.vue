<template>
  <v-data-table
    class="w-100"
    :items="props.answers"
    :headers="headers"
    item-value="id"
  >
    <template v-slot:item="{ item }">
      <tr>
        <td class="text-xs-left">
          {{ item.content }}
        </td>
        <td class="text-xs-left">
          {{ getQuestionContent(item.question) }}
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { getQuestionContent } from "@/helpers/instance";

import headers from "@/helpers/headers/header_answers";
import Answer from "@/types/Answer";

const props = defineProps<{
  answers: Answer[] | undefined;
}>();
</script>
