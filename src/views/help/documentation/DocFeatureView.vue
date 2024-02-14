<template>
  <v-card-text>
    <span class="text-h5 font-weight-bold">
      MatHOTSanayan Student Features
    </span>
    <v-divider class="my-2" />

    <ul class="mx-10 my-4">
      <li class="my-2">
        <p>
          <b>User-Friendly Interface:</b>
          <span> {{ docs[1] }}</span>
        </p>
      </li>
      <li class="my-2">
        <p>
          <b>Comprehensive Test Bank:</b>
          <span> {{ docs[2] }}</span>
        </p>
      </li>
      <li class="my-2">
        <p>
          <b>HOTS-focused Approach:</b>
          <span> {{ docs[3] }}</span>
        </p>
      </li>
    </ul>
  </v-card-text>
</template>

<script setup lang="ts">
import docs from "@/helpers/documentation/doc_feature";
</script>
