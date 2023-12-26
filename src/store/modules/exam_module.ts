import api from "@/helpers/api";
import Answer from "@/types/Answer";
import Question from "@/types/Question";
import Result from "@/types/Result";

import { defineStore } from "pinia";
import { authenticatedFetch } from "@/services/api";

export const useExamModule = defineStore("exam", {
  state: () => ({
    isLoading: false,
    result: {} as Result,
    questions: [] as Question[],
  }),

  actions: {
    setQuestions(questions: Question[]) {
      this.questions = questions;
    },

    setResult(result: Result) {
      this.result = result;
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
          `${api.EXAM.QUESTIONS}${id}?student_id=${student_id}`
        );
        const data = await response.json();
        const { questions, result } = data;

        this.setQuestions(questions);
        this.setResult(result);

        return true;
      } catch (error) {
        console.error("Error Exam in:", error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async skipQuestion(payload: Answer) {
      try {
        this.isLoading = true;
        await authenticatedFetch(api.EXAM.SKIP + payload.question, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      } catch (error) {
        console.error("Error Exam in:", error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async answerQuestion(payload: Answer) {
      try {
        this.isLoading = true;
        const response = await authenticatedFetch(
          api.EXAM.ANSWER + payload.question,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
        const data = await response.json();
        const { correct, solution } = data;
        return { correct, solution };
      } catch (error) {
        console.error("Error Exam in:", error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async finishExam(id: number) {
      try {
        this.isLoading = true;
        const response = await authenticatedFetch(api.EXAM.SUBMIT + id);
        const data = await response.json();
        const { result } = data;
        this.setResult(result);
      } catch (error) {
        console.error("Error Exam in:", error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
  },

  getters: {
    getQuestions(): Question[] {
      return this.questions;
    },

    getResult(): Result {
      return this.result;
    },
  },
});
