import api from "@/helpers/api";
import Question from "@/types/Question";

import { defineStore } from "pinia";
import { authenticatedFetch } from "@/services/api";

export const useExamModule = defineStore("exam", {
  state: () => ({
    isTakingExam: false,
    isLoading: false,
    questions: [] as Question[],
  }),

  actions: {
    setQuestions(questions: Question[]) {
      this.questions = questions;
    },

    async fetchQuestion(id: number, student_id: number) {
      try {
        this.isLoading = true;
        const response = await authenticatedFetch(
          `${api.EXAM.QUESTION}${id}?student_id=${student_id}`
        );
        const data = await response.json();
        const { question } = data;

        this.setQuestions(question);
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
    getQuestions(): Question[] {
      return this.questions;
    },
  },
});
