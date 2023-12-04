<template>
  <div class="mt-4">
    <v-row>
      <v-col>
        <v-text-field
          class="mx-4"
          v-model.trim="student.full_name"
          label="Student Full Name"
          density="compact"
          readonly
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthModule } from "@/store";
import Student from "@/types/Student";

const useAuth = useAuthModule();
const student = ref<Student>(useAuth.student);
</script>
