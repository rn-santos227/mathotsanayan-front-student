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

    getQuestion(index: number) {
      if (this.questions && index < this.questions.length) {
        return this.questions[index];
      } else {
        return null;
      }
    },

    async fetchQuestion(id: number, student_id: number) {
      try {
        this.isLoading = true;
        const response = await authenticatedFetch(
          `${api.EXAM.QUESTION}${id}?student_id=${student_id}`
        );
        const data = await response.json();
        const { questions } = data;

        this.setQuestions(questions);
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
