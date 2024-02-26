<template>
  <v-card-text>
    <span class="text-h5 font-weight-bold">
      MatHOTSanayan Student Available Module
    </span>
    <v-divider class="my-2" />
    <p class="ma-6">
      {{ docs[0] }}
    </p>

    <p class="ma-6">
      {{ docs[1] }}
    </p>

    <p class="ma-6">
      {{ docs[2] }}
    </p>

    <v-img
      class="ma-6"
      cover
      :src="require('@/assets/images/help/doc_006.png')"
    />

    <p class="ma-6">
      {{ docs[3] }}
    </p>

    <p class="ma-6">
      {{ docs[4] }}
    </p>

    <p class="ma-6">
      {{ docs[5] }}
    </p>

    <v-img
      class="ma-6"
      cover
      :src="require('@/assets/images/help/doc_007.png')"
    />
  </v-card-text>
</template>

<script setup lang="ts">
import docs from "@/helpers/documentation/doc_module";
</script>
