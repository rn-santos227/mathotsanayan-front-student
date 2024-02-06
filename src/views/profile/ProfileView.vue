<template>
  <v-container fluid>
    <v-card class="mx-auto" width="100%" elevation="2">
      <v-card
        class="rounded-0 rounded-t mb-3 py-2"
        color="purple-darken-3"
        variant="flat"
      >
        <v-card-actions class="mx-2">
          <span class="text-h5 font-weight-bold"> My Student Profile </span>
        </v-card-actions>
      </v-card>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              class="text-purple-darken-3"
              v-model.trim="useAuth.student.full_name"
              label="Student Full Name"
              variant="outlined"
              hide-details
              readonly
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              class="text-purple-darken-3"
              v-model.trim="useAuth.student.email"
              label="Student Email"
              variant="outlined"
              hide-details
              readonly
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              class="text-purple-darken-3"
              v-model.trim="section"
              label="Student Section"
              variant="outlined"
              hide-details
              readonly
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              class="text-purple-darken-3"
              v-model.trim="teacher"
              label="Teacher Assigned"
              variant="outlined"
              hide-details
              readonly
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              class="text-purple-darken-3"
              v-model.trim="course"
              label="Student Course"
              variant="outlined"
              hide-details
              readonly
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              class="text-purple-darken-3"
              v-model.trim="school"
              label="Student School"
              variant="outlined"
              hide-details
              readonly
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useAuthModule } from "@/store";
import {
  getCourseName,
  getSchoolName,
  getSectionName,
  getTeacher,
} from "@/helpers/instance";

const useAuth = useAuthModule();
const course = ref<string>(getCourseName(useAuth.student.course));
const school = ref<string>(getSchoolName(useAuth.student.school));
const section = ref<string>(getSectionName(useAuth.student.section));
const teacher = ref<string | undefined>(getTeacher(useAuth.student.section));

watch(
  () => getCourseName(useAuth.student.course),
  () => {
    course.value = getCourseName(useAuth.student.course);
  }
);

watch(
  () => getSchoolName(useAuth.student.school),
  () => {
    school.value = getSchoolName(useAuth.student.school);
  }
);

watch(
  () => getSectionName(useAuth.student.section),
  () => {
    section.value = getSectionName(useAuth.student.section);
  }
);

watch(
  () => getTeacher(useAuth.student.section),
  () => {
    teacher.value = getTeacher(useAuth.student.section);
  }
);
</script>
