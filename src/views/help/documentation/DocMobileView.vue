<template>
  <v-card-text>
    <span class="text-h5 font-weight-bold">
      MatHOTSanayan Student Mobile View
    </span>
    <v-divider class="my-2" />
    <p class="ma-6">
      {{ docs[0] }}
    </p>

    <p class="ma-6">
      {{ docs[1] }}
    </p>

    <v-row>
      <v-col>
        <v-img
          class="ma-6"
          cover
          :src="require('@/assets/images/help/doc_003.png')"
        />
      </v-col>
      <v-col>
        <v-img
          class="ma-6"
          cover
          :src="require('@/assets/images/help/doc_004.png')"
        />
      </v-col>
      <v-col>
        <v-img
          class="ma-6"
          cover
          :src="require('@/assets/images/help/doc_005.png')"
        />
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script setup lang="ts">
import docs from "@/helpers/documentation/doc_mobile";
</script>
