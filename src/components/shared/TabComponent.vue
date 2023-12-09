<template>
  <div v-if="authModule.isAuthenticated">
    <v-card elevation="3" class="tab">
      <v-tabs v-model="tab" bg-color="purple-darken-3" grow>
        <v-tab
          v-for="(component_tab, index) in tabs"
          :key="index"
          :value="index"
          :to="component_tab.route"
        >
          <v-icon class="mr-2">{{ component_tab.icon }}</v-icon>
          <span>{{ component_tab.text }}</span>
        </v-tab>
      </v-tabs>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthModule } from "@/store";

import tabs from "@/helpers/tabs";

const props = defineProps<{
  tab: number;
}>();

const authModule = useAuthModule();
const tab = ref<number>(props.tab);
</script>

<style scoped>
.tab {
  position: fixed;
  top: 65px;
  width: 100%;
}
</style>
