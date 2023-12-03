<template>
  <v-app id="inspire">
    <HeaderComponent :title="title" />
    <v-main app>
      <router-view />
    </v-main>
    <LoadingComponent v-bind:activate="authModule.isLoading" />
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthModule } from "./store";

import HeaderComponent from "./components/shared/HeaderComponent.vue";
import LoadingComponent from "./components/dialogs/LoadingComponent.vue";

const authModule = useAuthModule();
const title = ref<string>("Mathotsanayan CAA");
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
