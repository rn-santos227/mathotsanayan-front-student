<template>
  <v-card
    v-if="authModule.isAuthenticated && !hideTab"
    elevation="3"
    class="tab rounded-0"
  >
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
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useAuthModule } from "@/store";

import tabs from "@/helpers/tabs";
import { useRoute } from "vue-router";

const props = defineProps<{
  tab: number;
}>();

const authModule = useAuthModule();
const hideTab = ref<boolean>(false);

const tab = ref<number>(props.tab);
const route = useRoute();

watch(
  () => route.path,
  () => {
    hideTab.value = route.name === "exam";
  }
);
</script>

<style scoped>
.tab {
  position: fixed;
  top: 65px;
  width: 100%;
}
</style>
