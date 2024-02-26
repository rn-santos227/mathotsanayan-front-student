<template>
  <v-card-text>
    <div v-if="focusPage === 'progress-main'">
      <span class="text-h5 font-weight-bold">
        MatHOTSanayan Student Progress Table
      </span>
      <v-divider class="my-2" />
      <p class="ma-6">
        {{ docs[0] }}
      </p>

      <!-- <v-img
        class="ma-6"
        cover
        :src="require('@/assets/images/help/doc_011.png')"
      /> -->

      <p class="ma-6">
        {{ docs[1] }}
      </p>

      <p class="ma-6">
        {{ docs[2] }}
      </p>
    </div>

    <div v-if="focusPage === 'progress-details'">
      <span class="text-h5 font-weight-bold">
        MatHOTSanayan Student Progress Details
      </span>
      <v-divider class="my-2" />
      <p class="ma-6">
        {{ docs[3] }}
      </p>

      <!-- <v-img
        class="ma-6"
        cover
        :src="require('@/assets/images/help/doc_012.png')"
      /> -->

      <p class="ma-6">
        {{ docs[4] }}
      </p>

      <p class="ma-6">
        {{ docs[5] }}
      </p>
    </div>

    <div v-if="focusPage === 'progress-answers'">
      <span class="text-h5 font-weight-bold">
        MatHOTSanayan Student Answers List
      </span>
      <v-divider class="my-2" />
      <p class="ma-6">
        {{ docs[6] }}
      </p>

      <!-- <v-img
        class="ma-6"
        cover
        :src="require('@/assets/images/help/doc_013.png')"
      /> -->

      <p class="ma-6">
        {{ docs[7] }}
      </p>

      <p class="ma-6">
        {{ docs[8] }}
      </p>

      <p class="ma-6">
        {{ docs[9] }}
      </p>
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
