import api from "@/helpers/api";
import Question from "@/types/Question";

import { defineStore } from "pinia";
import { authenticatedFetch } from "@/services/api";

export const useExamModule = defineStore("exam", {
  state: () => ({
    isTakingExam: false,
    isLoading: false,
    question: {} as Question,
  }),

  actions: {
    setSubjects(subjects: Question) {
      this.question = subjects;
    },

    async readQuestion(id: number, student_id: number) {
      try {
        this.isLoading = true;
        const response = await authenticatedFetch(
          `${api.EXAM.QUESTION}${id}?student_id=${student_id}`
        );
        const data = await response.json();
        const { question } = data;

        this.setSubjects(question);
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
    getQuestion(): Question {
      return this.question;
    },
  },
});
