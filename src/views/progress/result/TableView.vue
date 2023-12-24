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
          <span :class="getGradeEvaluation(item.grade)">
            {{ getGradeEvaluation(item.grade) }}
          </span>
        </td>
        <td class="text-xs-left">
          {{ item.content }}
        </td>
        <td class="text-xs-left">
          {{ getQuestionContent(item.question) }}
        </td>
        <td class="text-xs-left">
          {{ item.attempts }}
        </td>
        <td class="text-xs-left">
          {{ secondsToMinutes(item.timer) }}
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { getQuestionContent, getGradeEvaluation } from "@/helpers/instance";
import { secondsToMinutes } from "@/helpers/evaluation";
import headers from "@/helpers/headers/header_answers";
import Answer from "@/types/Answer";

const props = defineProps<{
  answers: Answer[] | undefined;
}>();
</script>

<style scoped>
.correct {
  color: green;
}

.wrong {
  color: red;
}
</style>
