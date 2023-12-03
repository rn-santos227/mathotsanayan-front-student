<template>
  <v-card>
    <v-tabs v-model="tab" bg-color="deep-purple-accent-4" centered stacked>
      <v-tab value="tab-1">
        <v-icon>mdi-phone</v-icon>
        Recents
      </v-tab>

      <v-tab value="tab-2">
        <v-icon>mdi-heart</v-icon>
        Favorites
      </v-tab>

      <v-tab value="tab-3">
        <v-icon>mdi-account-box</v-icon>
        Nearby
      </v-tab>
    </v-tabs>
  </v-card>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";

const props = defineProps<{
  tab: number;
}>();

const tab = ref<number>(props.tab);
</script>
