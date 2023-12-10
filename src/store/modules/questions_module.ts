import Question from "@/types/Question";

import { defineStore } from "pinia";

export const useQuestionModule = defineStore("questions", {
  state: () => ({
    questions: [] as Question[],
    isLoading: false as boolean,
    isTableLoading: false,
  }),

  actions: {
    setModules(questions: Question[]) {
      this.questions = questions;
    },
  },

  getters: {
    getQuestions(): Question[] {
      return this.questions;
    },
  },
});
