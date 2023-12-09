<template>
  <v-app id="inspire">
    <HeaderComponent :title="title" />
    <v-main app>
      <TabComponent :tab="tab" />
      <router-view />
    </v-main>
    <LoadingDialogComponent v-bind:activate="authModule.isLoading" />
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthModule } from "./store";

import HeaderComponent from "./components/shared/HeaderComponent.vue";
import TabComponent from "./components/shared/TabComponent.vue";
import LoadingDialogComponent from "./components/dialogs/LoadingDialogComponent.vue";

const authModule = useAuthModule();
const title = ref<string>("Mathotsanayan CAA");
const tab = ref<number>(0);

async function fetchUserData() {
  try {
    await authModule.fetchUserData();
  } catch (error) {
    console.error("Error:", error);
  }
}

onMounted(async () => {
  fetchUserData();
});
</script>

<style>
.base {
  background-color: #fffde7;
}

.v-field__field,
.v-field__overlay {
  background-color: #fffde7;
}

.v-data-table-header__content > span {
  font-weight: bolder;
}
</style>
