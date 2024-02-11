<template>
  <v-card-text>
    <div v-if="focusPage === 'progress-main'">
      <span class="text-h5 font-weight-bold">
        MatHotSanayan Student Progress Table
      </span>
      <v-divider class="my-2" />
      <p class="ma-6">
        {{ docs[0] }}
      </p>
    </div>

    <div v-if="focusPage === 'progress-details'">
      <span class="text-h5 font-weight-bold">
        MatHotSanayan Student Progress Details
      </span>
      <v-divider class="my-2" />
    </div>

    <div v-if="focusPage === 'progress-answers'">
      <span class="text-h5 font-weight-bold">
        MatHotSanayan Student Answers List
      </span>
      <v-divider class="my-2" />
    </div>
  </v-card-text>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import docs from "@/helpers/documentation/doc_progress";

const props = defineProps<{
  page: string;
}>();

const focusPage = ref(props.page);

watch(
  () => props.page,
  (newValue) => {
    focusPage.value = newValue;
  }
);
</script>
