import Subject from "@/types/Subject";
import api from "@/helpers/api";

import { defineStore } from "pinia";
import { authenticatedFetch } from "@/services/api";

export const useSubjectModule = defineStore("subject", {
  state: () => ({
    isLoading: false,
    subjects: [] as Subject[],
  }),

  actions: {
    setSubjects(subjects: Subject[]) {
      this.subjects = subjects;
    },

    async read(): Promise<boolean> {
      try {
        this.isLoading = true;
        const response = await authenticatedFetch(api.SUBJECTS.READ);
        const data = await response.json();
        const { subjects } = data;

        this.setSubjects(subjects);
        return true;
      } catch (error) {
        console.error("Error Subject in:", error);
        return false;
      } finally {
        this.isLoading = false;
      }
    },
  },

  getters: {
    getSubjects(): Subject[] {
      return this.subjects;
    },
  },
});
