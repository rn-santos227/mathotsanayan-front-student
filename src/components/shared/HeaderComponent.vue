<template>
  <v-app-bar color="purple-darken-3" dark elevation="1" app>
    <v-toolbar-title :class="mdAndUp ? 'text-h6 font-weight-bold' : ''">
      {{ props.title }}
    </v-toolbar-title>
    <div v-if="authModule.isAuthenticated" class="mr-1">
      <HelpView />
      <v-menu v-if="showBack">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            density="comfortable"
            icon="mdi-arrow-left-bold-circle-outline"
            size="x-large"
            @click.prevent="leave()"
          >
          </v-btn>
        </template>
      </v-menu>
      <v-menu v-else>
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            density="comfortable"
            icon="mdi-account-circle-outline"
            size="x-large"
          >
          </v-btn>
        </template>
        <v-list density="compact" variant="plain">
          <PasswordView />
          <v-divider />
          <v-list-item @click.prevent="logout()">
            <template v-slot:prepend>
              <v-icon icon="mdi-logout-variant"></v-icon>
            </template>
            <v-list-item-title> Logout </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
  <QuestionDialogComponent ref="refLogout" @confirm="handeConfirm" />
  <QuestionDialogComponent ref="refLeave" @confirm="handleBack" />
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useAuthModule } from "@/store";
import { useRouter, useRoute } from "vue-router";
import { useDisplay } from "vuetify";

import QuestionDialogComponent from "../dialogs/QuestionDialogComponent.vue";
import PasswordView from "@/views/auth/PasswordView.vue";
import HelpView from "@/views/help/DialogView.vue";

const { mdAndUp } = useDisplay();
const showBack = ref<boolean>(false);
const router = useRouter();
const route = useRoute();

const refLogout = ref({
  show: (message: string) => {
    return message;
  },
});

const refLeave = ref({
  show: (message: string) => {
    return message;
  },
});

const authModule = useAuthModule();
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

watch(
  () => route.path,
  () => {
    showBack.value = route.name === "exam";
  }
);

const handeConfirm = async () => {
  await authModule.logout();
  if (!authModule.isAuthenticated) {
    router.push("/login");
  }
};

const handleBack = async () => {
  router.push("/modules");
};

const logout = () => {
  refLogout.value.show("Are you sure you want to log off?");
};

const leave = () => {
  refLeave.value.show("Do you want to leave your curret exam?");
};
</script>
