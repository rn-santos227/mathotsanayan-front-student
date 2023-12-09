<template>
  <div class="mt-4">
    <v-row class="mx-4">
      <v-col>
        <v-text-field
          v-model.trim="useAuth.student.full_name"
          label="Student Full Name"
          hide-details
          readonly
        />
      </v-col>
      <v-col>
        <v-text-field
          v-model.trim="useAuth.student.email"
          label="Student Full Name"
          hide-details
          readonly
        />
      </v-col>
    </v-row>
    <v-row class="mx-4">
      <v-col>
        <v-text-field
          v-model.trim="section"
          label="Student Section"
          hide-details
          readonly
        />
      </v-col>
      <v-col>
        <v-text-field
          v-model.trim="teacher"
          label="Teacher assigned"
          hide-details
          readonly
        />
      </v-col>
    </v-row>
    <v-row class="mx-4">
      <v-col>
        <v-text-field
          v-model.trim="course"
          label="Student Course"
          hide-details
          readonly
        />
      </v-col>
    </v-row>
    <v-row class="mx-4">
      <v-col>
        <v-text-field
          v-model.trim="school"
          label="Student School"
          hide-details
          readonly
        />
      </v-col>
    </v-row>
  </div>
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
