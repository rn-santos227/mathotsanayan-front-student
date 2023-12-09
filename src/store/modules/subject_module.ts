import Subject from "@/types/Subject";

import { defineStore } from "pinia";

export const useSubjectModule = defineStore("subject", {
  state: () => ({
    subjects: [] as Subject[],
    isLoading: false as boolean,
  }),

  actions: {
    setSubjects(subjects: Subject[]) {
      this.subjects = subjects;
    },
  },

  getters: {
    getSubjects(): Subject[] {
      return this.subjects;
    },
  },
});
